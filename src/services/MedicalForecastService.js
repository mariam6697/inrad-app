import http from "../http-common";

const getAll = () => {
    return http.get("/medical_forecasts/");
};

const get = (id) => {
    return http.get(`/medical_forecasts/${id}`);
};

const create = (data) => {
    return http.post("/medical_forecasts/", data);
};

const update = (id, data) => {
    return http.put(`/medical_forecasts/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/medical_forecasts/${id}`);
};

const findByName = (name) => {
    return http.get(`/medical_forecasts?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName,
};
