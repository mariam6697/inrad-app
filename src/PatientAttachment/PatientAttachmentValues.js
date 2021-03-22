const formValues = {
    edit_title: "Editar Adjuntos",
    new_title: "Nueva Adjuntos",
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
            label: "Descripción",
            type: "text",
            name: "description",
            required: true,
        },
        {
            component: "text",
            label: "Adjunto",
            type: "file",
            name: "attachment",
            required: true,
        }
    ],
    customFields: [
    ]
}

const listValues = {
    title: "Adjuntos",
    new_title: "Nuevo Adjunto",
    fields: [
        {
            label: "Nombre",
            name: "name",
        },
        {
            label: "Descripción",
            name: "description",
        },
        {
            label: "Link",
            name: "attachment",
        }
    ]
}

const detailValues = {
    title: "Adjunto",
    fields: [
        {
            label: "Nombre",
            name: "name",
        },
        {
            label: "Descripción",
            name: "description",
        },
        {
            label: "Link",
            name: "attachment",
        }
    ]
}

export default {
    formValues,
    listValues,
    detailValues
};