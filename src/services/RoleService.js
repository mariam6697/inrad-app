import http from "../http-common";

const getAll = () => {
    return http.get("/roles/");
};

const get = (id) => {
    return http.get(`/roles/${id}`);
};

const create = (data) => {
    return http.post("/roles/", data);
};

const update = (id, data) => {
    return http.put(`/roles/${id}/`, data);
};

const remove = (id) => {
    return http.delete(`/roles/${id}`);
};

const findByName = (name) => {
    return http.get(`/roles/?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
