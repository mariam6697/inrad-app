import React, {useEffect, useState} from "react";
import PatientTreatmentDataService from "../services/PatientTreatmentService";
import {Alert} from "rsuite";
import GenericDetail from "../Shared/Components/Detail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import PatientTreatmentValues from "./PatientTreatmentValues";


const PatientTreatment = ({patient_id, treatments}) => {
    const initialPatientTreatmentState = {
        id: null,
        start_date: "",
        end_date: "",
        machine: null,
        mode: null,
        success: null,
        treatment: null
    };
    const [patientTreatment, setPatientTreatment] = useState([]);
    const [patientTreatments, setPatientTreatments] = useState(treatments);
    const [searchName, setSearchName] = useState("");
    const [currentPatientTreatment, setCurrentPatientTreatment] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrievePatientTreatments = () => {
        PatientTreatmentDataService.getAll(patient_id)
            .then(response => {
                setPatientTreatments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        PatientTreatmentDataService.findByName(patient_id, searchName)
            .then((response) => {
                setPatientTreatments(response.data);
            })
            .catch((e) => {
            });
    };

    const savePatientTreatment = () => {
        PatientTreatmentDataService.create(patient_id, patientTreatment)
            .then(response => {
                setPatientTreatment({
                    id: response.data.id,
                    start_date: response.data.start_date,
                    end_date: response.data.end_date,
                    machine: response.data.machine,
                    mode: response.data.mode,
                    success: response.data.success,
                    treatment: response.data.treatment
                });
                setFormVisibility(false);
                retrievePatientTreatments();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPatientTreatment = () => {
        setPatientTreatment(initialPatientTreatmentState);
    };

    const patientTreatmentFormButton = () => {
        newPatientTreatment();
        setFormVisibility(true);

    };

    const setFormPatientTreatment = (data) => {
        setPatientTreatment({
            id: data.id,
            start_date: data.start_date,
            end_date: data.end_date,
            machine: data.machine,
            mode: data.mode,
            success: data.success,
            treatment: data.treatment
        });
    }


    const updatePatientTreatmentButton = () => {
        let data = {
            id: patientTreatment.id,
            start_date: patientTreatment.start_date,
            end_date: patientTreatment.end_date,
            machine: patientTreatment.machine,
            mode: patientTreatment.mode,
            success: patientTreatment.success,
            treatment: patientTreatment.treatment
        }
        PatientTreatmentDataService.update(patient_id, data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrievePatientTreatments();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePatientTreatment = (patient_id, id) => {
        PatientTreatmentDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Modalidad de tratamiento eliminada exitosamente');
                retrievePatientTreatments();
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
                    detailValues={PatientTreatmentValues.detailValues}
                    instance={currentPatientTreatment}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <GenericList
                listValues={PatientTreatmentValues.listValues}
                instances={patientTreatments}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                formButton={patientTreatmentFormButton}
                setCurrentInstance={setCurrentPatientTreatment}
                setFormInstance={setFormPatientTreatment}
                showFormModal={() => setFormVisibility(true)}
                deleteInstance={deletePatientTreatment}
            />
            <div className="modal-container">
                <GenericForm
                    formValues={PatientTreatmentValues.formValues}
                    instance={patientTreatment}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setInstance={setPatientTreatment}
                    saveInstance={savePatientTreatment}
                    updateInstance={updatePatientTreatmentButton}
                />
            </div>
        </>
    );
};

export default PatientTreatment;
