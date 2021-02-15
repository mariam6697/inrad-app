import React, {useState, useEffect} from "react";
import RoleDataService from "../services/RoleService";
import RoleForm from "./RoleForm";
import RoleList from "./RoleList";
import RoleDetail from "./RoleDetail";
import {Alert} from "rsuite";


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
            .then(response => {
                setRoles(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        RoleDataService.findByName(searchName)
            .then((response) => {
                setRoles(response.data);
            })
            .catch((e) => {
            });
    };

    const saveRole = () => {
        RoleDataService.create(role)
            .then(response => {
                setRole({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveRoles();
                console.log(response.data);
            })
            .catch(e => {
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
    }


    const updateRoleButton = () => {
        let data = {
            id: role.id,
            name: role.name,
        }
        RoleDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveRoles();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteRole = (id) => {
        RoleDataService.remove(id)
            .then(response => {
                Alert.success('Rol eliminado exitosamente');
                retrieveRoles();
                console.log(response.data);
            })
            .catch(e => {
                Alert.error('No se ha podido eliminar rol');
                console.log(e);
            });
    };

    return (
        <>
            <div className="modal-container">
                <RoleDetail
                    role={currentRole}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <RoleList
                roles={roles}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                roleFormButton={roleFormButton}
                setCurrentRole={setCurrentRole}
                setFormRole={setFormRole}
                showFormModal={() => setFormVisibility(true)}
                deleteRole={deleteRole}
            />
            <div className="modal-container">
                <RoleForm
                    role={role}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setRole={setRole}
                    saveRole={saveRole}
                    updateRoleButton={updateRoleButton}
                />
            </div>
        </>
    );
};

export default Role;
