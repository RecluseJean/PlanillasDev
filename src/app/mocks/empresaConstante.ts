const constEmpresa={
    "lsEmpresa":{
        "estado": 1,
        "msg": "Empresas listadas correctamente",
        "aaData": [
            {
                "idEmpresa": 1,
                "razonSocial": "Partner Tech",
                "ruc": "12121212121",
                "estado": 1,
                "fechaRegistro": "2020-01-08T16:30:45.766+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 3,
                    "descripcion": "MEDIANA EMPRESA"
                }
            },
            {
                "idEmpresa": 2,
                "razonSocial": "Luchito SAC",
                "ruc": "12121212121",
                "estado": 1,
                "fechaRegistro": "2020-01-08T23:23:21.289+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 1,
                    "descripcion": "MICROEMPRESA"
                }
            }
        ]
    },
    "lsTipoEmp":{
        "estado": 1,
        "msg": "Tipos de empresas listados correctamente",
        "aaData": [
            {
                "idTipoEmp": 1,
                "descripcion": "MICROEMPRESA"
            },
            {
                "idTipoEmp": 2,
                "descripcion": "PEQUEÑA EMPRESA"
            },
            {
                "idTipoEmp": 3,
                "descripcion": "MEDIANA EMPRESA"
            },
            {
                "idTipoEmp": 4,
                "descripcion": "GRAN EMPRESA"
            }
        ]
    },
    "lsRegTrib":{
        "estado": 1,
        "msg": "Regimen Tributario listados correctamente",
        "aaData": [
            {
                "idRegTrib": 1,
                "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
            },
            {
                "idRegTrib": 2,
                "descripcion": "RER - Régimen Especial de Impuesto a la Renta"
            },
            {
                "idRegTrib": 3,
                "descripcion": "RMT - Régimen MYPE Tributario"
            },
            {
                "idRegTrib": 4,
                "descripcion": "RG - Régimen General"
            }
        ]
    },
    
    "regEmpresa":{
        "estado": 1,
        "msg": "Empresa insertada correctamente",
        "defaultObj": {
            "idEmpresa": 5,
            "razonSocial": "Partner Tech Sac",
            "ruc": "12121212121",
            "estado": 1,
            "fechaRegistro": "2020-01-10T17:15:41.948+0000",
            "urlImagen": null,
            "logo": null,
            "companyLimit": 0.0,
            "regTrib": {
                "idRegTrib": 1,
                "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
            },
            "limiteAutorizacion": null,
            "tipoEmp": {
                "idTipoEmp": 3,
                "descripcion": "MEDIANA EMPRESA"
            }
        }
    },

    "actEmpresa":{
        "estado": 1,
        "msg": "Empresa modificada correctamente",
        "defaultObj": {
            "idEmpresa": 5,
            "razonSocial": "Partner Tech SAC",
            "ruc": "12121212121",
            "estado": 1,
            "fechaRegistro": null,
            "urlImagen": null,
            "logo": null,
            "companyLimit": 0.0,
            "regTrib": {
                "idRegTrib": 1,
                "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
            },
            "limiteAutorizacion": null,
            "tipoEmp": {
                "idTipoEmp": 3,
                "descripcion": "MEDIANA EMPRESA"
            }
        }
    },
    "eliEmpresa":{
        "estado": 1,
        "msg": "Empresa eliminada correctamente",
        "defaultObj": true
    }

}

export default constEmpresa;