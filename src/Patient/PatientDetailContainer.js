import React, {useState, useEffect} from "react";
import PatientDataService from "../services/PatientService";
import {useParams} from "react-router";
import PatientDetailShow from "./Patient";


const PatientDetail = () => {
    const {id} = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        retrievePatient();
    }, []);

    const setPatientDetail = (data) => {
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

    const retrievePatient = () => {
        PatientDataService.get(id)
            .then(response => {
                setPatientDetail(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    return (
        <>
            { patient && (<PatientDetailShow
                patient={patient}
            />)}
        </>
    );
};

export default PatientDetail;