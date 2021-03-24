import React, { useState, useEffect } from "react";
import SymptomDataService from "../services/SymptomService";
import SymptomForm from "./SymptomForm";
import SymptomList from "./SymptomList";
import SymptomDetail from "./SymptomDetail";
import { Alert } from "rsuite";
import SymptomGroupDataService from "../services/SymptomGroupService";

const Symptom = () => {
  const initialSymptomState = {
    id: null,
    name: "",
    group: "",
  };
  const [symptomGroups, setSymptomGroups] = useState([]);
  const [symptom, setSymptom] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentSymptom, setCurrentSymptom] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  useEffect(() => {
    retrieveSymptoms();
    retrieveSymptomGroups();
  }, []);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrieveSymptoms = () => {
    SymptomDataService.getAll()
      .then((response) => {
        setSymptoms(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    SymptomDataService.findByName(searchName)
      .then((response) => {
        setSymptoms(response.data);
      })
      .catch((e) => {});
  };

  const saveSymptom = () => {
    SymptomDataService.create(symptom)
      .then((response) => {
        setSymptom({
          id: response.data.id,
          name: response.data.name,
          group: response.data.group,
        });
        setFormVisibility(false);
        retrieveSymptoms();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newSymptom = () => {
    setSymptom(initialSymptomState);
  };

  const symptomFormButton = () => {
    newSymptom();
    setFormVisibility(true);
  };

  const setFormSymptom = (data) => {
    setSymptom({
      id: data.id,
      name: data.name,
      group: data.group,
    });
  };

  const updateSymptomButton = () => {
    let data = {
      id: symptom.id,
      name: symptom.name,
      group: symptom.group,
    };
    SymptomDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveSymptoms();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSymptom = (id) => {
    SymptomDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Usuario eliminado exitosamente");
        retrieveSymptoms();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar usuario");
      });
  };

  const retrieveSymptomGroups = () => {
    SymptomGroupDataService.getAll()
      .then((response) => {
        var symptomGroups = response.data;
        var symptomGroups_for_select = symptomGroups.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setSymptomGroups(symptomGroups_for_select);
        console.log(symptomGroups_for_select);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="modal-container">
        <SymptomDetail
          symptom={currentSymptom}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <SymptomList
        symptoms={symptoms}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        symptomFormButton={symptomFormButton}
        setCurrentSymptom={setCurrentSymptom}
        setFormSymptom={setFormSymptom}
        showFormModal={() => setFormVisibility(true)}
        deleteSymptom={deleteSymptom}
      />
      <div className="modal-container">
        <SymptomForm
          symptom={symptom}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setSymptom={setSymptom}
          saveSymptom={saveSymptom}
          updateSymptomButton={updateSymptomButton}
          symptomGroups={symptomGroups}
        />
      </div>
    </>
  );
};

export default Symptom;
