import {ControlLabel, FormControl, FormGroup, SelectPicker} from "rsuite";
import TreatmentMachineDataService from "../services/TreatmentMachineService";
import TreatmentModeDataService from "../services/TreatmentModeService";
import TreatmentDataService from "../services/TreatmentService";
import React, {useState, useEffect} from "react";

const TreatmentMachineSelectField = () => {
    const [treatmentMachines, setTreatmentMachines] = useState([]);
    useEffect(() => {
        retrieveTreatmentMachines();
    }, []);
    const retrieveTreatmentMachines = () => {
        TreatmentMachineDataService.getAll()
            .then(response => {
                var treatmentMachines = response.data;
                var treatmentMachines_for_select = treatmentMachines.map(function (x) {
                    return {"label": x.name, "value": x.id};
                });
                setTreatmentMachines(treatmentMachines_for_select);
                console.log(treatmentMachines_for_select);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <FormGroup>
            <ControlLabel>Máquina</ControlLabel>
            <FormControl name="machine" accepter={SelectPicker}
                         style={{display: 'inline-block', width: 200}}
                         data={treatmentMachines}/>
        </FormGroup>
    )
}


const TreatmentModeSelectField = () => {
    const [treatmentModes, setTreatmentModes] = useState([]);
    useEffect(() => {
        retrieveTreatmentModes();
    }, []);
    const retrieveTreatmentModes = () => {
        TreatmentModeDataService.getAll()
            .then(response => {
                var treatmentModes = response.data;
                var treatmentModes_for_select = treatmentModes.map(function (x) {
                    return {"label": x.name, "value": x.id};
                });
                setTreatmentModes(treatmentModes_for_select);
                console.log(treatmentModes_for_select);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <FormGroup>
            <ControlLabel>Modalidad</ControlLabel>
            <FormControl name="mode" accepter={SelectPicker}
                         style={{display: 'inline-block', width: 200}}
                         data={treatmentModes}/>
        </FormGroup>
    )
}


const TreatmentSelectField = () => {
    const [treatments, setTreatments] = useState([]);
    useEffect(() => {
        retrieveTreatments();
    }, []);
    const retrieveTreatments = () => {
        TreatmentDataService.getAll()
            .then(response => {
                var treatments = response.data;
                var treatments_for_select = treatments.map(function (x) {
                    return {"label": x.name, "value": x.id};
                });
                setTreatments(treatments_for_select);
                console.log(treatments_for_select);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <FormGroup>
            <ControlLabel>Tratamientos</ControlLabel>
            <FormControl name="treatment" accepter={SelectPicker}
                         style={{display: 'inline-block', width: 200}}
                         data={treatments}/>
        </FormGroup>
    )
}

const formValues = {
    edit_title: "Editar Tratamiento",
    new_title: "Nuevo Tratamiento",
    fields: [
        {
            "label": "Fecha de comienzo",
            "name": "start_date",
            "required": true,
            type: "date",
        },
        {
            "label": "Fecha de termino",
            "name": "end_date",
            type: "date",
        },
        {
            "label": "Éxito",
            "name": "sucess",
            type: "toggle",
        }
    ],
    customFields: [
        TreatmentMachineSelectField,
        TreatmentModeSelectField,
        TreatmentSelectField
    ]
}

const listValues = {
    "title": "Tratamiento",
    "new_title": "Nuevo Tratamiento",
    "fields": [
        {
            "label": "Fecha de comienzo",
            "name": "start_date",
            "required": true,
        },
        {
            "label": "Fecha de termino",
            "name": "end_date",
        },
        {
            "label": "Tratamiento",
            "name": "treatment",
            "required": true,
        },
        {
            "label": "Máquina",
            "name": "machine",
            "required": true,
        },
        {
            "label": "Modalidad",
            "name": "mode",
            "required": true,
        },
        {
            "label": "Éxito",
            "name": "sucess",
            "required": true,
        }
    ]
}

const detailValues = {
    "title": "Tratamiento",
    "fields": [
        {
            "label": "Fecha de comienzo",
            "name": "start_date",
        },
        {
            "label": "Fecha de termino",
            "name": "end_date",
        },
        {
            "label": "Tratamiento",
            "name": "treatment",
        },
        {
            "label": "Máquina",
            "name": "machine",
        },
        {
            "label": "Modalidad",
            "name": "mode",
        },
        {
            "label": "Éxito",
            "name": "sucess",
        }
    ]
}


export default {
    formValues,
    listValues,
    detailValues
};