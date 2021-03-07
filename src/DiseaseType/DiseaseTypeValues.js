const formValues = {
    "edit_title": "Editar tipo de Cáncer",
    "new_title": "Nuevo tipo de Cáncer",
    "fields": [
        {
            "component": "text",
            "label": "Nombre",
            "type": "text",
            "name": "name",
            "required": true,
        },
        {
            "component": "text",
            "label": "Código",
            "type": "text",
            "name": "code",
            "required": true,
        },
        {
            "component": "text",
            "label": "Descripción",
            "type": "text",
            "name": "description",
            "required": false,
        }
    ]
}

const listValues = {
    "title": "Tipos de Cáncer",
    "new_title": "Nuevo tipo de Cáncer",
    "fields": [
        {
            "label": "Nombre",
            "name": "name",
            "required": true,
        },
        {
            "label": "Código",
            "name": "code",
            "required": true,
        },
        {
            "label": "Descripción",
            "name": "description",
            "required": false,
        }
    ]
}

const detailValues = {
    "title": "Tipo de Cáncer",
    "fields": [
        {
            "label": "Nombre",
            "name": "name",
        },
        {
            "label": "Código",
            "name": "code",
        },
        {
            "label": "Descripción",
            "name": "description",
        }
    ]
}

export default {
    formValues,
    listValues,
    detailValues
};