import http from "../http-common";

async function get(patient_id, appointment_id, id) {
  return await http.get(
    `patients/${patient_id}/appointments/${appointment_id}/images/${id}/`
  );
}

const create = (patient_id, appointment_id, data) => {
  data.forEach((image) => {
    const formData = new FormData();
    formData.append("name", image.name);
    formData.append("description", image.description);
    formData.append("image", image.image);
    http.post(
      `patients/${patient_id}/appointments/${appointment_id}/images/`,
      formData
    );
  });
};

const update = (patient_id, appointment_id, id, data) => {
  return http.patch(
    `patients/${patient_id}/appointments/${appointment_id}/images/${id}/`,
    data
  );
};

const remove = (patient_id, appointment_id, id) => {
  return http.delete(
    `patients/${patient_id}/appointments/${appointment_id}/images/${id}/`
  );
};

export default {
  get,
  create,
  update,
  remove,
};
