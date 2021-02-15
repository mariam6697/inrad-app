import React, {useState, useEffect} from "react";
import TreatmentCategoryDataService from "../services/TreatmentCategoryService";
import TreatmentCategoryForm from "./TreatmentCategoryForm";
import TreatmentCategoryList from "./TreatmentCategoryList";
import TreatmentCategoryDetail from "./TreatmentCategoryDetail";
import {Alert} from "rsuite";


const TreatmentCategory = () => {
    const initialTreatmentCategoryState = {
        id: null,
        name: "",
    };
    const [treatmentCategory, setTreatmentCategory] = useState([]);
    const [treatmentCategories, setTreatmentCategories] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentTreatmentCategory, setCurrentTreatmentCategory] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrieveTreatmentCategories();
    }, []);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrieveTreatmentCategories = () => {
        TreatmentCategoryDataService.getAll()
            .then(response => {
                setTreatmentCategories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        TreatmentCategoryDataService.findByName(searchName)
            .then((response) => {
                setTreatmentCategories(response.data);
            })
            .catch((e) => {
            });
    };

    const saveTreatmentCategory = () => {
        TreatmentCategoryDataService.create(treatmentCategory)
            .then(response => {
                setTreatmentCategory({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveTreatmentCategories();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTreatmentCategory = () => {
        setTreatmentCategory(initialTreatmentCategoryState);
    };

    const treatmentCategoryFormButton = () => {
        newTreatmentCategory();
        setFormVisibility(true);

    };

    const setFormTreatmentCategory = (data) => {
        setTreatmentCategory({
            id: data.id,
            name: data.name,
        });
    }


    const updateTreatmentCategoryButton = () => {
        let data = {
            id: treatmentCategory.id,
            name: treatmentCategory.name,
        }
        TreatmentCategoryDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveTreatmentCategories();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTreatmentCategory = (id) => {
        TreatmentCategoryDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Categoría de tratamiento eliminada exitosamente');
                retrieveTreatmentCategories();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar la categoría de tratamiento');
            });
    };

    return (
        <>
            <div className="modal-container">
                <TreatmentCategoryDetail
                    treatmentCategory={currentTreatmentCategory}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <TreatmentCategoryList
                treatmentCategories={treatmentCategories}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                treatmentCategoryFormButton={treatmentCategoryFormButton}
                setCurrentTreatmentCategory={setCurrentTreatmentCategory}
                setFormTreatmentCategory={setFormTreatmentCategory}
                showFormModal={() => setFormVisibility(true)}
                deleteTreatmentCategory={deleteTreatmentCategory}
            />
            <div className="modal-container">
                <TreatmentCategoryForm
                    treatmentCategory={treatmentCategory}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setTreatmentCategory={setTreatmentCategory}
                    saveTreatmentCategory={saveTreatmentCategory}
                    updateTreatmentCategoryButton={updateTreatmentCategoryButton}
                />
            </div>
        </>
    );
};

export default TreatmentCategory;
