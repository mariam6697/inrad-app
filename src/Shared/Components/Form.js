import React from "react";
import { Button, Form, Modal } from "rsuite";
import GenericFormGroup from "./FormGroup";

const GenericForm = ({
  formValues,
  instance,
  hideModal,
  visibility,
  setInstance,
  saveInstance,
  updateInstance,
}) => {
  return (
    <>
      <Modal show={visibility} onHide={hideModal}>
        <Modal.Header>
          {instance.id ? (
            <Modal.Title>{formValues.edit_title}</Modal.Title>
          ) : (
            <Modal.Title>{formValues.new_title}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={instance}
            onChange={(instance) => setInstance(instance)}
          >
            {formValues.fields.map((field) => (
              <GenericFormGroup
                label={field.label}
                name={field.name}
                required={field.required}
                type={field.type}
                instance={instance}
              />
            ))}
            {formValues.customFields
              ? formValues.customFields.map((Component) => <Component />)
              : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {instance.id ? (
            <Button onClick={updateInstance} appearance="primary">
              Actualizar
            </Button>
          ) : (
            <Button onClick={saveInstance} appearance="primary">
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

export default GenericForm;
