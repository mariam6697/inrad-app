import { ControlLabel, FormControl, FormGroup, SelectPicker } from "rsuite";
import DiseaseTypeDataService from "../services/DiseaseTypeService";
import React, { useState, useEffect } from "react";

const DiseaseTypeSelectField = () => {
  const [diseaseTypes, setDiseaseTypes] = useState([]);
  useEffect(() => {
    retrieveDiseaseTypes();
  }, []);
  const retrieveDiseaseTypes = () => {
    DiseaseTypeDataService.getAll()
      .then((response) => {
        var diseaseTypes = response.data;
        var diseaseTypes_for_select = diseaseTypes.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setDiseaseTypes(diseaseTypes_for_select);
        console.log(diseaseTypes_for_select);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <FormGroup>
      <ControlLabel>Tipo</ControlLabel>
      <FormControl
        name="disease_type"
        accepter={SelectPicker}
        style={{ display: "inline-block", width: 200 }}
        data={diseaseTypes}
      />
    </FormGroup>
  );
};

const formValues = {
  edit_title: "Editar Diagnóstico",
  new_title: "Nuevo Diagnóstico",
  fields: [
    {
      component: "text",
      label: "Fecha de diagnóstico",
      type: "date",
      name: "diagnostic_date",
      required: true,
    },
    {
      component: "text",
      label: "Descripción",
      type: "text",
      name: "description",
      required: true,
    },
    {
      component: "text",
      label: "Etapa",
      type: "text",
      name: "disease_stage",
      required: true,
    },
    {
      component: "text",
      label: "Agresividad",
      type: "text",
      name: "disease_aggressiveness",
      required: true,
    },
  ],
  customFields: [DiseaseTypeSelectField],
};

const listValues = {
  title: "Diagnóstico",
  new_title: "Nuevo Diagnóstico",
  fields: [
    {
      label: "Fecha de diagnóstico",
      name: "diagnostic_date",
      required: true,
    },
    {
      label: "Descripción",
      name: "description",
      required: true,
    },
    {
      label: "Tipo",
      name: "disease_type",
      required: true,
    },
    {
      label: "Etapa",
      name: "disease_stage",
      required: true,
    },
    {
      label: "Agresividad",
      name: "disease_aggressiveness",
      required: true,
    },
  ],
};

const detailValues = {
  title: "Diagnóstico",
  fields: [
    {
      label: "Fecha de diagnóstico",
      name: "diagnostic_date",
    },
    {
      label: "Descripción",
      name: "description",
    },
    {
      label: "Tipo",
      name: "disease_type",
    },
    {
      label: "Etapa",
      name: "disease_stage",
    },
    {
      label: "Agresividad",
      name: "disease_aggressiveness",
    },
  ],
};

export default {
  formValues,
  listValues,
  detailValues,
};
