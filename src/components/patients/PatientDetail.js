import React from "react";
import { Modal, Button } from "rsuite";

const PatientModal = ({ patient, hideModal, visibility }) => {
    return (
        <div className="modal-container">
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Paciente</Modal.Title>
                </Modal.Header>
                {patient ? (
                    <Modal.Body>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {patient.name}
                        </div>
                        <div>
                            <label>
                                <strong>Apellido:</strong>
                            </label>{" "}
                            {patient.last_name}
                        </div>
                        <div>
                            <label>
                                <strong>RUT:</strong>
                            </label>{" "}
                            {patient.identifier}
                        </div>
                        <div>
                            <label>
                                <strong>Teléfono:</strong>
                            </label>{" "}
                            {patient.phone_number}
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

export default PatientModal;
