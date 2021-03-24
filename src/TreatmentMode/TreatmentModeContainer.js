import React, { useEffect, useState } from "react";
import TreatmentModeDataService from "../services/TreatmentModeService";
import { Alert } from "rsuite";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import TreatmentModeValues from "./TreatmentModeValues";

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
      .then((response) => {
        setTreatmentModes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    TreatmentModeDataService.findByName(searchName)
      .then((response) => {
        setTreatmentModes(response.data);
      })
      .catch((e) => {});
  };

  const saveTreatmentMode = () => {
    TreatmentModeDataService.create(treatmentMode)
      .then((response) => {
        setTreatmentMode({
          id: response.data.id,
          name: response.data.name,
        });
        setFormVisibility(false);
        retrieveTreatmentModes();
        console.log(response.data);
      })
      .catch((e) => {
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
  };

  const updateTreatmentModeButton = () => {
    let data = {
      id: treatmentMode.id,
      name: treatmentMode.name,
    };
    TreatmentModeDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveTreatmentModes();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTreatmentMode = (id) => {
    TreatmentModeDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Modalidad de tratamiento eliminada exitosamente");
        retrieveTreatmentModes();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar la modalidad de tratamiento");
      });
  };

  return (
    <>
      <div className="modal-container">
        <GenericModalDetail
          detailValues={TreatmentModeValues.detailValues}
          instance={currentTreatmentMode}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={TreatmentModeValues.listValues}
        instances={treatmentModes}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={treatmentModeFormButton}
        setCurrentInstance={setCurrentTreatmentMode}
        setFormInstance={setFormTreatmentMode}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteTreatmentMode}
      />
      <div className="modal-container">
        <GenericForm
          formValues={TreatmentModeValues.formValues}
          instance={treatmentMode}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setTreatmentMode}
          saveInstance={saveTreatmentMode}
          updateInstance={updateTreatmentModeButton}
        />
      </div>
    </>
  );
};

export default TreatmentMode;
