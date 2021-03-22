import React, {useCallback} from "react";
import {Input, Button, Table, Grid, Row, Col} from "rsuite";
import {useHistory} from "react-router";

const {Column, HeaderCell, Cell} = Table;

const marginTop = {
    marginTop: 10
};

const title = {
    marginLeft: 5,
    marginBottom: 10
};

const PatientList = ({
                         patients,
                         searchName,
                         onChangeSearchName,
                         findByName,
                     }) => {

    const handleOnClickDetail = (id) => {
        window.location.href = `/patients/${id}/appointments`
    }
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                    <h4 style={title}>Pacientes</h4>
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
                        <Table height={400} data={patients}>
                            <Column width={200} fixed>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="name"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Apellido</HeaderCell>
                                <Cell dataKey="last_name"/>
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>RUT</HeaderCell>
                                <Cell dataKey="identifier"/>
                            </Column>
                            <Column width={220} fixed="right">
                                <HeaderCell>Acción</HeaderCell>
                                <Cell>
                                    {(rowData) => {
                                        function detailAction() {
                                            handleOnClickDetail(rowData.id);
                                        }
                                        return (
                                            <>
                                                <Button onClick={detailAction}>Ver </Button>
                                            </>
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

export default PatientList;
