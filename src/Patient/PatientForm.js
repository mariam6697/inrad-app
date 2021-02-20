import React from "react";
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form, SelectPicker} from "rsuite";

const PatientForm = ({patient, hideModal, visibility, setPatient, savePatient, updatePatientButton}) => {
    const blood_types = [{"label": "O+", "value": "O+"}, {
        "label": "O-", "value": "O-"},
        {"label": "A+", "value": "A+"},
        {"label": "A-", "value": "A-"},
        {"label": "B+", "value": "B+"},
        {"label": "B-", "value": "B-"},
        {"label": "AB+", "value": "AB+"},
        {"label": "AB-", "value": "AB-"}]
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
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Apellido</ControlLabel>
                            <FormControl name="last_name"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>RUT</ControlLabel>
                            <FormControl name="identifier"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Número de teléfono</ControlLabel>
                            <FormControl name="phone_number"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Sexo</ControlLabel>
                            <FormControl name="gender" accepter={SelectPicker}
                                         style={{display: 'inline-block', width: 200}}
                                         data={[{"label": "Masculino", "value": "Masculino"}, {
                                             "label": "Femenino",
                                             "value": "Femenino"
                                         }]}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Edad</ControlLabel>
                            <FormControl name="age"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Tipo de sangre</ControlLabel>
                            <FormControl name="blood_type" accepter={SelectPicker}
                                         style={{display: 'inline-block', width: 200}}
                                         data={blood_types}/>
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