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

const DiseaseTypeList = ({
                      diseaseTypes,
                      searchName,
                      onChangeSearchName,
                      findByName,
                      showModal,
                      diseaseTypeFormButton,
                      setCurrentDiseaseType,
                      setFormDiseaseType,
                      showFormModal,
                      deleteDiseaseType
                  }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Tipos de Cáncer</h4>
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
                        <Table height={400} data={diseaseTypes}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Código</HeaderCell>
                                <Cell dataKey="code"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Description</HeaderCell>
                                <Cell dataKey="description"/>
                            </Column>
                            <Column width={220} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function detailAction() {
                                            setCurrentDiseaseType(rowData);
                                            showModal();
                                        }

                                        function editAction() {
                                            setFormDiseaseType(rowData);
                                            showFormModal();
                                        }

                                        function deleteAction() {
                                            deleteDiseaseType(rowData.id)
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
            <Button onClick={diseaseTypeFormButton}>Nuevo tipo de cáncer</Button>
        </div>
    );
};

export default DiseaseTypeList;
