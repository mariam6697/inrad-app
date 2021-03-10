import http from "../http-common";

const getAll = (patient_id) => {
    return http.get(`patients/${patient_id}/diagnostics/`);
};

async function get(patient_id, id) {
    return await http.get(`patients/${patient_id}/diagnostics/${id}/`);
}

const create = (patient_id, data) => {
    return http.post(`patients/${patient_id}/diagnostics/`, data);
};

const update = (patient_id, id, data) => {
    return http.patch(`patients/${patient_id}/diagnostics/${id}/`, data);
};

const remove = (patient_id, id) => {
    return http.delete(`patients/${patient_id}/diagnostics/${id}/`);
};

const findByName = (patient_id, name) => {
    return http.get(`patients/${patient_id}/diagnostics?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
