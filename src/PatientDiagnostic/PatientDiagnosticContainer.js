import React, {useEffect, useState} from "react";
import PatientDiagnosticDataService from "../services/PatientDiagnosticService";
import {Alert} from "rsuite";
import GenericDetail from "../Shared/Components/Detail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import PatientDiagnosticValues from "./PatientDiagnosticValues";


const PatientDiagnostic = ({patient_id, diagnostics}) => {
    const initialPatientDiagnosticState = {
        id: null,
        diagnostic_date: "",
        description: "",
        disease_type: "",
        disease_stage: "",
        disease_aggressiveness: "",
    };
    const [patientDiagnostic, setPatientDiagnostic] = useState([]);
    const [patientDiagnostics, setPatientDiagnostics] = useState(diagnostics);
    const [searchName, setSearchName] = useState("");
    const [currentPatientDiagnostic, setCurrentPatientDiagnostic] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrievePatientDiagnostics = () => {
        PatientDiagnosticDataService.getAll(patient_id)
            .then(response => {
                setPatientDiagnostics(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        PatientDiagnosticDataService.findByName(patient_id, searchName)
            .then((response) => {
                setPatientDiagnostics(response.data);
            })
            .catch((e) => {
            });
    };

    const savePatientDiagnostic = () => {
        PatientDiagnosticDataService.create(patient_id, patientDiagnostic)
            .then(response => {
                setPatientDiagnostic({
                    id: response.data.id,
                    diagnostic_date: response.data.diagnostic_date,
                    description: response.data.description,
                    disease_type: response.data.disease_type,
                    disease_stage: response.data.disease_stage,
                    disease_aggressiveness: response.data.disease_aggressiveness,
                });
                setFormVisibility(false);
                retrievePatientDiagnostics();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPatientDiagnostic = () => {
        setPatientDiagnostic(initialPatientDiagnosticState);
    };

    const patientDiagnosticFormButton = () => {
        newPatientDiagnostic();
        setFormVisibility(true);

    };

    const setFormPatientDiagnostic = (data) => {
        setPatientDiagnostic({
            id: data.id,
            diagnostic_date: data.diagnostic_date,
            description: data.description,
            disease_type: data.disease_type,
            disease_stage: data.disease_stage,
            disease_aggressiveness: data.disease_aggressiveness,
        });
    }


    const updatePatientDiagnosticButton = () => {
        let data = {
            id: patientDiagnostic.id,
            diagnostic_date: patientDiagnostic.diagnostic_date,
            description: patientDiagnostic.description,
            disease_type: patientDiagnostic.disease_type,
            disease_stage: patientDiagnostic.disease_stage,
            disease_aggressiveness: patientDiagnostic.disease_aggressiveness,
        }
        PatientDiagnosticDataService.update(patient_id, data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrievePatientDiagnostics();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePatientDiagnostic = (patient_id, id) => {
        PatientDiagnosticDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Modalidad de tratamiento eliminada exitosamente');
                retrievePatientDiagnostics();
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
                    detailValues={PatientDiagnosticValues.detailValues}
                    instance={currentPatientDiagnostic}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <GenericList
                listValues={PatientDiagnosticValues.listValues}
                instances={patientDiagnostics}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                formButton={patientDiagnosticFormButton}
                setCurrentInstance={setCurrentPatientDiagnostic}
                setFormInstance={setFormPatientDiagnostic}
                showFormModal={() => setFormVisibility(true)}
                deleteInstance={deletePatientDiagnostic}
            />
            <div className="modal-container">
                <GenericForm
                    formValues={PatientDiagnosticValues.formValues}
                    instance={patientDiagnostic}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setInstance={setPatientDiagnostic}
                    saveInstance={savePatientDiagnostic}
                    updateInstance={updatePatientDiagnosticButton}
                />
            </div>
        </>
    );
};

export default PatientDiagnostic;
