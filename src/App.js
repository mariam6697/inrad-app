import React from "react";
import {Route, Switch} from "react-router-dom";
import {Container, Content, Footer, Header, Sidebar} from "rsuite";
import Disease from "./containers/Disease"
import Patient from "./containers/Patient"
import DiseaseStage from "./containers/DiseaseStage"
import DiseaseType from "./containers/DiseaseType"
import "rsuite/dist/styles/rsuite-default.css";
import "./App.css";
import NavbarInstance from "./components/nav/Header";
import SidenavInstance from "./components/nav/Sidebar";

function App() {
    return (
        <>
            <Container>
                <Header>
                    <NavbarInstance/>
                </Header>
                <Container>
                    <Sidebar>
                        <SidenavInstance/>
                    </Sidebar>
                    <Content>
                        <Switch>
                            <Route exact path={["/", "/patients"]} component={Patient}/>
                            <Route exact path={["/", "/diseases"]} component={Disease}/>
                            <Route exact path={["/", "/disease_stages"]} component={DiseaseStage}/>
                            <Route exact path={["/", "/disease_types"]} component={DiseaseType}/>
                        </Switch>
                    </Content>
                </Container>
                <Footer>Footer</Footer>
            </Container>
        </>
    );
}

export default App;