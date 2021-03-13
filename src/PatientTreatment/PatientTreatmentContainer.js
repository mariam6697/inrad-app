import React, {useEffect, useState} from "react";
import PatientTreatmentDataService from "../services/PatientTreatmentService";
import {Alert, Button} from "rsuite";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import PatientTreatmentValues from "./PatientTreatmentValues";
import GenericDetail from "../Shared/Components/Detail";
import PatientDataService from "../services/PatientService";


const PatientTreatment = ({patient_id, currentTreatment}) => {
    const initialPatientTreatmentState = {
        id: null,
        start_date: "",
        end_date: "",
        machine: null,
        mode: null,
        success: null,
        treatment: null
    };
    const [patientTreatment, setPatientTreatment] = useState(initialPatientTreatmentState);
    const [currentPatientTreatment, setCurrentPatientTreatment] = useState(currentTreatment);
    const [formVisibility, setFormVisibility] = useState(false);

    const retrievePatientTreatment = () => {
        PatientDataService.get(patient_id)
            .then(response => {
                setCurrentPatientTreatment(response.data.current_treatment);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
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
                retrievePatientTreatment();
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

    const patientTreatmentEditFormButton = () => {
        setPatientTreatment(currentPatientTreatment);
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
                retrievePatientTreatment();
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
                retrievePatientTreatment();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar la modalidad de tratamiento');
            });
    };

    return (
        <>
            <h3>Tratamiento</h3>
            {currentPatientTreatment ? (<div>
                <div>
                    <label>
                        <strong>Fecha de comienzo:</strong>
                    </label>{" "}
                    {currentPatientTreatment.start_date}
                </div>
                <div>
                    <label>
                        <strong>Fecha de término:</strong>
                    </label>{" "}
                    {currentPatientTreatment.end_date}
                </div>
                <div>
                    <label>
                        <strong>Tratamiento:</strong>
                    </label>{" "}
                    {currentPatientTreatment.treatment}
                </div>
                <div>
                    <label>
                        <strong>Máquina:</strong>
                    </label>{" "}
                    {currentPatientTreatment.machine}
                </div>
                <div>
                    <label>
                        <strong>Modalidad:</strong>
                    </label>{" "}
                    {currentPatientTreatment.mode}
                </div>
            </div>) : (<div>
                <label>
                    <strong>No posee tratamiento</strong>
                </label>
            </div>)}
            <Button onClick={patientTreatmentFormButton}>{PatientTreatmentValues.listValues.new_title} </Button>
            <Button onClick={patientTreatmentEditFormButton}> Editar </Button>
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
