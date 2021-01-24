import React, {useState, useEffect} from "react";
import PatientDataService from "../services/PatientService";
import PatientList from "../components/patients/PatientList";
import PatientDetail from "../components/patients/PatientDetail";
import PatientForm from "../components/patients/PatientForm";


const Patient = () => {
    const initialPatientState = {
        id: null,
        name: "",
        last_name: "",
        identifier: "",
        phone_number: "",
        gender: "",
        age: null,
        blood_type: "",
        attachments: []

    };
    const [patient, setPatient] = useState([]);
    const [patients, setPatients] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentPatient, setCurrentPatient] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrievePatients();
    }, []);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrievePatients = () => {
        PatientDataService.getAll()
            .then(response => {
                setPatients(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        PatientDataService.findByName(searchName)
            .then((response) => {
                setPatients(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const savePatient = () => {
        PatientDataService.create(patient)
            .then(response => {
                setPatient({
                    id: response.data.id,
                    name: response.data.name,
                    last_name: response.data.last_name,
                    identifier: response.data.identifier,
                    phone_number: response.data.phone_number,
                    gender: response.data.gender,
                    age: response.data.age,
                    blood_type: response.data.blood_type,
                    attachments: response.data.attachments
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPatient = () => {
        setPatient(initialPatientState);
    };

    const patientFormButton = () => {
        newPatient();
        setFormVisibility(true);

    };

    const setFormPatient = (data) => {
        setPatient({
            id: data.id,
            name: data.name,
            last_name: data.last_name,
            identifier: data.identifier,
            phone_number: data.phone_number,
            gender: data.gender,
            age: data.age,
            blood_type: data.blood_type,
            attachments: data.attachments
        });
    }


    const updatePatientButton = () => {
        let data = {
            id: patient.id,
            name: patient.name,
            last_name: patient.last_name,
            identifier: patient.identifier,
            phone_number: patient.phone_number,
            gender: patient.gender,
            age: patient.age,
            blood_type: patient.blood_type
        }
        PatientDataService.update(data.id, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePatient = (id) => {
        PatientDataService.remove(id)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <div className="modal-container">
                <PatientDetail
                    patient={currentPatient}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <PatientList
                patients={patients}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                patientFormButton={patientFormButton}
                setCurrentPatient={setCurrentPatient}
                setFormPatient={setFormPatient}
                showFormModal={() => setFormVisibility(true)}
                deletePatient={deletePatient}
            />
            <div className="modal-container">
                <PatientForm
                    patient={patient}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setPatient={setPatient}
                    savePatient={savePatient}
                    updatePatientButton={updatePatientButton}
                />
            </div>
        </>
    );
};

export default Patient;
