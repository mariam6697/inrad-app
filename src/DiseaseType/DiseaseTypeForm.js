import React from "react";
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form} from "rsuite";

const DiseaseTypeForm = ({diseaseType, hideModal, visibility, setDiseaseType, saveDiseaseType, updateDiseaseTypeButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {diseaseType.id ?
                        (<Modal.Title>Editar tipo de cáncer</Modal.Title>) : (
                            <Modal.Title>Nuevo tipo de cáncer</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={diseaseType} onChange={diseaseType => setDiseaseType(diseaseType)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Código</ControlLabel>
                            <FormControl name="code" type="number"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Descripción</ControlLabel>
                            <FormControl name="description"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {diseaseType.id ?
                        (<Button onClick={updateDiseaseTypeButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveDiseaseType} appearance="primary">
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

export default DiseaseTypeForm;