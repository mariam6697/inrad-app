import http from "../http-common";

const getAll = () => {
  return http.get("/treatment_modes/");
};

const get = (id) => {
  return http.get(`/treatment_modes/${id}`);
};

const create = (data) => {
  return http.post("/treatment_modes/", data);
};

const update = (id, data) => {
  return http.put(`/treatment_modes/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/treatment_modes/${id}/`);
};

const findByName = (name) => {
  return http.get(`/treatment_modes/?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
