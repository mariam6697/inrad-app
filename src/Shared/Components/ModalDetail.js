import React from "react";
import { Modal, Button } from "rsuite";

const GenericModalDetail = ({
  detailValues,
  instance,
  hideModal,
  visibility,
}) => {
  return (
    <div className="modal-container">
      <Modal show={visibility} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{detailValues.title}</Modal.Title>
        </Modal.Header>
        {instance ? (
          <Modal.Body>
            {detailValues.fields.map((field) => (
              <div>
                <label>
                  <strong>{field.label}:</strong>
                </label>{" "}
                {instance[field.name]}
              </div>
            ))}
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

export default GenericModalDetail;
