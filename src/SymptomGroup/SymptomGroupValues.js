const formValues = {
  edit_title: "Editar grupo de síntomas",
  new_title: "Nuevo grupo de síntomas",
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
  title: "Grupos de síntomas",
  new_title: "Nuevo grupo de síntomas",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
  ],
};

const detailValues = {
  title: "Grupo de síntomas",
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
