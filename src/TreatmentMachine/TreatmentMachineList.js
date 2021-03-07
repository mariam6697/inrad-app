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

const TreatmentMachineList = ({
                      treatmentCategories,
                      searchName,
                      onChangeSearchName,
                      findByName,
                      showModal,
                      treatmentMachineFormButton,
                      setCurrentTreatmentMachine,
                      setFormTreatmentMachine,
                      showFormModal,
                      deleteTreatmentMachine
                  }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Máquinas de tratamiento</h4>
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
                        <Table height={400} data={treatmentCategories}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={220} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function detailAction() {
                                            setCurrentTreatmentMachine(rowData);
                                            showModal();
                                        }

                                        function editAction() {
                                            setFormTreatmentMachine(rowData);
                                            showFormModal();
                                        }

                                        function deleteAction() {
                                            deleteTreatmentMachine(rowData.id)
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
            <Button onClick={treatmentMachineFormButton}>Nueva máquina de tratamiento </Button>
        </div>
    );
};

export default TreatmentMachineList;
