import React from "react";
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form, SelectPicker} from "rsuite";

const UserForm = ({user, hideModal, visibility, setUser, saveUser, updateUserButton, roles}) => {

    return (
        <>
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    {user.id ?
                        (<Modal.Title>Editar Rol</Modal.Title>) : (
                            <Modal.Title>Nuevo Rol</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        formValue={user} onChange={user => setUser(user)}
                    >
                        <FormGroup>
                            <ControlLabel>Nombre de usuario</ControlLabel>
                            <FormControl name="username"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="email"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Nombres</ControlLabel>
                            <FormControl name="first_name"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Apellido</ControlLabel>
                            <FormControl name="last_name"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Rol</ControlLabel>
                            <FormControl name="role" accepter={SelectPicker}
                                         style={{display: 'inline-block', width: 200}}
                                         data={roles}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {user.id ?
                        (<Button onClick={updateUserButton} appearance="primary">
                            Actualizar
                        </Button>) : (
                            <Button onClick={saveUser} appearance="primary">
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

export default UserForm;