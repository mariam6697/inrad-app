import React from "react";
import PatientDiagnosticContainer from "../PatientDiagnostic/PatientDiagnosticContainer";
import PatientTreatmentContainer from "../PatientTreatment/PatientTreatmentContainer";

const PatientDetailShow = ({ patient }) => {
  return (
    <>
      <h1>Paciente</h1>
      <div>
        <label>
          <strong>Nombre:</strong>
        </label>{" "}
        {patient.name}
      </div>
      <div>
        <label>
          <strong>Apellido:</strong>
        </label>{" "}
        {patient.last_name}
      </div>
      <div>
        <label>
          <strong>RUT:</strong>
        </label>{" "}
        {patient.identifier}
      </div>
      <div>
        <label>
          <strong>Teléfono:</strong>
        </label>{" "}
        {patient.phone_number}
      </div>
      <div>
        <label>
          <strong>Sexo:</strong>
        </label>{" "}
        {patient.gender}
      </div>
      <div>
        <label>
          <strong>Edad:</strong>
        </label>{" "}
        {patient.age}
      </div>
      <PatientTreatmentContainer
        patient_id={patient.id}
        treatments={patient.treatments}
        currentTreatment={patient.current_treatment}
      />
      <PatientDiagnosticContainer
        patient_id={patient.id}
        currentDiagnostic={patient.current_diagnostic}
      />
    </>
  );
};

export default PatientDetailShow;
