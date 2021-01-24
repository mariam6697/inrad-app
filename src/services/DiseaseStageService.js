import http from "../http-common";

const getAll = () => {
    return http.get("/disease_stages/");
};

const get = (id) => {
    return http.get(`/disease_stages/${id}`);
};

const create = (data) => {
    return http.post("/disease_stages/", data);
};

const update = (id, data) => {
    return http.put(`/disease_stages/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/disease_stages/${id}`);
};

const findByName = (name) => {
    return http.get(`/disease_stages?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
