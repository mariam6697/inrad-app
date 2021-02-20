import React from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "rsuite";

const SymptomGroupForm = ({symptomGroup, hideModal, visibility, setSymptomGroup, saveSymptomGroup, updateSymptomGroupButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {symptomGroup.id ?
                        (<Modal.Title>Editar grupo de síntomas</Modal.Title>) : (
                            <Modal.Title>Editar grupo de síntomas</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={symptomGroup} onChange={symptomGroup => setSymptomGroup(symptomGroup)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {symptomGroup.id ?
                        (<Button onClick={updateSymptomGroupButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveSymptomGroup} appearance="primary">
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

export default SymptomGroupForm;