import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import {Container, Content, Footer, Header, Sidebar} from "rsuite";
import Patient from "./Patient/PatientContainer"
import "rsuite/dist/styles/rsuite-default.css";
import "./App.css";
import NavbarInstance from "./components/nav/Header";
import SidenavInstance from "./components/nav/Sidebar";
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

const header = {
    maxHeight: 1
}

function App() {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
    };

    if (!user) {
        return (<LoginContainer setUser={setUser}/>);
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