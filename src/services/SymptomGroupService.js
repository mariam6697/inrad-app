import http from "../http-common";

const getAll = () => {
  return http.get("/symptom_groups/");
};

const get = (id) => {
  return http.get(`/symptom_groups/${id}`);
};

const create = (data) => {
  return http.post("/symptom_groups/", data);
};

const update = (id, data) => {
  return http.put(`/symptom_groups/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/symptom_groups/${id}/`);
};

const findByName = (name) => {
  return http.get(`/symptom_groups/?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
