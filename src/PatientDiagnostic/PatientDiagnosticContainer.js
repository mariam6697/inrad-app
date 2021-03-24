import React, { useState } from "react";
import PatientDiagnosticDataService from "../services/PatientDiagnosticService";
import { Alert, Button } from "rsuite";
import GenericForm from "../Shared/Components/Form";
import PatientDiagnosticValues from "./PatientDiagnosticValues";
import PatientDataService from "../services/PatientService";

const PatientDiagnostic = ({ patient_id, currentDiagnostic }) => {
  const initialPatientDiagnosticState = {
    id: null,
    diagnostic_date: "",
    description: "",
    disease_type: "",
    disease_stage: "",
    disease_aggressiveness: "",
  };
  const [patientDiagnostic, setPatientDiagnostic] = useState(
    initialPatientDiagnosticState
  );
  const [currentPatientDiagnostic, setCurrentPatientDiagnostic] = useState(
    currentDiagnostic
  );
  const [formVisibility, setFormVisibility] = useState(false);

  const retrievePatientDiagnostic = () => {
    PatientDataService.get(patient_id)
      .then((response) => {
        setCurrentPatientDiagnostic(response.data.current_diagnostic);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const savePatientDiagnostic = () => {
    PatientDiagnosticDataService.create(patient_id, patientDiagnostic)
      .then((response) => {
        setPatientDiagnostic({
          id: response.data.id,
          diagnostic_date: response.data.diagnostic_date,
          description: response.data.description,
          disease_type: response.data.disease_type,
          disease_stage: response.data.disease_stage,
          disease_aggressiveness: response.data.disease_aggressiveness,
        });
        setFormVisibility(false);
        retrievePatientDiagnostic();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPatientDiagnostic = () => {
    setPatientDiagnostic(initialPatientDiagnosticState);
  };

  const patientDiagnosticFormButton = () => {
    newPatientDiagnostic();
    setFormVisibility(true);
  };

  const patientDiagnosticEditFormButton = () => {
    setPatientDiagnostic(currentPatientDiagnostic);
    setFormVisibility(true);
  };

  const setFormPatientDiagnostic = (data) => {
    setPatientDiagnostic({
      id: data.id,
      diagnostic_date: data.diagnostic_date,
      description: data.description,
      disease_type: data.disease_type,
      disease_stage: data.disease_stage,
      disease_aggressiveness: data.disease_aggressiveness,
    });
  };

  const updatePatientDiagnosticButton = () => {
    let data = {
      id: patientDiagnostic.id,
      diagnostic_date: patientDiagnostic.diagnostic_date,
      description: patientDiagnostic.description,
      disease_type: patientDiagnostic.disease_type,
      disease_stage: patientDiagnostic.disease_stage,
      disease_aggressiveness: patientDiagnostic.disease_aggressiveness,
    };
    PatientDiagnosticDataService.update(patient_id, data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrievePatientDiagnostic();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePatientDiagnostic = (patient_id, id) => {
    PatientDiagnosticDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Modalidad de tratamiento eliminada exitosamente");
        retrievePatientDiagnostic();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar la modalidad de tratamiento");
      });
  };

  return (
    <>
      <h3>Diagnóstico</h3>
      {currentPatientDiagnostic ? (
        <div>
          <div>
            <label>
              <strong>Fecha de diagnóstico:</strong>
            </label>{" "}
            {currentPatientDiagnostic.diagnostic_date}
          </div>
          <div>
            <label>
              <strong>Descripción:</strong>
            </label>{" "}
            {currentPatientDiagnostic.description}
          </div>
          <div>
            <label>
              <strong>Tipo:</strong>
            </label>{" "}
            {currentPatientDiagnostic.disease_type.name}
          </div>
          <div>
            <label>
              <strong>Etapa:</strong>
            </label>{" "}
            {currentPatientDiagnostic.disease_stage}
          </div>
          <div>
            <label>
              <strong>Agresividad:</strong>
            </label>{" "}
            {currentPatientDiagnostic.disease_aggressiveness}
          </div>
        </div>
      ) : (
        <div>
          <label>
            <strong>No posee diagnóstico</strong>
          </label>
        </div>
      )}
      <Button onClick={patientDiagnosticFormButton}>
        {PatientDiagnosticValues.listValues.new_title}{" "}
      </Button>
      <Button onClick={patientDiagnosticEditFormButton}> Editar </Button>
      <div className="modal-container">
        <GenericForm
          formValues={PatientDiagnosticValues.formValues}
          instance={patientDiagnostic}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setPatientDiagnostic}
          saveInstance={savePatientDiagnostic}
          updateInstance={updatePatientDiagnosticButton}
        />
      </div>
    </>
  );
};

export default PatientDiagnostic;
