import React from "react";
import { Nav, Icon, Navbar } from "rsuite";

const NavbarInstance = () => {
    return (
        <Navbar appearance="inverse">
            <Navbar.Header>
                <a href="/" className="navbar-brand logo">
                    INRAD
                </a>
            </Navbar.Header>
            <Navbar.Body>
                <Nav pullRight>
                    <Nav.Item icon={<Icon icon="cog" />}>Configuración</Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

export default NavbarInstance;
