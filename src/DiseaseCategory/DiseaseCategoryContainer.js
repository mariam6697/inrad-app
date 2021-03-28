import React, { useEffect, useState } from "react";
import DiseaseCategoryDataService from "../services/DiseaseCategoryService";
import { Alert } from "rsuite";
import GenericForm from "../Shared/Components/Form";
import GenericList from "../Shared/Components/List";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import DiseaseCategoryValues from "./DiseaseCategoryValues";

const DiseaseCategory = () => {
  const initialDiseaseCategoryState = {
    id: null,
    name: "",
    code: "",
  };
  const [diseaseCategory, setDiseaseCategory] = useState([]);
  const [diseaseCategories, setDiseaseCategories] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentDiseaseCategory, setCurrentDiseaseCategory] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveDiseaseCategories();
  }, []);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrieveDiseaseCategories = () => {
    DiseaseCategoryDataService.getAll()
      .then((response) => {
        setDiseaseCategories(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    DiseaseCategoryDataService.findByName(searchName)
      .then((response) => {
        setDiseaseCategories(response.data);
      })
      .catch((e) => {});
  };

  const saveDiseaseCategory = () => {
    DiseaseCategoryDataService.create(diseaseCategory)
      .then((response) => {
        setDiseaseCategory({
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
        });
        setFormVisibility(false);
        retrieveDiseaseCategories();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newDiseaseCategory = () => {
    setDiseaseCategory(initialDiseaseCategoryState);
  };

  const diseaseCategoryFormButton = () => {
    newDiseaseCategory();
    setFormVisibility(true);
  };

  const setFormDiseaseCategory = (data) => {
    setDiseaseCategory({
      id: data.id,
      name: data.name,
      code: data.code,
    });
  };

  const updateDiseaseCategoryButton = () => {
    let data = {
      id: diseaseCategory.id,
      name: diseaseCategory.name,
      data: diseaseCategory.code,
    };
    DiseaseCategoryDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveDiseaseCategories();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteDiseaseCategory = (id) => {
    DiseaseCategoryDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Categoría de tratamiento eliminada exitosamente");
        retrieveDiseaseCategories();
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
          detailValues={DiseaseCategoryValues.detailValues}
          instance={currentDiseaseCategory}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={DiseaseCategoryValues.listValues}
        instances={diseaseCategories}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={diseaseCategoryFormButton}
        setCurrentInstance={setCurrentDiseaseCategory}
        setFormInstance={setFormDiseaseCategory}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteDiseaseCategory}
        loading={loading}
      />
      <div className="modal-container">
        <GenericForm
          formValues={DiseaseCategoryValues.formValues}
          instance={diseaseCategory}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setDiseaseCategory}
          saveInstance={saveDiseaseCategory}
          updateInstance={updateDiseaseCategoryButton}
        />
      </div>
    </>
  );
};

export default DiseaseCategory;
