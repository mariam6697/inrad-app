import React from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "rsuite";

const TreatmentCategoryForm = ({treatmentCategory, hideModal, visibility, setTreatmentCategory, saveTreatmentCategory, updateTreatmentCategoryButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {treatmentCategory.id ?
                        (<Modal.Title>Editar categoría de tratamiento</Modal.Title>) : (
                            <Modal.Title>Nuevo categoría de tratamiento</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={treatmentCategory} onChange={treatmentCategory => setTreatmentCategory(treatmentCategory)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {treatmentCategory.id ?
                        (<Button onClick={updateTreatmentCategoryButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveTreatmentCategory} appearance="primary">
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

export default TreatmentCategoryForm;