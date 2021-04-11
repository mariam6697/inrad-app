import React, { useEffect, useState } from "react";
import MedicalForecastDataService from "../services/MedicalForecastService";
import { Alert } from "rsuite";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import MedicalForecastValues from "./MedicalForecastValues";

const MedicalForecast = () => {
  const initialMedicalForecastState = {
    id: null,
    name: "",
  };
  const [MedicalForecast, setMedicalForecast] = useState([]);
  const [MedicalForecasts, setMedicalForecasts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentMedicalForecast, setCurrentMedicalForecast] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveMedicalForecasts();
  }, []);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrieveMedicalForecasts = () => {
    MedicalForecastDataService.getAll()
      .then((response) => {
        setMedicalForecasts(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    MedicalForecastDataService.findByName(searchName)
      .then((response) => {
        setMedicalForecasts(response.data);
      })
      .catch((e) => {});
  };

  const saveMedicalForecast = () => {
    MedicalForecastDataService.create(MedicalForecast)
      .then((response) => {
        setFormMedicalForecast(response.data);
        setFormVisibility(false);
        retrieveMedicalForecasts();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newMedicalForecast = () => {
    setMedicalForecast(initialMedicalForecastState);
  };

  const medicalForecastFormButton = () => {
    newMedicalForecast();
    setFormVisibility(true);
  };

  const setFormMedicalForecast = (data) => {
    setMedicalForecast({
      id: data.id,
      name: data.name,
    });
  };

  const updateMedicalForecastButton = () => {
    let data = {
      id: MedicalForecast.id,
      name: MedicalForecast.name,
    };
    MedicalForecastDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveMedicalForecasts();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteMedicalForecast = (id) => {
    MedicalForecastDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Centro de salud eliminado exitosamente");
        retrieveMedicalForecasts();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar el centro de salud");
      });
  };

  return (
    <>
      <div className="modal-container">
        <GenericModalDetail
          detailValues={MedicalForecastValues.detailValues}
          instance={currentMedicalForecast}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={MedicalForecastValues.listValues}
        instances={MedicalForecasts}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={medicalForecastFormButton}
        setCurrentInstance={setCurrentMedicalForecast}
        setFormInstance={setFormMedicalForecast}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteMedicalForecast}
        loading={loading}
      />
      <div className="modal-container">
        <GenericForm
          formValues={MedicalForecastValues.formValues}
          instance={MedicalForecast}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setMedicalForecast}
          saveInstance={saveMedicalForecast}
          updateInstance={updateMedicalForecastButton}
        />
      </div>
    </>
  );
};

export default MedicalForecast;
