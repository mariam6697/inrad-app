import React, { useContext } from "react";
import { Nav, Icon, Navbar, Dropdown } from "rsuite";
import { UserContext } from "../../UserContext";

const NavbarInstance = ({ logout }) => {
  const username = useContext(UserContext);

  return (
    <Navbar appearance="inverse">
      <Navbar.Header>
        <a href="/" className="navbar-brand logo">
          INRAD
        </a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight>
          <Dropdown title={username.user}>
            <Dropdown.Item eventKey="1" onClick={logout}>
              Salir
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavbarInstance;
