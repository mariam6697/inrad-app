import React from "react";
import {Input, Button, Table, Grid, Row, Col} from "rsuite";

const {Column, HeaderCell, Cell} = Table;

const marginTop = {
    marginTop: 10
};

const title = {
    marginLeft: 5,
    marginBottom: 10
};

const UserList = ({
                      users,
                      searchName,
                      onChangeSearchName,
                      findByName,
                      showModal,
                      userFormButton,
                      setCurrentUser,
                      setFormUser,
                      showFormModal,
                      deleteUser
                  }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Usuarios</h4>
                    <Col xs={12}>
                        <Input
                            placeholder="Buscar por nombre"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                    </Col>
                    <Col xs={12}>
                        <Button onClick={findByName}>Buscar</Button>
                    </Col>
                    <Col xs={24}>
                        <Table height={400} data={users}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre de usuario</HeaderCell>
                                <Cell dataKey="username"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Email</HeaderCell>
                                <Cell dataKey="email"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Rol</HeaderCell>
                                <Cell dataKey="role"/>
                            </Column>
                            <Column width={220} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function detailAction() {
                                            setCurrentUser(rowData);
                                            showModal();
                                        }

                                        function editAction() {
                                            setFormUser(rowData);
                                            showFormModal();
                                        }

                                        function deleteAction() {
                                            deleteUser(rowData.id)
                                        }

                                        return (
                                            <>
                                                <Button onClick={detailAction}>Ver </Button>
                                                <Button onClick={editAction}>Editar </Button>
                                                <Button onClick={deleteAction}>Eliminar </Button>
                                            </>
                                        );
                                    }}
                                </Cell>
                            </Column>
                        </Table>
                    </Col>
                </Row>
            </Grid>
            <Button onClick={userFormButton}>Nuevo Usuario</Button>
        </div>
    );
};

export default UserList;
