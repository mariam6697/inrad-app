import React, { useEffect, useState } from "react";
import TreatmentCategoryDataService from "../services/TreatmentCategoryService";
import { Alert } from "rsuite";
import GenericForm from "../Shared/Components/Form";
import GenericList from "../Shared/Components/List";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import TreatmentCategoryValues from "./TreatmentCategoryValues";

const TreatmentCategory = () => {
  const initialTreatmentCategoryState = {
    id: null,
    name: "",
  };
  const [treatmentCategory, setTreatmentCategory] = useState([]);
  const [treatmentCategories, setTreatmentCategories] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentTreatmentCategory, setCurrentTreatmentCategory] = useState(
    null
  );
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
      .then((response) => {
        setTreatmentCategories(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    TreatmentCategoryDataService.findByName(searchName)
      .then((response) => {
        setTreatmentCategories(response.data);
      })
      .catch((e) => {});
  };

  const saveTreatmentCategory = () => {
    TreatmentCategoryDataService.create(treatmentCategory)
      .then((response) => {
        setTreatmentCategory({
          id: response.data.id,
          name: response.data.name,
        });
        setFormVisibility(false);
        retrieveTreatmentCategories();
        console.log(response.data);
      })
      .catch((e) => {
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
  };

  const updateTreatmentCategoryButton = () => {
    let data = {
      id: treatmentCategory.id,
      name: treatmentCategory.name,
    };
    TreatmentCategoryDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveTreatmentCategories();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTreatmentCategory = (id) => {
    TreatmentCategoryDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Categoría de tratamiento eliminada exitosamente");
        retrieveTreatmentCategories();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar la categoría de tratamiento");
      });
  };

  return (
    <>
      <div className="modal-container">
        <GenericModalDetail
          detailValues={TreatmentCategoryValues.detailValues}
          instance={currentTreatmentCategory}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={TreatmentCategoryValues.listValues}
        instances={treatmentCategories}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={treatmentCategoryFormButton}
        setCurrentInstance={setCurrentTreatmentCategory}
        setFormInstance={setFormTreatmentCategory}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteTreatmentCategory}
      />
      <div className="modal-container">
        <GenericForm
          formValues={TreatmentCategoryValues.formValues}
          instance={treatmentCategory}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setTreatmentCategory}
          saveInstance={saveTreatmentCategory}
          updateInstance={updateTreatmentCategoryButton}
        />
      </div>
    </>
  );
};

export default TreatmentCategory;
