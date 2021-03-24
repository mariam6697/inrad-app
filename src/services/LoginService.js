import http from "../http-common";

const login = (data) => {
  return http.post("/token/", data);
};

export default {
  login,
};
