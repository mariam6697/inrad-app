import http from "../http-common";

const getAll = (patient_id) => {
    return http.get(`patients/${patient_id}/attachments/`);
};

async function get(patient_id, id) {
    return await http.get(`patients/${patient_id}/attachments/${id}/`);
}

const create = (patient_id, data) => {
    return http.post(`patients/${patient_id}/attachments/`, data);
};

const update = (patient_id, id, data) => {
    return http.patch(`patients/${patient_id}/attachments/${id}/`, data);
};

const remove = (patient_id, id) => {
    return http.delete(`patients/${patient_id}/attachments/${id}/`);
};

const findByName = (patient_id, name) => {
    return http.get(`patients/${patient_id}/attachments?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByName
};
