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

const DiseaseList = ({
                         diseases,
                         searchName,
                         onChangeSearchName,
                         findByName
                     }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Enfermedades</h4>
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
                        <Table height={400} data={diseases}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Tipo</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Etapa</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={120} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function handleAction() {
                                            alert(`id:${rowData.id}`);
                                        }

                                        return (
                                            <span>
                                    <Button> Ver</Button>
                                    <a onClick={handleAction}> Editar </a> |{" "}
                                                <a onClick={handleAction}> Eliminar </a>
                                    </span>
                                        );
                                    }}
                                </Cell>
                            </Column>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default DiseaseList;
