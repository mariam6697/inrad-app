import React from "react";
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
  SelectPicker,
} from "rsuite";

const SymptomForm = ({
  symptom,
  hideModal,
  visibility,
  setSymptom,
  saveSymptom,
  updateSymptomButton,
  symptomGroups,
}) => {
  return (
    <>
      <Modal show={visibility} onHide={hideModal}>
        <Modal.Header>
          {symptom.id ? (
            <Modal.Title>Editar Síntoma</Modal.Title>
          ) : (
            <Modal.Title>Nuevo Síntoma</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={symptom}
            onChange={(symptom) => setSymptom(symptom)}
          >
            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl name="name" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Grupo</ControlLabel>
              <FormControl
                name="group"
                accepter={SelectPicker}
                style={{ display: "inline-block", width: 200 }}
                data={symptomGroups}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {symptom.id ? (
            <Button onClick={updateSymptomButton} appearance="primary">
              Actualizar
            </Button>
          ) : (
            <Button onClick={saveSymptom} appearance="primary">
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

export default SymptomForm;
