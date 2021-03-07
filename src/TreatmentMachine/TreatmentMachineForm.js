import React from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "rsuite";

const TreatmentMachineForm = ({treatmentMachine, hideModal, visibility, setTreatmentMachine, saveTreatmentMachine, updateTreatmentMachineButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {treatmentMachine.id ?
                        (<Modal.Title>Editar máquina de tratamiento</Modal.Title>) : (
                            <Modal.Title>Nuevo máquina de tratamiento</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={treatmentMachine} onChange={treatmentMachine => setTreatmentMachine(treatmentMachine)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {treatmentMachine.id ?
                        (<Button onClick={updateTreatmentMachineButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveTreatmentMachine} appearance="primary">
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

export default TreatmentMachineForm;