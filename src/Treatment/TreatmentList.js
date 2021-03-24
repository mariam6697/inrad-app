import React from "react";
import { Input, Button, Table, Grid, Row, Col } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const marginTop = {
  marginTop: 10,
};

const title = {
  marginLeft: 5,
  marginBottom: 10,
};

const TreatmentList = ({
  treatments,
  searchName,
  onChangeSearchName,
  findByName,
  showModal,
  treatmentFormButton,
  setCurrentTreatment,
  setFormTreatment,
  showFormModal,
  deleteTreatment,
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
            <Table height={400} data={treatments}>
              <Column width={200} fixed>
                <HeaderCell>Nombre</HeaderCell>
                <Cell dataKey="name" />
              </Column>
              <Column width={200} fixed>
                <HeaderCell>Categoría</HeaderCell>
                <Cell dataKey="category" />
              </Column>
              <Column width={220} fixed="right">
                <HeaderCell>Acción</HeaderCell>
                <Cell>
                  {(rowData) => {
                    function detailAction() {
                      setCurrentTreatment(rowData);
                      showModal();
                    }

                    function editAction() {
                      setFormTreatment(rowData);
                      showFormModal();
                    }

                    function deleteAction() {
                      deleteTreatment(rowData.id);
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
      <Button onClick={treatmentFormButton}>Nuevo Tratamiento</Button>
    </div>
  );
};

export default TreatmentList;
