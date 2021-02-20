import React from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal, SelectPicker} from "rsuite";

const TreatmentForm = ({treatment, hideModal, visibility, setTreatment, saveTreatment, updateTreatmentButton, treatmentCategories}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {treatment.id ?
                        (<Modal.Title>Editar Tratamiento</Modal.Title>) : (
                            <Modal.Title>Nuevo Tratamiento</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={treatment} onChange={treatment => setTreatment(treatment)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Categoría</ControlLabel>
                            <FormControl name="category" accepter={SelectPicker}
                                         style={{display: 'inline-block', width: 200}}
                                         data={treatmentCategories}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {treatment.id ?
                        (<Button onClick={updateTreatmentButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveTreatment} appearance="primary">
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

export default TreatmentForm;