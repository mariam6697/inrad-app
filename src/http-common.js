import axios from "axios";

const baseURL = process.env.REACT_APP_API_HOST;
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "api/token/refresh/"
    ) {
      localStorage.clear();
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh");
      console.log(refreshToken);
      if (refreshToken != null) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return instance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access", response.data.access);

              instance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return instance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          localStorage.clear();
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        localStorage.clear();
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default instance;
