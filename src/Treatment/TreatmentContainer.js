import React, {useState, useEffect} from "react";
import TreatmentDataService from "../services/TreatmentService";
import TreatmentForm from "./TreatmentForm";
import TreatmentList from "./TreatmentList";
import TreatmentDetail from "./TreatmentDetail";
import {Alert} from "rsuite";
import TreatmentCategoryDataService from "../services/TreatmentCategoryService";


const Treatment = () => {
    const initialTreatmentState = {
        id: null,
        name: "",
        category: "",
    };
    const [treatmentCategories, setTreatmentCategories] = useState([]);
    const [treatment, setTreatment] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentTreatment, setCurrentTreatment] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrieveTreatments();
        retrieveTreatmentCategories();
    }, []);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrieveTreatments = () => {
        TreatmentDataService.getAll()
            .then(response => {
                setTreatments(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        TreatmentDataService.findByName(searchName)
            .then((response) => {
                setTreatments(response.data);
            })
            .catch((e) => {
            });
    };

    const saveTreatment = () => {
        TreatmentDataService.create(treatment)
            .then(response => {
                setTreatment({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveTreatments();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTreatment = () => {
        setTreatment(initialTreatmentState);
    };

    const treatmentFormButton = () => {
        newTreatment();
        setFormVisibility(true);

    };

    const setFormTreatment = (data) => {
        setTreatment({
            id: data.id,
            name: data.name,
            category: data.category,
        });
    }


    const updateTreatmentButton = () => {
        let data = {
            id: treatment.id,
            name: treatment.name,
            category: treatment.category,
        }
        TreatmentDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveTreatments();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTreatment = (id) => {
        TreatmentDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Usuario eliminado exitosamente');
                retrieveTreatments();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar usuario');
            });
    };

    const retrieveTreatmentCategories = () => {
        TreatmentCategoryDataService.getAll()
            .then(response => {
                var treatmentCategories = response.data;
                var treatmentCategories_for_select = treatmentCategories.map(function(x) {
                    return {"label": x.name, "value": x.id};
                });
                setTreatmentCategories(treatmentCategories_for_select);
                console.log(treatmentCategories_for_select);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <div className="modal-container">
                <TreatmentDetail
                    treatment={currentTreatment}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <TreatmentList
                treatments={treatments}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                treatmentFormButton={treatmentFormButton}
                setCurrentTreatment={setCurrentTreatment}
                setFormTreatment={setFormTreatment}
                showFormModal={() => setFormVisibility(true)}
                deleteTreatment={deleteTreatment}
            />
            <div className="modal-container">
                <TreatmentForm
                    treatment={treatment}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setTreatment={setTreatment}
                    saveTreatment={saveTreatment}
                    updateTreatmentButton={updateTreatmentButton}
                    treatmentCategories={treatmentCategories}
                />
            </div>
        </>
    );
};

export default Treatment;
