import http from "../http-common";

const getAll = () => {
    return http.get("/treatment_machines/");
};

const get = (id) => {
    return http.get(`/treatment_machines/${id}`);
};

const create = (data) => {
    return http.post("/treatment_machines/", data);
};

const update = (id, data) => {
    return http.put(`/treatment_machines/${id}/`, data);
};

const remove = (id) => {
    return http.delete(`/treatment_machines/${id}/`);
};

const findByName = (name) => {
    return http.get(`/treatment_machines/?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
