import http from "../http-common";


const getCSRF = () => {
    return http.get("/set-csrf/");
};

const login = (data) => {
    return http.post("/login/", data);
};


export default {
    getCSRF,
    login,
};
