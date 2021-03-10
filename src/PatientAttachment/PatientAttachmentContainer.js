import React, {useState} from "react";
import PatientAttachmentDataService from "../services/PatientAttachmentService";
import {Alert} from "rsuite";
import GenericDetail from "../Shared/Components/Detail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import PatientAttachmentValues from "./PatientAttachmentValues";


const PatientAttachment = ({patient_id, attachments}) => {
    const initialPatientAttachmentState = {
        id: null,
        name: "",
        description: "",
        link: ""
    };
    const [patientAttachment, setPatientAttachment] = useState([]);
    const [patientAttachments, setPatientAttachments] = useState(attachments);
    const [searchName, setSearchName] = useState("");
    const [currentPatientAttachment, setCurrentPatientAttachment] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrievePatientAttachments = () => {
        PatientAttachmentDataService.getAll(patient_id)
            .then(response => {
                setPatientAttachments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        PatientAttachmentDataService.findByName(patient_id, searchName)
            .then((response) => {
                setPatientAttachments(response.data);
            })
            .catch((e) => {
            });
    };

    const savePatientAttachment = () => {
        PatientAttachmentDataService.create(patient_id, patientAttachment)
            .then(response => {
                setPatientAttachment({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    link: response.data.link,
                });
                setFormVisibility(false);
                retrievePatientAttachments();
                console.log(response.data);
            })
            .catch(e => {
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
            link: data.link,
        });
    }


    const updatePatientAttachmentButton = () => {
        let data = {
            id: patientAttachment.id,
            name: patientAttachment.name,
            description: patientAttachment.description,
            link: patientAttachment.link,
        }
        PatientAttachmentDataService.update(patient_id, data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrievePatientAttachments();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePatientAttachment = (patient_id, id) => {
        PatientAttachmentDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Modalidad de tratamiento eliminada exitosamente');
                retrievePatientAttachments();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar la modalidad de tratamiento');
            });
    };

    return (
        <>
            <div className="modal-container">
                <GenericDetail
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
