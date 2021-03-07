import React, {useState, useEffect} from "react";
import TreatmentModeDataService from "../services/TreatmentModeService";
import TreatmentModeForm from "./TreatmentModeForm";
import TreatmentModeList from "./TreatmentModeList";
import TreatmentModeDetail from "./TreatmentModeDetail";
import {Alert} from "rsuite";


const TreatmentMode = () => {
    const initialTreatmentModeState = {
        id: null,
        name: "",
    };
    const [treatmentMode, setTreatmentMode] = useState([]);
    const [treatmentModes, setTreatmentModes] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentTreatmentMode, setCurrentTreatmentMode] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrieveTreatmentModes();
    }, []);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrieveTreatmentModes = () => {
        TreatmentModeDataService.getAll()
            .then(response => {
                setTreatmentModes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        TreatmentModeDataService.findByName(searchName)
            .then((response) => {
                setTreatmentModes(response.data);
            })
            .catch((e) => {
            });
    };

    const saveTreatmentMode = () => {
        TreatmentModeDataService.create(treatmentMode)
            .then(response => {
                setTreatmentMode({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveTreatmentModes();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTreatmentMode = () => {
        setTreatmentMode(initialTreatmentModeState);
    };

    const treatmentModeFormButton = () => {
        newTreatmentMode();
        setFormVisibility(true);

    };

    const setFormTreatmentMode = (data) => {
        setTreatmentMode({
            id: data.id,
            name: data.name,
        });
    }


    const updateTreatmentModeButton = () => {
        let data = {
            id: treatmentMode.id,
            name: treatmentMode.name,
        }
        TreatmentModeDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveTreatmentModes();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTreatmentMode = (id) => {
        TreatmentModeDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Modalidad de tratamiento eliminada exitosamente');
                retrieveTreatmentModes();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar la modalidad de tratamiento');
            });
    };

    return (
        <>
            <div className="modal-container">
                <TreatmentModeDetail
                    treatmentMode={currentTreatmentMode}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <TreatmentModeList
                treatmentModes={treatmentModes}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                treatmentModeFormButton={treatmentModeFormButton}
                setCurrentTreatmentMode={setCurrentTreatmentMode}
                setFormTreatmentMode={setFormTreatmentMode}
                showFormModal={() => setFormVisibility(true)}
                deleteTreatmentMode={deleteTreatmentMode}
            />
            <div className="modal-container">
                <TreatmentModeForm
                    treatmentMode={treatmentMode}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setTreatmentMode={setTreatmentMode}
                    saveTreatmentMode={saveTreatmentMode}
                    updateTreatmentModeButton={updateTreatmentModeButton}
                />
            </div>
        </>
    );
};

export default TreatmentMode;
