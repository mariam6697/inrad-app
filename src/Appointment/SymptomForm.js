import React, { useEffect, useState } from "react";
import SymptomGroupDataService from "../services/SymptomGroupService";
import SymptomDataService from "../services/SymptomService";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  SelectPicker,
} from "rsuite";

const SymptomForm = ({ appointment, setAppointment }) => {
  const [symptomInputs, setSymptomInputs] = useState([]);
  const [symptomGroups, setSymptomGroups] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    retrieveSymptomGroups();
  }, []);

  useEffect(() => {
    setAppointmentWithSymptoms();
  }, [symptomInputs]);

  const setAppointmentWithSymptoms = () => {
    setAppointment({
      id: appointment.id,
      summary: appointment.summary,
      images: appointment.images,
      symptoms: symptomInputs,
    });
  };

  const retrieveSymptomGroups = () => {
    SymptomGroupDataService.getAll()
      .then((response) => {
        const symptomGroups = response.data;
        const symptomGroups_for_select = symptomGroups.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setSymptomGroups(symptomGroups_for_select);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveSymptoms = (id) => {
    SymptomDataService.getAllByGroupId(id)
      .then((response) => {
        const symptoms = response.data;
        const symptomsForSelect = symptoms.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setSymptoms(symptomsForSelect);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeGroup = (index, event) => {
    retrieveSymptoms(event);
    setDisabled(false);
  };

  const onChangeSymptom = (index, event) => {
    const values = [...symptomInputs];
    values[index].SymptomId = event;
    setSymptomInputs(values);
  };

  const handleAddFields = () => {
    const values = [...symptomInputs];
    values.push({ id: "", SymptomId: "" });
    setSymptomInputs(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...symptomInputs];
    values.splice(index, 1);
    setSymptomInputs(values);
  };
  return (
    <>
      <h4>Síntoma</h4>
      {symptomInputs.map((s, index) => {
        return (
          <div key={`${s}~${index}`}>
            <FormGroup>
              <ControlLabel>Grupo</ControlLabel>
              <FormControl
                name={`group${s}~${index}`}
                accepter={SelectPicker}
                style={{ display: "inline-block", width: 200 }}
                data={symptomGroups}
                onChange={(event) => onChangeGroup(index, event)}
              />
              <ControlLabel>Síntoma</ControlLabel>
              <FormControl
                disabled={disabled}
                name={`symptom${s}~${index}`}
                accepter={SelectPicker}
                style={{ display: "inline-block", width: 200 }}
                data={symptoms}
                onChange={(event) => onChangeSymptom(index, event)}
              />
            </FormGroup>
            <Button onClick={handleRemoveFields}>x</Button>
          </div>
        );
      })}
      <Button onClick={handleAddFields}>Agregar Síntoma</Button>
    </>
  );
};

export default SymptomForm;
