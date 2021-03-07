import React from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "rsuite";

const TreatmentModeForm = ({treatmentMode, hideModal, visibility, setTreatmentMode, saveTreatmentMode, updateTreatmentModeButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {treatmentMode.id ?
                        (<Modal.Title>Editar modalidad de tratamiento</Modal.Title>) : (
                            <Modal.Title>Nuevo modalidad de tratamiento</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={treatmentMode} onChange={treatmentMode => setTreatmentMode(treatmentMode)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {treatmentMode.id ?
                        (<Button onClick={updateTreatmentModeButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveTreatmentMode} appearance="primary">
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

export default TreatmentModeForm;