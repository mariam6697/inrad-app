import React, {useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {Container, Content, Footer, Header, Sidebar} from "rsuite";
import Patient from "./Patient/PatientContainer"
import "rsuite/dist/styles/rsuite-default.css";
import "./App.css";
import NavbarInstance from "./Shared/nav/Header";
import SidenavInstance from "./Shared/nav/Sidebar";
import {UserContext} from "./UserContext";
import LoginContainer from "./Login/LoginContainer";
import Role from "./Role/RoleContainer";
import User from "./User/UserContainer";
import TreatmentCategory from "./TreatmentCategory/TreatmentCategoryContainer";
import Treatment from "./Treatment/TreatmentContainer";
import SymptomGroup from "./SymptomGroup/SymptomGroupContainer";
import Symptom from "./Symptom/SymptomContainer";
import PatientDetail from "./Patient/PatientDetailContainer";
import DiseaseType from "./DiseaseType/DiseaseTypeContainer";
import AppointmentPatient from "./Appointment/PatientContainer";
import TreatmentMachine from "./TreatmentMachine/TreatmentMachineContainer";
import TreatmentMode from "./TreatmentMode/TreatmentModeContainer";

const header = {
    maxHeight: 1
}

function App() {
    const storedJwt = localStorage.getItem('access');
    const [jwt, setJwt] = useState(storedJwt || null);
    const username = storedJwt ? JSON.parse(atob(localStorage.getItem("access").split('.')[1])).username : null
    const [user, setUser] = useState(username);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login/';
    };

    if (!jwt) {
        return (<LoginContainer setUser={setUser} setJwt={setJwt}/>);
    }

    return (
        <>
            <Container min-height='100vh'>
                <UserContext.Provider value={{user, setUser}}>
                    <Header styles={header}>
                        <NavbarInstance logout={logout}/>
                    </Header>
                    <Container styles>
                        <Sidebar style={{display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7fa'}} >
                            <SidenavInstance style={{ display: 'flex', flexDirection: 'column' }}/>
                        </Sidebar>
                        <Content>
                            <Switch>
                                <Route exact path={["/appointments"]} component={AppointmentPatient}/>
                                <Route exact path={["/patients"]} component={Patient}/>
                                <Route exact path={["/patients/:id"]} component={PatientDetail}/>
                                <Route exact path={["/disease_types"]} component={DiseaseType}/>
                                <Route exact path={["/roles"]} component={Role}/>
                                <Route exact path={["/users"]} component={User}/>
                                <Route exact path={["/treatments"]} component={Treatment}/>
                                <Route exact path={["/treatment_categories"]} component={TreatmentCategory}/>
                                <Route exact path={["/treatment_machines"]} component={TreatmentMachine}/>
                                <Route exact path={["/treatment_modes"]} component={TreatmentMode}/>
                                <Route exact path={["/symptom_groups"]} component={SymptomGroup}/>
                                <Route exact path={["/symptoms"]} component={Symptom}/>
                            </Switch>
                        </Content>
                    </Container>
                </UserContext.Provider>
            </Container>
        </>
    );
}

export default App;