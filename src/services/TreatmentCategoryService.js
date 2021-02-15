import http from "../http-common";

const getAll = () => {
    return http.get("/treatment_categories/");
};

const get = (id) => {
    return http.get(`/treatment_categories/${id}`);
};

const create = (data) => {
    return http.post("/treatment_categories/", data);
};

const update = (id, data) => {
    return http.put(`/treatment_categories/${id}/`, data);
};

const remove = (id) => {
    return http.delete(`/treatment_categories/${id}/`);
};

const findByName = (name) => {
    return http.get(`/treatment_categories/?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
