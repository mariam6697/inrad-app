import {
  ControlLabel,
  DatePicker,
  FormControl,
  FormGroup,
  HelpBlock,
  Toggle,
} from "rsuite";
import React from "react";

const GenericFormGroup = ({ label, name, required, type, instance }) => {
  const onChangeCalendar = (value, e) => {
    instance[name] = value;
    instance[name] = instance[name].toISOString().slice(0, 10);
  };
  const onToggle = (value, e) => {
    instance[name] = value;
    console.log(value);
  };
  const onChangeFile = (value, e) => {
    instance[name] = value.target.files[0];
    console.log(value);
  };
  const getComponent = () => {
    switch (type) {
      case "file":
        return <input type="file" name="attachment" onChange={onChangeFile} />;
      case "toggle":
        return <Toggle onChange={onToggle} />;
      case "textarea":
        return <FormControl name={name} rows={5} componentClass="textarea" />;
      case "date":
        return (
          <DatePicker
            onChange={onChangeCalendar}
            placeholder="Seleccione Fecha"
            format="YYYY-MM-DD"
          />
        );
      default:
        return <FormControl name={name} />;
    }
  };

  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {getComponent()}
      {required && <HelpBlock>Requerido</HelpBlock>}
    </FormGroup>
  );
};

export default GenericFormGroup;
