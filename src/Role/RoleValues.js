const formValues = {
  edit_title: "Editar Rol",
  new_title: "Nuevo Rol",
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
  title: "Roles",
  new_title: "Nuevo Rol",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
  ],
};

const detailValues = {
  title: "Rol",
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
