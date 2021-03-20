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

const AppointmentList = ({
                         appointments,
                         appointmentFormButton,
                         setCurrentAppointment,
                         setFormAppointment,
                         showFormModal,
                         deleteAppointment
                     }) => {
    return (
        <div style={marginTop}>
            <Grid fluid>
                <Row className="show-grid" style={marginTop}>
                </Row>
            </Grid>
            <Button onClick={appointmentFormButton}>Nueva visita</Button>
        </div>
    );
};

export default AppointmentList;
