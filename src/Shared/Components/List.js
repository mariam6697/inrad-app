import React from "react";
import {
  Button,
  Col,
  Grid,
  Input,
  Loader,
  Placeholder,
  Row,
  Table,
} from "rsuite";

const { Column, HeaderCell, Cell } = Table;
const { Paragraph } = Placeholder;

const marginTop = {
  marginTop: 10,
};

const title = {
  marginLeft: 5,
  marginBottom: 10,
};

const GenericList = ({
  listValues,
  instances,
  searchName,
  onChangeSearchName,
  findByName,
  showModal,
  formButton,
  setCurrentInstance,
  setFormInstance,
  showFormModal,
  deleteInstance,
  loading,
}) => {
  return (
    <div style={marginTop}>
      <Grid fluid>
        <Row className="show-grid" style={marginTop}>
          <h4 style={title}>{listValues.title}</h4>
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
            {loading ? (
              <Paragraph rows={8}>
                <Loader backdrop content="loading..." vertical />
              </Paragraph>
            ) : (
              <Table height={400} data={instances}>
                {listValues.fields.map((field) =>
                  field.label === "Link" ? (
                    <Column width={200} fixed>
                      <HeaderCell>{field.label}</HeaderCell>
                      <Cell>
                        {(rowData) => {
                          return (
                            <a href={rowData.attachment}>
                              {rowData.attachment}
                            </a>
                          );
                        }}
                      </Cell>
                    </Column>
                  ) : (
                    <Column width={200} fixed>
                      <HeaderCell>{field.label}</HeaderCell>
                      <Cell dataKey={field.name} />
                    </Column>
                  )
                )}
                <Column width={220} fixed="right">
                  <HeaderCell>Acción</HeaderCell>
                  <Cell>
                    {(rowData) => {
                      function detailAction() {
                        setCurrentInstance(rowData);
                        showModal();
                      }

                      function editAction() {
                        setFormInstance(rowData);
                        showFormModal();
                      }

                      function deleteAction() {
                        deleteInstance(rowData.id);
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
            )}
          </Col>
        </Row>
      </Grid>
      <Button onClick={formButton}>{listValues.new_title} </Button>
    </div>
  );
};

export default GenericList;
