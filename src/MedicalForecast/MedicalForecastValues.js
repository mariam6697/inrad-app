const formValues = {
  edit_title: "Editar previsión de salud",
  new_title: "Nueva previsión de salud",
  fields: [
    {
      component: "text",
      label: "Nombre",
      type: "text",
      name: "name",
      required: true,
    },
  ],
};

const listValues = {
  title: "Previsiónes de salud",
  new_title: "Nuevo previsión de salud",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
  ],
};

const detailValues = {
  title: "Previsión de salud",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
  ],
};

export default {
  formValues,
  listValues,
  detailValues,
};
