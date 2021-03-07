import React, {useState, useEffect} from "react";
import TreatmentMachineDataService from "../services/TreatmentMachineService";
import TreatmentMachineForm from "./TreatmentMachineForm";
import TreatmentMachineList from "./TreatmentMachineList";
import TreatmentMachineDetail from "./TreatmentMachineDetail";
import {Alert} from "rsuite";


const TreatmentMachine = () => {
    const initialTreatmentMachineState = {
        id: null,
        name: "",
    };
    const [treatmentMachine, setTreatmentMachine] = useState([]);
    const [treatmentMachines, setTreatmentMachines] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentTreatmentMachine, setCurrentTreatmentMachine] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrieveTreatmentMachines();
    }, []);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrieveTreatmentMachines = () => {
        TreatmentMachineDataService.getAll()
            .then(response => {
                setTreatmentMachines(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        TreatmentMachineDataService.findByName(searchName)
            .then((response) => {
                setTreatmentMachines(response.data);
            })
            .catch((e) => {
            });
    };

    const saveTreatmentMachine = () => {
        TreatmentMachineDataService.create(treatmentMachine)
            .then(response => {
                setTreatmentMachine({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveTreatmentMachines();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTreatmentMachine = () => {
        setTreatmentMachine(initialTreatmentMachineState);
    };

    const treatmentMachineFormButton = () => {
        newTreatmentMachine();
        setFormVisibility(true);

    };

    const setFormTreatmentMachine = (data) => {
        setTreatmentMachine({
            id: data.id,
            name: data.name,
        });
    }


    const updateTreatmentMachineButton = () => {
        let data = {
            id: treatmentMachine.id,
            name: treatmentMachine.name,
        }
        TreatmentMachineDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveTreatmentMachines();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTreatmentMachine = (id) => {
        TreatmentMachineDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Máquina de tratamiento eliminada exitosamente');
                retrieveTreatmentMachines();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar la máquina de tratamiento');
            });
    };

    return (
        <>
            <div className="modal-container">
                <TreatmentMachineDetail
                    treatmentMachine={currentTreatmentMachine}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <TreatmentMachineList
                treatmentMachines={treatmentMachines}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                treatmentMachineFormButton={treatmentMachineFormButton}
                setCurrentTreatmentMachine={setCurrentTreatmentMachine}
                setFormTreatmentMachine={setFormTreatmentMachine}
                showFormModal={() => setFormVisibility(true)}
                deleteTreatmentMachine={deleteTreatmentMachine}
            />
            <div className="modal-container">
                <TreatmentMachineForm
                    treatmentMachine={treatmentMachine}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setTreatmentMachine={setTreatmentMachine}
                    saveTreatmentMachine={saveTreatmentMachine}
                    updateTreatmentMachineButton={updateTreatmentMachineButton}
                />
            </div>
        </>
    );
};

export default TreatmentMachine;
