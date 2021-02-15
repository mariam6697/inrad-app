import React from "react";
import { Modal, Button } from "rsuite";

const TreatmentCategoryDetail = ({ treatmentCategory, hideModal, visibility }) => {
    return (
        <div className="modal-container">
            <Modal show={visibility} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Categoría de tratamiento</Modal.Title>
                </Modal.Header>
                {treatmentCategory ? (
                    <Modal.Body>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {treatmentCategory.name}
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

export default TreatmentCategoryDetail;
