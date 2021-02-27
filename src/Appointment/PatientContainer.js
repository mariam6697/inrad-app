import React, {useEffect, useState} from "react";
import PatientDataService from "../services/PatientService";
import PatientList from "./PatientList";


const AppointmentPatient = () => {
    const [patients, setPatients] = useState([]);
    const [searchName, setSearchName] = useState("");

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

    return (
        <>
            <PatientList
                patients={patients}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
            />
        </>
    );
};

export default AppointmentPatient;
