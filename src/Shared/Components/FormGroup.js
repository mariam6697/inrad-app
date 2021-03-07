import {ControlLabel, FormControl, FormGroup, HelpBlock} from "rsuite";
import React from "react";

const GenericFormGroup = ({label, name, required}) => {
    return(
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl name={name}/>
            {required && (<HelpBlock>Requerido</HelpBlock>)}
        </FormGroup>
    );
};


export default GenericFormGroup;