import React from "react";
import { Modal, Button } from "rsuite";

const UserDetail = ({ user, hideModal, visibility }) => {
    return (
        <div className="modal-container">
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Usuario</Modal.Title>
                </Modal.Header>
                {user ? (
                    <Modal.Body>
                        <div>
                            <label>
                                <strong>Nombre de usuario:</strong>
                            </label>{" "}
                            {user.username}
                        </div>
                        <div>
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {user.email}
                        </div>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {user.first_name}
                        </div>
                        <div>
                            <label>
                                <strong>Apellido:</strong>
                            </label>{" "}
                            {user.last_name}
                        </div>
                        <div>
                            <label>
                                <strong>Rol:</strong>
                            </label>{" "}
                            {user.role}
                        </div>
                    </Modal.Body>
                ) : (
                    <div>
                        <br />
                    </div>
                )}
                <Modal.Footer>
                    <Button onClick={hideModal} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={hideModal} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserDetail;
