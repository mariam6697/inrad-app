import http from "../http-common";

const getAll = () => {
    return http.get("/disease_types/");
};

const get = (id) => {
    return http.get(`/disease_types/${id}`);
};

const create = (data) => {
    return http.post("/disease_types/", data);
};

const update = (id, data) => {
    return http.put(`/disease_types/${id}/`, data);
};

const remove = (id) => {
    return http.delete(`/disease_types/${id}/`);
};

const findByName = (name) => {
    return http.get(`/disease_types/?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
