import http from "../http-common";

const getAll = () => {
    return http.get("/patients/");
};

const get = (id) => {
    return http.get(`/patients/${id}/`);
};

const create = (data) => {
    return http.post("/patients/", data);
};

const update = (id, data) => {
    return http.patch(`/patients/${id}/`, data);
};

const remove = (id) => {
    return http.delete(`/patients/${id}/`);
};

const findByName = (name) => {
    return http.get(`/patients?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
