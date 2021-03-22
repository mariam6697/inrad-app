import http from "../http-common";

const getAll = (patient_id) => {
    return http.get(`patients/${patient_id}/attachments/`);
};

async function get(patient_id, id) {
    return await http.get(`patients/${patient_id}/attachments/${id}/`);
}

const create = (patient_id, data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("attachment", data.attachment);
    return http.post(`patients/${patient_id}/attachments/`, formData);
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
