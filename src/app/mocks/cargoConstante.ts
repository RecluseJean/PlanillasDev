const constCargo = {
    "lsCargo": {
        "estado": 1,
        "msg": "AFP listadas correctamente",
        "aaData": [
            {
                "idCargo": 1,
                "descripcion": "Programador",
                "categoria": {
                    "idCategoria": 1,
                    "descripcion": "Empleado"
                }
            },
            {
                "idCargo": 2,
                "descripcion": "Desarrollador",
                "categoria": {
                    "idCategoria": 1,
                    "descripcion": "Empleado"
                }
            },
            {
                "idCargo": 3,
                "descripcion": "a",
                "categoria": {
                    "idCategoria": 1,
                    "descripcion": "Empleado"
                }
            },
            {
                "idCargo": 4,
                "descripcion": "Programador",
                "categoria": {
                    "idCategoria": 1,
                    "descripcion": "Empleado"
                }
            }
        ]
    },

    "regisCargo": {
        "estado": 1,
        "msg": "Cargo insertado correctamente",
        "defaultObj": {
            "idCargo": 4,
            "descripcion": "Programador",
            "categoria": {
                "idCategoria": 1,
                "descripcion": null
            }
        }
    },

    "actCargo": {
        "estado": 1,
        "msg": "Cargo actualizado correctamente",
        "defaultObj": {
            "idCargo": 4,
            "descripcion": "Electricista",
            "categoria": {
                "idCategoria": 1,
                "descripcion": "Empleado"
            }
        }
    },
    "eliCargo": {
        "estado": 1,
        "msg": " Cargo eliminado correctamente",
        "defaultObj": false
    }
}

export default constCargo;