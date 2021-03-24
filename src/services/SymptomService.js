import http from "../http-common";

const getAll = () => {
  return http.get("/symptoms/");
};

const get = (id) => {
  return http.get(`/symptoms/${id}`);
};

const create = (data) => {
  return http.post("/symptoms/", data);
};

const update = (id, data) => {
  return http.put(`/symptoms/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/symptoms/${id}/`);
};

const findByName = (name) => {
  return http.get(`/symptoms/?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
