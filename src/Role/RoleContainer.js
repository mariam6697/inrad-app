import React, { useState, useEffect } from "react";
import RoleDataService from "../services/RoleService";
import RoleValues from "./RoleValues";
import { Alert } from "rsuite";
import GenericForm from "../Shared/Components/Form";
import GenericList from "../Shared/Components/List";
import GenericModalDetail from "../Shared/Components/ModalDetail";

const Role = () => {
  const initialRoleState = {
    id: null,
    name: "",
  };
  const [role, setRole] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentRole, setCurrentRole] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  useEffect(() => {
    retrieveRoles();
  }, []);

  const onChangeSearchName = (value, e) => {
    const searchName = value;
    setSearchName(searchName);
  };

  const retrieveRoles = () => {
    RoleDataService.getAll()
      .then((response) => {
        setRoles(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    RoleDataService.findByName(searchName)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((e) => {});
  };

  const saveRole = () => {
    RoleDataService.create(role)
      .then((response) => {
        setRole({
          id: response.data.id,
          name: response.data.name,
        });
        setFormVisibility(false);
        retrieveRoles();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newRole = () => {
    setRole(initialRoleState);
  };

  const roleFormButton = () => {
    newRole();
    setFormVisibility(true);
  };

  const setFormRole = (data) => {
    setRole({
      id: data.id,
      name: data.name,
    });
  };

  const updateRoleButton = () => {
    let data = {
      id: role.id,
      name: role.name,
    };
    RoleDataService.update(data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrieveRoles();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteRole = (id) => {
    RoleDataService.remove(id)
      .then((response) => {
        Alert.success("Rol eliminado exitosamente");
        retrieveRoles();
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
          detailValues={RoleValues.detailValues}
          instance={currentRole}
          hideModal={() => setVisibility(false)}
          visibility={visibility}
        />
      </div>
      <GenericList
        listValues={RoleValues.listValues}
        instances={roles}
        searchName={searchName}
        onChangeSearchName={onChangeSearchName}
        findByName={findByName}
        showModal={() => setVisibility(true)}
        formButton={roleFormButton}
        setCurrentInstance={setCurrentRole}
        setFormInstance={setFormRole}
        showFormModal={() => setFormVisibility(true)}
        deleteInstance={deleteRole}
      />
      <div className="modal-container">
        <GenericForm
          formValues={RoleValues.formValues}
          instance={role}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setInstance={setRole}
          saveInstance={saveRole}
          updateInstance={updateRoleButton}
        />
      </div>
    </>
  );
};

export default Role;
