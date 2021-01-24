import React from "react";
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form} from "rsuite";

const PatientForm = ({patient, hideModal, visibility, setPatient, savePatient, updatePatientButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {patient.id ?
                        (<Modal.Title>Editar Paciente</Modal.Title>) : (
                            <Modal.Title>Nuevo Paciente</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={patient} onChange={patient => setPatient(patient)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Apellido</ControlLabel>
                            <FormControl name="last_name"/>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>RUT</ControlLabel>
                            <FormControl name="identifier"/>
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Número de teléfono</ControlLabel>
                            <FormControl name="phone_number"/>
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Sexo</ControlLabel>
                            <FormControl name="gender"/>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Edad</ControlLabel>
                            <FormControl name="age"/>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Tipo de sangre</ControlLabel>
                            <FormControl name="blood_type"/>
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {patient.id ?
                        (<Button onClick={updatePatientButton} appearance="primary">
                            Actualizar
                        </Button>) : (
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