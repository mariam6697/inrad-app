import React, { useEffect, useState } from "react";
import DiseaseTypeDataService from "../services/DiseaseTypeService";
import { Alert } from "rsuite";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import DiseaseTypeValues from "./DiseaseTypeValues";

const DiseaseType = () => {
  const initialDiseaseTypeState = {
    id: null,
    name: "",
    code: "",
    description: "",
  };
  const [diseaseType, setDiseaseType] = useState([]);
  const [diseaseTypes, setDiseaseTypes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentDiseaseType, setCurrentDiseaseType] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveDiseaseTypes();
  }, []);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrieveDiseaseTypes = () => {
    DiseaseTypeDataService.getAll()
      .then((response) => {
        setDiseaseTypes(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    DiseaseTypeDataService.findByName(searchName)
      .then((response) => {
        setDiseaseTypes(response.data);
      })
      .catch((e) => {});
  };

  const saveDiseaseType = () => {
    DiseaseTypeDataService.create(diseaseType)
      .then((response) => {
        setDiseaseType({
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
          description: response.data.code,
        });
        setFormVisibility(false);
        retrieveDiseaseTypes();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newDiseaseType = () => {
    setDiseaseType(initialDiseaseTypeState);
  };

  const diseaseTypeFormButton = () => {
    newDiseaseType();
    setFormVisibility(true);
  };

  const setFormDiseaseType = (data) => {
    setDiseaseType({
      id: data.id,
      name: data.name,
      code: data.code,
      description: data.description,
    });
  };

  const updateDiseaseTypeButton = () => {
    let data = {
      id: diseaseType.id,
      name: diseaseType.name,
      code: diseaseType.code,
      description: diseaseType.description,
    };
    DiseaseTypeDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveDiseaseTypes();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteDiseaseType = (id) => {
    DiseaseTypeDataService.remove(id)
      .then((response) => {
        Alert.success("Rol eliminado exitosamente");
        retrieveDiseaseTypes();
        console.log(response.data);
      })
      .catch((e) => {
        Alert.error("No se ha podido eliminar rol");
        console.log(e);
      });
  };

  return (
    <>
      <div className="modal-container">
        <GenericModalDetail
          detailValues={DiseaseTypeValues.detailValues}
          instance={currentDiseaseType}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={DiseaseTypeValues.listValues}
        instances={diseaseTypes}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={diseaseTypeFormButton}
        setCurrentInstance={setCurrentDiseaseType}
        setFormInstance={setFormDiseaseType}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteDiseaseType}
        loading={loading}
      />
      <div className="modal-container">
        <GenericForm
          formValues={DiseaseTypeValues.formValues}
          instance={diseaseType}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setDiseaseType}
          saveInstance={saveDiseaseType}
          updateInstance={updateDiseaseTypeButton}
        />
      </div>
    </>
  );
};

export default DiseaseType;
