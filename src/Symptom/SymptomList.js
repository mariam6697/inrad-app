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

const SymptomList = ({
                      symptoms,
                      searchName,
                      onChangeSearchName,
                      findByName,
                      showModal,
                      symptomFormButton,
                      setCurrentSymptom,
                      setFormSymptom,
                      showFormModal,
                      deleteSymptom
                  }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Tratamientos</h4>
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
                        <Table height={400} data={symptoms}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Grupo</HeaderCell>
                                <Cell dataKey="group"/>
                            </Column>
                            <Column width={220} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function detailAction() {
                                            setCurrentSymptom(rowData);
                                            showModal();
                                        }

                                        function editAction() {
                                            setFormSymptom(rowData);
                                            showFormModal();
                                        }

                                        function deleteAction() {
                                            deleteSymptom(rowData.id)
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
            <Button onClick={symptomFormButton}>Nuevo síntoma</Button>
        </div>
    );
};

export default SymptomList;
