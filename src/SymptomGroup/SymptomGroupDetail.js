import React from "react";
import { Modal, Button } from "rsuite";

const SymptomGroupDetail = ({ symptomGroup, hideModal, visibility }) => {
    return (
        <div className="modal-container">
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Categoría de tratamiento</Modal.Title>
                </Modal.Header>
                {symptomGroup ? (
                    <Modal.Body>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {symptomGroup.name}
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

export default SymptomGroupDetail;
