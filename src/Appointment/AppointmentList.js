import React from "react";
import {Input, Button, Table, Grid, Row, Col} from "rsuite";
import GenericFormGroup from "../Shared/Components/FormGroup";

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
                    {appointments.map((appointment) =>
                        <><label>{appointment.summary}</label><br/>
                            {appointment.images.map((image) => <img src={image.image} alt={image.name} style={{maxHeight: "200px"}}/>)}<br/></>
                    )}
                </Row>
            </Grid>
            <Button onClick={appointmentFormButton}>Nueva visita</Button>
        </div>
    );
};

export default AppointmentList;
