import React from "react";
import { Modal, Button } from "rsuite";

const TreatmentDetail = ({ treatment, hideModal, visibility }) => {
  return (
    <div className="modal-container">
      <Modal show={visibility} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Tratamiento</Modal.Title>
        </Modal.Header>
        {treatment ? (
          <Modal.Body>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {treatment.name}
            </div>
            <div>
              <label>
                <strong>Categoría:</strong>
              </label>{" "}
              {treatment.category}
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

export default TreatmentDetail;
