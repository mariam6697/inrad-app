import http from "../http-common";

const getAll = () => {
  return http.get("/diseases/");
};

const get = (id) => {
  return http.get(`/diseases/${id}`);
};

const create = (data) => {
  return http.post("/diseases", data);
};

const update = (id, data) => {
  return http.put(`/diseases/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/diseases/${id}`);
};

const findByName = (name) => {
  return http.get(`/diseases?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
