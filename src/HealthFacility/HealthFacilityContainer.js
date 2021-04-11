import React, { useEffect, useState } from "react";
import HealthFacilityDataService from "../services/HealthFacilityService";
import { Alert } from "rsuite";
import GenericModalDetail from "../Shared/Components/ModalDetail";
import GenericList from "../Shared/Components/List";
import GenericForm from "../Shared/Components/Form";
import HealthFacilityValues from "./HealthFacilityValues";

const HealthFacility = () => {
  const initialHealthFacilityState = {
    id: null,
    name: "",
    address: "",
  };
  const [healthFacility, setHealthFacility] = useState([]);
  const [healthFacilities, setHealthFacilities] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentHealthFacility, setCurrentHealthFacility] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveHealthFacilities();
  }, []);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrieveHealthFacilities = () => {
    HealthFacilityDataService.getAll()
      .then((response) => {
        setHealthFacilities(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    HealthFacilityDataService.findByName(searchName)
      .then((response) => {
        setHealthFacilities(response.data);
      })
      .catch((e) => { });
  };

  const saveHealthFacility = () => {
    HealthFacilityDataService.create(healthFacility)
      .then((response) => {
        setFormHealthFacility(response.data);
        setFormVisibility(false);
        retrieveHealthFacilities();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newHealthFacility = () => {
    setHealthFacility(initialHealthFacilityState);
  };

  const healthFacilityFormButton = () => {
    newHealthFacility();
    setFormVisibility(true);
  };

  const setFormHealthFacility = (data) => {
    setHealthFacility({
      id: data.id,
      name: data.name,
      address: data.address,
    });
  };

  const updateHealthFacilityButton = () => {
    let data = {
      id: healthFacility.id,
      name: healthFacility.name,
      address: healthFacility.address,
    };
    HealthFacilityDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveHealthFacilities();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteHealthFacility = (id) => {
    HealthFacilityDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Centro de salud eliminado exitosamente");
        retrieveHealthFacilities();
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
          detailValues={HealthFacilityValues.detailValues}
          instance={currentHealthFacility}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={HealthFacilityValues.listValues}
        instances={healthFacilities}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={healthFacilityFormButton}
        setCurrentInstance={setCurrentHealthFacility}
        setFormInstance={setFormHealthFacility}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteHealthFacility}
        loading={loading}
      />
      <div className="modal-container">
        <GenericForm
          formValues={HealthFacilityValues.formValues}
          instance={healthFacility}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setHealthFacility}
          saveInstance={saveHealthFacility}
          updateInstance={updateHealthFacilityButton}
        />
      </div>
    </>
  );
};

export default HealthFacility;
