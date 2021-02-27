import React from "react";
import { Modal, Button } from "rsuite";

const DiseaseTypeDetail = ({ diseaseType, hideModal, visibility }) => {
    return (
        <div className="modal-container">
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Tipo de Cáncer</Modal.Title>
                </Modal.Header>
                {diseaseType ? (
                    <Modal.Body>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {diseaseType.name}
                        </div>
                        <div>
                            <label>
                                <strong>Código:</strong>
                            </label>{" "}
                            {diseaseType.code}
                        </div>
                        <div>
                            <label>
                                <strong>Descripción:</strong>
                            </label>{" "}
                            {diseaseType.description}
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

export default DiseaseTypeDetail;
