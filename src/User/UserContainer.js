import React, {useState, useEffect} from "react";
import UserDataService from "../services/UserService";
import UserForm from "./UserForm";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import RoleDataService from "../services/RoleService";
import {Alert} from "rsuite";


const User = () => {
    const initialUserState = {
        id: null,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        role: {},
    };
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);

    useEffect(() => {
        retrieveUsers();
        retrieveRoles();
    }, []);

    const onChangeSearchName = (value, e) => {
        const searchName = value;
        setSearchName(searchName);
    };

    const retrieveUsers = () => {
        UserDataService.getAll()
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        UserDataService.findByName(searchName)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((e) => {
            });
    };

    const saveUser = () => {
        UserDataService.create(user)
            .then(response => {
                setUser({
                    id: response.data.id,
                    name: response.data.name,
                });
                setFormVisibility(false);
                retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
    };

    const userFormButton = () => {
        newUser();
        setFormVisibility(true);

    };

    const setFormUser = (data) => {
        setUser({
            id: data.id,
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
        });
    }


    const updateUserButton = () => {
        let data = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        }
        UserDataService.update(data.id, data)
            .then(response => {
                setFormVisibility(false);
                retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = (id) => {
        UserDataService.remove(id)
            .then(response => {
                console.log(response.data);
                Alert.success('Usuario eliminado exitosamente');
                retrieveUsers();
            })
            .catch(e => {
                console.log(e);
                Alert.error('No se ha podido eliminar usuario');
            });
    };

    const retrieveRoles = () => {
        RoleDataService.getAll()
            .then(response => {
                var roles = response.data;
                var roles_for_select = roles.map(function(x) {
                    return {"label": x.name, "value": x.id};
                });
                setRoles(roles_for_select);
                console.log(roles_for_select);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <div className="modal-container">
                <UserDetail
                    user={currentUser}
                    hideModal={() => setVisibility(false)}
                    visibility={visibility}
                />
            </div>
            <UserList
                users={users}
                searchName={searchName}
                onChangeSearchName={onChangeSearchName}
                findByName={findByName}
                showModal={() => setVisibility(true)}
                userFormButton={userFormButton}
                setCurrentUser={setCurrentUser}
                setFormUser={setFormUser}
                showFormModal={() => setFormVisibility(true)}
                deleteUser={deleteUser}
            />
            <div className="modal-container">
                <UserForm
                    user={user}
                    hideModal={() => setFormVisibility(false)}
                    showModal={() => setFormVisibility(true)}
                    visibility={formVisibility}
                    setUser={setUser}
                    saveUser={saveUser}
                    updateUserButton={updateUserButton}
                    roles={roles}
                />
            </div>
        </>
    );
};

export default User;
