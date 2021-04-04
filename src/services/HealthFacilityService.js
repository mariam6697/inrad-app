import http from "../http-common";

const getAll = () => {
  return http.get("/health_facilities/");
};

async function get(id) {
  return await http.get(`/health_facilities/${id}/`);
}

const create = (data) => {
  return http.post("/health_facilities/", data);
};

const update = (id, data) => {
  return http.patch(`/health_facilities/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/health_facilities/${id}/`);
};

const findByName = (name) => {
  return http.get(`/health_facilities?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};
