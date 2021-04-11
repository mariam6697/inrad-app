import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Form,
  SelectPicker,
  DatePicker
} from "rsuite";

const PatientForm = ({
  patient,
  hideModal,
  visibility,
  setPatient,
  savePatient,
  updatePatientButton,
  healthFacilities,
  medicalForecasts,
}) => {
  const onChangeCalendar = (value, e) => {
    patient.birth_date = value;
    patient.birth_date = patient.birth_date.toISOString().slice(0, 10);
  };

  return (
    <>
      <Modal show={visibility} onHide={hideModal}>
        <Modal.Header>
          {patient.id ? (
            <Modal.Title>Editar Paciente</Modal.Title>
          ) : (
            <Modal.Title>Nuevo Paciente</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={patient}
            onChange={(patient) => setPatient(patient)}
          >
            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl name="name" />
              <ControlLabel>Apellido</ControlLabel>
              <FormControl name="last_name" />
              <ControlLabel>RUT</ControlLabel>
              <FormControl name="identifier" />
              <ControlLabel>Número de teléfono</ControlLabel>
              <FormControl name="phone_number" />
              <ControlLabel>Sexo</ControlLabel>
              <FormControl
                name="gender"
                accepter={SelectPicker}
                style={{ display: "inline-block", width: 200 }}
                data={[
                  { label: "Masculino", value: "Masculino" },
                  {
                    label: "Femenino",
                    value: "Femenino",
                  },
                ]}
              />
              <ControlLabel>Fecha de nacimiento</ControlLabel>
              <DatePicker
                onChange={onChangeCalendar}
                placeholder="Seleccione Fecha"
                format="YYYY-MM-DD"
              />
              <ControlLabel>Derivado desde </ControlLabel>
              <FormControl
                name="health_facility"
                accepter={SelectPicker}
                style={{ display: "inline-block", width: 200 }}
                data={healthFacilities}
              />
              <ControlLabel>Previsión de salud </ControlLabel>
              <FormControl
                name="medical_forecast"
                accepter={SelectPicker}
                style={{ display: "inline-block", width: 200 }}
                data={medicalForecasts}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {patient.id ? (
            <Button onClick={updatePatientButton} appearance="primary">
              Actualizar
            </Button>
          ) : (
            <Button onClick={savePatient} appearance="primary">
              Crear
            </Button>
          )}

          <Button onClick={hideModal} appearance="subtle">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientForm;
