import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  SelectPicker,
} from "rsuite";
import React, { useEffect } from "react";

const { useState } = require("react");
const AppointmentImageForm = ({ appointment, setAppointment }) => {
  const [appointmentImageInputs, setAppointmentImageInputs] = useState([]);

  useEffect(() => {
    setAppointmentWithImages();
  }, [appointmentImageInputs]);

  const setAppointmentWithImages = () => {
    setAppointment({
      id: appointment.id,
      summary: appointment.summary,
      images: appointmentImageInputs,
      symptoms: appointment.symptoms,
    });
  };

  const handleAddFields = () => {
    const values = [...appointmentImageInputs];
    values.push({ id: "", name: "", description: "", image: null });
    setAppointmentImageInputs(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...appointmentImageInputs];
    values.splice(index, 1);
    setAppointmentImageInputs(values);
  };

  const onChangeImage = (index, event) => {
    const values = [...appointmentImageInputs];
    console.log(event.target.files[0]);
    values[index].image = event.target.files[0];
    setAppointmentImageInputs(values);
  };

  const onChangeName = (index, event) => {
    const values = [...appointmentImageInputs];
    values[index].name = event;
    setAppointmentImageInputs(values);
  };
  const onChangeDescription = (index, event) => {
    const values = [...appointmentImageInputs];
    values[index].description = event;
    setAppointmentImageInputs(values);
  };
  return (
    <>
      <h4>Imagen</h4>
      {appointmentImageInputs.map((s, index) => {
        return (
          <div key={`${s}~${index}`}>
            <FormGroup>
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                name="name"
                onChange={(event) => onChangeName(index, event)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Descripción</ControlLabel>
              <FormControl
                name="description"
                onChange={(event) => onChangeDescription(index, event)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Imagen</ControlLabel>
              <input
                type="file"
                name="image"
                onChange={(event) => onChangeImage(index, event)}
              />
              ;
            </FormGroup>
            <Button onClick={handleRemoveFields}>x</Button>
          </div>
        );
      })}
      <Button onClick={handleAddFields}>Agregar imagen</Button>
    </>
  );
};

export default AppointmentImageForm;
