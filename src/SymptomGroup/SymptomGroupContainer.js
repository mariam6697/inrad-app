import React, {useState, useEffect} from "react";
import SymptomGroupDataService from "../services/SymptomGroupService";
import SymptomGroupForm from "./SymptomGroupForm";
import SymptomGroupList from "./SymptomGroupList";
import SymptomGroupDetail from "./SymptomGroupDetail";
import {Alert} from "rsuite";


const SymptomGroup = () => {
    const initialSymptomGroupState = {
        id: null,
        name: "",
    };
    const [symptomGroup, setSymptomGroup] = useState([]);
    const [symptomGroups, setSymptomGroups] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentSymptomGroup, setCurrentSymptomGroup] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrieveSymptomGroups();
    }, []);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrieveSymptomGroups = () => {
        SymptomGroupDataService.getAll()
            .then(response => {
                setSymptomGroups(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        SymptomGroupDataService.findByName(searchName)
            .then((response) => {
                setSymptomGroups(response.data);
            })
            .catch((e) => {
            });
    };

    const saveSymptomGroup = () => {
        SymptomGroupDataService.create(symptomGroup)
            .then(response => {
                setSymptomGroup({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveSymptomGroups();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newSymptomGroup = () => {
        setSymptomGroup(initialSymptomGroupState);
    };

    const symptomGroupFormButton = () => {
        newSymptomGroup();
        setFormVisibility(true);

    };

    const setFormSymptomGroup = (data) => {
        setSymptomGroup({
            id: data.id,
            name: data.name,
        });
    }


    const updateSymptomGroupButton = () => {
        let data = {
            id: symptomGroup.id,
            name: symptomGroup.name,
        }
        SymptomGroupDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveSymptomGroups();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteSymptomGroup = (id) => {
        SymptomGroupDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Categoría de tratamiento eliminada exitosamente');
                retrieveSymptomGroups();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar la categoría de tratamiento');
            });
    };

    return (
        <>
            <div className="modal-container">
                <SymptomGroupDetail
                    symptomGroup={currentSymptomGroup}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <SymptomGroupList
                symptomGroups={symptomGroups}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                symptomGroupFormButton={symptomGroupFormButton}
                setCurrentSymptomGroup={setCurrentSymptomGroup}
                setFormSymptomGroup={setFormSymptomGroup}
                showFormModal={() => setFormVisibility(true)}
                deleteSymptomGroup={deleteSymptomGroup}
            />
            <div className="modal-container">
                <SymptomGroupForm
                    symptomGroup={symptomGroup}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setSymptomGroup={setSymptomGroup}
                    saveSymptomGroup={saveSymptomGroup}
                    updateSymptomGroupButton={updateSymptomGroupButton}
                />
            </div>
        </>
    );
};

export default SymptomGroup;
