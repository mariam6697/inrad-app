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

const TreatmentModeList = ({
                      treatmentModes,
                      searchName,
                      onChangeSearchName,
                      findByName,
                      showModal,
                      treatmentModeFormButton,
                      setCurrentTreatmentMode,
                      setFormTreatmentMode,
                      showFormModal,
                      deleteTreatmentMode
                  }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Modalidad de tratamiento</h4>
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
                        <Table height={400} data={treatmentModes}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={220} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function detailAction() {
                                            setCurrentTreatmentMode(rowData);
                                            showModal();
                                        }

                                        function editAction() {
                                            setFormTreatmentMode(rowData);
                                            showFormModal();
                                        }

                                        function deleteAction() {
                                            deleteTreatmentMode(rowData.id)
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
            <Button onClick={treatmentModeFormButton}>Nueva modalidad de tratamiento </Button>
        </div>
    );
};

export default TreatmentModeList;
