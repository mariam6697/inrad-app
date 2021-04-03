import http from "../http-common";

async function get(patient_id, appointment_id, id) {
  return await http.get(
    `patients/${patient_id}/appointments/${appointment_id}/symptoms/${id}/`
  );
}

const create = (patient_id, appointment_id, data) => {
  data.forEach((symptom) => {
    http.post(
      `patients/${patient_id}/appointments/${appointment_id}/symptoms/`,
      symptom
    );
  });
};

const update = (patient_id, appointment_id, id, data) => {
  return http.patch(
    `patients/${patient_id}/appointments/${appointment_id}/symptoms/${id}/`,
    data
  );
};

const remove = (patient_id, appointment_id, id) => {
  return http.delete(
    `patients/${patient_id}/appointments/${appointment_id}/symptoms/${id}/`
  );
};

export default {
  get,
  create,
  update,
  remove,
};
