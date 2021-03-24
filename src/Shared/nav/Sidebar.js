import React from "react";
import { Sidenav, Nav, Dropdown, Icon } from "rsuite";
import { Link } from "react-router-dom";

const styles = {
  width: 250,
  display: "inline-table",
  marginRight: 10,
};

const SidenavInstance = ({ ...props }) => {
  return (
    <div style={styles}>
      <Sidenav {...props} defaultOpenKeys={["3", "4"]}>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
              <Link to="/appointments">Visitas</Link>
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
              <Link to="/patients">Pacientes</Link>
            </Nav.Item>
            <Dropdown
              eventKey="3"
              title="Mantenedores"
              icon={<Icon icon="gear-circle" />}
            >
              <Dropdown.Menu
                eventKey="3-1"
                title="Enfermedades"
                icon={<Icon icon="gear-circle" />}
              >
                <Dropdown.Item eventKey="3-1-1">
                  <Link to="/disease_categories">Categorías</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-1-2">
                  <Link to="/disease_types">Tipos</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Menu
                eventKey="3-2"
                title="Tratamientos"
                icon={<Icon icon="gear-circle" />}
              >
                <Dropdown.Item eventKey="3-2-1">
                  <Link to="/treatment_categories">Categorías</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-2-2">
                  <Link to="/treatment_machines">Máquinas</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-2-3">
                  <Link to="/treatment_modes">Modalidades</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-2-4">
                  <Link to="/treatments">Tratamientos</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Menu
                eventKey="3-3"
                title="Síntomas"
                icon={<Icon icon="gear-circle" />}
              >
                <Dropdown.Item eventKey="3-3-1">
                  <Link to="/symptom_groups">Grupo</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-3-2">
                  <Link to="/symptoms">Síntomas</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              eventKey="4"
              title="Usuarios"
              icon={<Icon icon="group" />}
            >
              <Dropdown.Item eventKey="4-1" icon={<Icon icon="group" />}>
                <Link to="/users">Usuarios</Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="4-2" icon={<Icon icon="group" />}>
                <Link to="/roles">Roles</Link>
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SidenavInstance;
