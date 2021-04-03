import React, { useState } from "react";
import PatientAttachmentDataService from "../services/PatientAttachmentService";
import { Alert } from "rsuite";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import PatientAttachmentValues from "./PatientAttachmentValues";

const PatientAttachment = ({ patient_id, attachments }) => {
  const initialPatientAttachmentState = {
    id: null,
    name: "",
    description: "",
    attachment: null,
  };
  const [patientAttachment, setPatientAttachment] = useState([]);
  const [patientAttachments, setPatientAttachments] = useState(attachments);
  const [searchName, setSearchName] = useState("");
  const [currentPatientAttachment, setCurrentPatientAttachment] = useState(
    null
  );
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrievePatientAttachments = () => {
    PatientAttachmentDataService.getAll(patient_id)
      .then((response) => {
        setPatientAttachments(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    PatientAttachmentDataService.findByName(patient_id, searchName)
      .then((response) => {
        setPatientAttachments(response.data);
      })
      .catch((e) => {});
  };

  const savePatientAttachment = () => {
    console.log(patientAttachment);
    PatientAttachmentDataService.create(patient_id, patientAttachment)
      .then((response) => {
        setPatientAttachment({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          attachment: response.data.attachment,
        });
        setFormVisibility(false);
        retrievePatientAttachments();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPatientAttachment = () => {
    setPatientAttachment(initialPatientAttachmentState);
  };

  const patientAttachmentFormButton = () => {
    newPatientAttachment();
    setFormVisibility(true);
  };

  const setFormPatientAttachment = (data) => {
    setPatientAttachment({
      id: data.id,
      name: data.name,
      description: data.description,
      attachment: data.attachment,
    });
  };

  const updatePatientAttachmentButton = () => {
    let data = {
      id: patientAttachment.id,
      name: patientAttachment.name,
      description: patientAttachment.description,
      attachment: patientAttachment.attachment,
    };
    PatientAttachmentDataService.update(patient_id, data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrievePatientAttachments();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePatientAttachment = (patient_id, id) => {
    PatientAttachmentDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Modalidad de tratamiento eliminada exitosamente");
        retrievePatientAttachments();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar la modalidad de tratamiento");
      });
  };

  return (
    <>
      <div className="modal-container">
        <GenericModalDetail
          detailValues={PatientAttachmentValues.detailValues}
          instance={currentPatientAttachment}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={PatientAttachmentValues.listValues}
        instances={patientAttachments}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={patientAttachmentFormButton}
        setCurrentInstance={setCurrentPatientAttachment}
        setFormInstance={setFormPatientAttachment}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deletePatientAttachment}
        loading={loading}
      />
      <div className="modal-container">
        <GenericForm
          formValues={PatientAttachmentValues.formValues}
          instance={patientAttachment}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setPatientAttachment}
          saveInstance={savePatientAttachment}
          updateInstance={updatePatientAttachmentButton}
        />
      </div>
    </>
  );
};

export default PatientAttachment;
