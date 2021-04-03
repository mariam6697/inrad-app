import React, { useEffect, useState } from "react";
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Input,
  Modal,
  SelectPicker,
} from "rsuite";
import SymptomForm from "./SymptomForm";
import AppointmentImageForm from "./AppointmentImageForm";

const AppointmentForm = ({
  appointment,
  hideModal,
  visibility,
  setAppointment,
  saveAppointment,
  updateAppointmentButton,
}) => {
  return (
    <>
      <Modal show={visibility} onHide={hideModal}>
        <Modal.Header>
          {appointment.id ? (
            <Modal.Title>Editar Visita</Modal.Title>
          ) : (
            <Modal.Title>Nuevo Visita</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={appointment}
            onChange={(appointment) => setAppointment(appointment)}
          >
            <FormGroup>
              <ControlLabel>Resumen</ControlLabel>
              <FormControl name="summary" />
            </FormGroup>
            <SymptomForm
              appointment={appointment}
              setAppointment={setAppointment}
            />
            <AppointmentImageForm
              appointment={appointment}
              setAppointment={setAppointment}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {appointment.id ? (
            <Button onClick={updateAppointmentButton} appearance="primary">
              Actualizar
            </Button>
          ) : (
            <Button onClick={saveAppointment} appearance="primary">
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

export default AppointmentForm;
