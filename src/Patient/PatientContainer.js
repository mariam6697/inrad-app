import React, { useState, useEffect } from "react";
import PatientDataService from "../services/PatientService";
import PatientList from "./PatientList";
import PatientForm from "./PatientForm";
import { Alert } from "rsuite";
import HealthFacilityDataService from "../services/HealthFacilityService";
import MedicalForecastDataService from "../services/MedicalForecastService";

const Patient = () => {
  const initialPatientState = {
    id: null,
    name: "",
    last_name: "",
    identifier: "",
    phone_number: "",
    gender: "",
    birth_date: null,
    health_facility: null,
    attachments: [],
    treatments: [],
    diagnostics: [],
    current_treatment: null,
    current_diagnostic: null,
  };
  const [patient, setPatient] = useState([]);
  const [patients, setPatients] = useState([]);
  const [healthFacilities, setHealthFacilities] = useState([]);
  const [medicalForecasts, setMedicalForecasts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPatient, setCurrentPatient] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrievePatients();
    retrieveHealthFacilities();
    retrieveMedicalForecasts();
  }, []);

  const retrieveHealthFacilities = () => {
    HealthFacilityDataService.getAll()
      .then((response) => {
        const healthFacilities = response.data;
        const healthFacilitiesForSelect = healthFacilities.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setHealthFacilities(healthFacilitiesForSelect);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveMedicalForecasts = () => {
    MedicalForecastDataService.getAll()
      .then((response) => {
        const medicalForecasts = response.data;
        const medicalForecastsForSelect = medicalForecasts.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setMedicalForecasts(medicalForecastsForSelect);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePatients = () => {
    PatientDataService.getAll()
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    PatientDataService.findByName(searchName)
      .then((response) => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const savePatient = () => {
    PatientDataService.create(patient)
      .then((response) => {
        setPatient({
          id: response.data.id,
          name: response.data.name,
          last_name: response.data.last_name,
          identifier: response.data.identifier,
          phone_number: response.data.phone_number,
          gender: response.data.gender,
          birth_date: response.data.birth_date,
          health_facility: response.data.health_facility,
          attachments: response.data.attachments,
          treatments: response.data.treatments,
          diagnostics: response.data.diagnostics,
          current_treatment: response.data.current_treatment,
          current_diagnostic: response.data.current_diagnostic,
        });
        setFormVisibility(false);
        retrievePatients();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPatient = () => {
    setPatient(initialPatientState);
  };

  const patientFormButton = () => {
    newPatient();
    setFormVisibility(true);
  };

  const setFormPatient = (data) => {
    setPatient({
      id: data.id,
      name: data.name,
      last_name: data.last_name,
      identifier: data.identifier,
      phone_number: data.phone_number,
      gender: data.gender,
      birth_date: data.birth_date,
      health_facility: data.health_facility,
      attachments: data.attachments,
      treatments: data.treatments,
      diagnostics: data.diagnostics,
      current_treatment: data.current_treatment,
      current_diagnostic: data.current_diagnostic,
    });
  };

  const updatePatientButton = () => {
    let data = {
      id: patient.id,
      name: patient.name,
      last_name: patient.last_name,
      identifier: patient.identifier,
      phone_number: patient.phone_number,
      gender: patient.gender,
      birth_date: patient.birth_date,
      health_facility: patient.health_facility,
    };
    PatientDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrievePatients();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePatient = (id) => {
    PatientDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Paciente eliminado exitosamente");
        retrievePatients();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar el paciente");
      });
  };

  return (
    <>
      <PatientList
        patients={patients}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        patientFormButton={patientFormButton}
        setCurrentPatient={setCurrentPatient}
        setFormPatient={setFormPatient}
        showFormModal={() => setFormVisibility(true)}
        deletePatient={deletePatient}
        loading={loading}
      />
      <div className="modal-container">
        <PatientForm
          patient={patient}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setPatient={setPatient}
          savePatient={savePatient}
          updatePatientButton={updatePatientButton}
          healthFacilities={healthFacilities}
          medicalForecasts={medicalForecasts}
        />
      </div>
    </>
  );
};

export default Patient;
