const formValues = {
  edit_title: "Editar centro de salud",
  new_title: "Nueva centro de salud",
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
      label: "Dirección",
      type: "text",
      name: "address",
      required: true,
    },
  ],
};

const listValues = {
  title: "Centros de salud",
  new_title: "Nuevo centro de salud",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
    {
      label: "Dirección",
      name: "address",
    },
  ],
};

const detailValues = {
  title: "Centro de salud",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
    {
      label: "Dirección",
      name: "address",
    },
  ],
};

export default {
  formValues,
  listValues,
  detailValues,
};
