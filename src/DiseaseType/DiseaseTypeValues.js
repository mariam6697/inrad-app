import React, { useEffect, useState } from "react";
import DiseaseCategoryDataService from "../services/DiseaseCategoryService";
import { ControlLabel, FormControl, FormGroup, SelectPicker } from "rsuite";

const DiseaseCategorySelectField = () => {
  const [diseaseCategories, setDiseaseCategories] = useState([]);
  useEffect(() => {
    retrieveDiseaseCategories();
  }, []);
  const retrieveDiseaseCategories = () => {
    DiseaseCategoryDataService.getAll()
      .then((response) => {
        var diseaseCategories = response.data;
        var diseaseCategoriesForSelect = diseaseCategories.map(function (x) {
          return { label: x.name, value: x.id };
        });
        setDiseaseCategories(diseaseCategoriesForSelect);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <FormGroup>
      <ControlLabel>Categoría</ControlLabel>
      <FormControl
        name="category"
        accepter={SelectPicker}
        style={{ display: "inline-block", width: 200 }}
        data={diseaseCategories}
      />
    </FormGroup>
  );
};

const formValues = {
  edit_title: "Editar tipo de Cáncer",
  new_title: "Nuevo tipo de Cáncer",
  fields: [
    {
      component: "text",
      label: "Nombre",
      type: "text",
      name: "name",
      required: true,
    },
    {
      component: "text",
      label: "Código",
      type: "text",
      name: "code",
      required: true,
    },
    {
      component: "text",
      label: "Descripción",
      type: "text",
      name: "description",
      required: false,
    },
  ],
  customFields: [DiseaseCategorySelectField],
};

const listValues = {
  title: "Tipos de Cáncer",
  new_title: "Nuevo tipo de Cáncer",
  fields: [
    {
      label: "Nombre",
      name: "name",
      required: true,
    },
    {
      label: "Código",
      name: "code",
      required: true,
    },
    {
      label: "Descripción",
      name: "description",
      required: false,
    },
    {
      label: "Categoría",
      name: "category",
      required: false,
    },
  ],
};

const detailValues = {
  title: "Tipo de Cáncer",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
    {
      label: "Código",
      name: "code",
    },
    {
      label: "Descripción",
      name: "description",
    },
    {
      label: "Categoría",
      name: "category",
    },
  ],
};

export default {
  formValues,
  listValues,
  detailValues,
};
