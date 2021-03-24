const formValues = {
  edit_title: "Editar Categoría de enfermedad",
  new_title: "Nuevo Categoría de enfermedad",
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
  ],
};

const listValues = {
  title: "Categoría de enfermedades",
  new_title: "Nuevo Categoría de enfermedad",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
    {
      label: "Código",
      name: "code",
    },
  ],
};

const detailValues = {
  title: "Categoría de Enfermedad",
  fields: [
    {
      label: "Nombre",
      name: "name",
    },
    {
      label: "Código",
      name: "code",
    },
  ],
};

export default {
  formValues,
  listValues,
  detailValues,
};
