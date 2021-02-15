import React from "react";
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form} from "rsuite";

const RoleForm = ({role, hideModal, visibility, setRole, saveRole, updateRoleButton}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {role.id ?
                        (<Modal.Title>Editar Rol</Modal.Title>) : (
                            <Modal.Title>Nuevo Rol</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={role} onChange={role => setRole(role)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre</ControlLabel>
                            <FormControl name="name"/>
                            <HelpBlock>Requerido</HelpBlock>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {role.id ?
                        (<Button onClick={updateRoleButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveRole} appearance="primary">
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

export default RoleForm;