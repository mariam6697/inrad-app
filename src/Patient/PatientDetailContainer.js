import React, { useEffect, useState } from "react";
import PatientDataService from "../services/PatientService";
import { useParams } from "react-router";
import PatientDetailShow from "./Patient";

const PatientDetail = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    retrievePatient();
  }, []);

  const setPatientDetail = (data) => {
    setPatient({
      id: data.id,
      name: data.name,
      last_name: data.last_name,
      identifier: data.identifier,
      phone_number: data.phone_number,
      gender: data.gender,
      birth_date: data.birth_date,
      attachments: data.attachments,
      treatments: data.treatments,
      current_treatment: data.current_treatment,
      current_diagnostic: data.current_diagnostic,
      health_facility: data.health_facility,
      medical_forecast: data.medical_forecast,
    });
  };

  const retrievePatient = () => {
    PatientDataService.get(id)
      .then((response) => {
        setPatientDetail(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <>{patient && <PatientDetailShow patient={patient} />}</>;
};

export default PatientDetail;
