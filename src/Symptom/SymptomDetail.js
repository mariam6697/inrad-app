import React from "react";
import { Modal, Button } from "rsuite";

const SymptomDetail = ({ symptom, hideModal, visibility }) => {
    return (
        <div className="modal-container">
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Síntoma</Modal.Title>
                </Modal.Header>
                {symptom ? (
                    <Modal.Body>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {symptom.name}
                        </div>
                        <div>
                            <label>
                                <strong>Grupo:</strong>
                            </label>{" "}
                            {symptom.group}
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
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SymptomDetail;
