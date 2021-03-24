import http from "../http-common";

const getAll = () => {
  return http.get("/disease_categories/");
};

const get = (id) => {
  return http.get(`/disease_categories/${id}`);
};

const create = (data) => {
  return http.post("/disease_categories/", data);
};

const update = (id, data) => {
  return http.put(`/disease_categories/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/disease_categories/${id}/`);
};

const findByName = (name) => {
  return http.get(`/disease_categories/?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
