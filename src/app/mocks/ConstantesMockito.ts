const ConstantesDatosPrueba = {
    "File":{
        "estado":1,
        "msg":"Archivo subido correctamente"
    },
    "planilla":{
        "idPlanillaHistorico":1,
        "contrato":{
            "idContrato":1
        },
        "pdoAno":{
            "idPdoAno":1
        },
        "pdoMes":{
            "idPdoMes":1
        }
    },
    "lsPerfiles":[
      {
        "idPerfil":1,
        "ambito":1
      },
      {
        "idPerfil":2,
        "ambito":0
      }
    ],
    "TipoPlanilla":{
      "idTipoPlanilla":1,
      "descripcion": "trabajador",
      "categoriaPlanilla": 1,
      "estado": 1
    },
    "ResponseWrapperVacaciones":{
        "estado":1,
        "msg":"CRUD vacaciones",
        "aaData":[{
            "idVacaciones":1
        }]
    },
    "ResponseWrapperListaEmpresas": {
        "estado": 1,
        "msg": "Empresas listadas correctamente",
        "aaData": [
            {
                "idEmpresa": 1,
                "razonSocial": "asdasd",
                "ruc": "12345678910",
                "estado": 1,
                "fechaRegistro": "2020-01-06T14:30:19.377+0000",
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
            },
            {
                "idEmpresa": 2,
                "razonSocial": "dasdsadsa",
                "ruc": "47896541236",
                "estado": 1,
                "fechaRegistro": "2020-01-06T21:20:23.910+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 2,
                    "descripcion": "RER - Régimen Especial de Impuesto a la Renta"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            },
            {
                "idEmpresa": 3,
                "razonSocial": "asdsad",
                "ruc": "77777777777",
                "estado": 1,
                "fechaRegistro": "2020-01-06T21:41:16.934+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 3,
                    "descripcion": "RMT - Régimen MYPE Tributario"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 1,
                    "descripcion": "MICROEMPRESA"
                }
            }
        ]
    },
    "empresa1": {
        "idEmpresa": 1,
        "razonSocial": "asdasd",
        "ruc": "12345678910",
        "estado": 1,
        "fechaRegistro": "2020-01-06T14:30:19.377+0000",
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
    },
    "empresa2": {
        "idEmpresa": 2,
        "razonSocial": "dasdsadsa",
        "ruc": "47896541236",
        "estado": 1,
        "fechaRegistro": "2020-01-06T21:20:23.910+0000",
        "urlImagen": null,
        "logo": null,
        "companyLimit": 0.0,
        "regTrib": {
            "idRegTrib": 2,
            "descripcion": "RER - Régimen Especial de Impuesto a la Renta"
        },
        "limiteAutorizacion": null,
        "tipoEmp": {
            "idTipoEmp": 2,
            "descripcion": "PEQUEÑA EMPRESA"
        }
    },
    "empresa3": {
        "idEmpresa": 3,
        "razonSocial": "asdsad",
        "ruc": "77777777777",
        "estado": 1,
        "fechaRegistro": "2020-01-06T21:41:16.934+0000",
        "urlImagen": null,
        "logo": null,
        "companyLimit": 0.0,
        "regTrib": {
            "idRegTrib": 3,
            "descripcion": "RMT - Régimen MYPE Tributario"
        },
        "limiteAutorizacion": null,
        "tipoEmp": {
            "idTipoEmp": 1,
            "descripcion": "MICROEMPRESA"
        }
    },
    "MesPrueba1": {
        "idPdoMes": 1,
        "descripcion": "ENERO",
        "abrev": "ENE",
        "diasFeriadoCalend": 1
    },
    "ResponseWrapperListaMeses": {
        "estado": 1,
        "msg": "Transacción ejecutada correctamente",
        "aaData": [
            {
                "idPdoMes": 1,
                "descripcion": "ENERO",
                "abrev": "ENE",
                "diasFeriadoCalend": 1
            },
            {
                "idPdoMes": 2,
                "descripcion": "FEBRERO",
                "abrev": "FEB",
                "diasFeriadoCalend": 0
            },
            {
                "idPdoMes": 3,
                "descripcion": "MARZO",
                "abrev": "MAR",
                "diasFeriadoCalend": 0
            },
            {
                "idPdoMes": 4,
                "descripcion": "ABRIL",
                "abrev": "ABR",
                "diasFeriadoCalend": 2
            }
        ]
    },
    "añoPrueba1": {
        "idPdoAno": 12,
        "descripcion": 2015,
        "empresa": {
            "idEmpresa": 2,
            "razonSocial": "dasdsadsa",
            "ruc": "47896541236",
            "estado": 1,
            "fechaRegistro": "2020-01-06T21:20:23.910+0000",
            "urlImagen": null,
            "logo": null,
            "companyLimit": 0.0,
            "regTrib": {
                "idRegTrib": 2,
                "descripcion": "RER - Régimen Especial de Impuesto a la Renta"
            },
            "limiteAutorizacion": null,
            "tipoEmp": {
                "idTipoEmp": 2,
                "descripcion": "PEQUEÑA EMPRESA"
            }
        }
    },
    "ResponseWrapperListaAñoEmpresa2": {
        "estado": 1,
        "msg": "Transacción ejecutada correctamente",
        "aaData": [
            {
                "idPdoAno": 12,
                "descripcion": 2015,
                "empresa": {
                    "idEmpresa": 2,
                    "razonSocial": "dasdsadsa",
                    "ruc": "47896541236",
                    "estado": 1,
                    "fechaRegistro": "2020-01-06T21:20:23.910+0000",
                    "urlImagen": null,
                    "logo": null,
                    "companyLimit": 0.0,
                    "regTrib": {
                        "idRegTrib": 2,
                        "descripcion": "RER - Régimen Especial de Impuesto a la Renta"
                    },
                    "limiteAutorizacion": null,
                    "tipoEmp": {
                        "idTipoEmp": 2,
                        "descripcion": "PEQUEÑA EMPRESA"
                    }
                }
            },
            {
                "idPdoAno": 13,
                "descripcion": 2016,
                "empresa": {
                    "idEmpresa": 2,
                    "razonSocial": "dasdsadsa",
                    "ruc": "47896541236",
                    "estado": 1,
                    "fechaRegistro": "2020-01-06T21:20:23.910+0000",
                    "urlImagen": null,
                    "logo": null,
                    "companyLimit": 0.0,
                    "regTrib": {
                        "idRegTrib": 2,
                        "descripcion": "RER - Régimen Especial de Impuesto a la Renta"
                    },
                    "limiteAutorizacion": null,
                    "tipoEmp": {
                        "idTipoEmp": 2,
                        "descripcion": "PEQUEÑA EMPRESA"
                    }
                }
            }

        ]
    },
    "ResponseWrapperModuloAdmin": {
        "estado": 1,
        "msg": "Modulos listados correctamente",
        "aaData": [
            {
                "idModulo": 1,
                "descripcion": "Trabajador",
                "icono": "mdi mdi-worker",
                "estado": 1,
                "raiz": "app.uitrab",
                "orden": 1,
                "lspagina": [
                    {
                        "idPagina": 1,
                        "descripcion": "Gestión Trabajador",
                        "url": "/gestiontrabajador",
                        "parametros": "-",
                        "icono": "-",
                        "estado": 1,
                        "orden": 0
                    }
                ]
            },
            {
                "idModulo": 2,
                "descripcion": "Planillas",
                "icono": "mdi mdi-clipboard-text",
                "estado": 1,
                "raiz": "app.uiplan",
                "orden": 2,
                "lspagina": [
                    {
                        "idPagina": 2,
                        "descripcion": "Generar Planillas",
                        "url": "/generarplanillas",
                        "parametros": "-",
                        "icono": "-",
                        "estado": 1,
                        "orden": 0
                    }
                ]
            },
            {
                "idModulo": 3,
                "descripcion": "Configuración",
                "icono": "mdi mdi-settings",
                "estado": 1,
                "raiz": "app.uiconf",
                "orden": 3,
                "lspagina": [
                    {
                        "idPagina": 3,
                        "descripcion": "Parametros",
                        "url": "/parametros",
                        "parametros": "-",
                        "icono": "-",
                        "estado": 1,
                        "orden": 0
                    },
                    {
                        "idPagina": 4,
                        "descripcion": "AFP",
                        "url": "/afp",
                        "parametros": "-",
                        "icono": "-",
                        "estado": 1,
                        "orden": 0
                    }
                ]
            }
        ]
    },
    "ResponseWrapperListaTipoDoc": {
        "estado": 1,
        "msg": "Tipo documento listados correctamente",
        "aaData": [
            {
                "idTipoDoc": 1,
                "descripcion": "DNI"
            },
            {
                "idTipoDoc": 2,
                "descripcion": "RUC"
            },
            {
                "idTipoDoc": 3,
                "descripcion": "PASAPORTE"
            }
        ]
    },
    "ResponseWrapperListaEstdCivil": {
        "estado": 1,
        "msg": "Estados civiles listados correctamente",
        "aaData": [
            {
                "idEstadoCivil": 1,
                "descripcion": "SOLTERO"
            },
            {
                "idEstadoCivil": 2,
                "descripcion": "CASADO"
            },
            {
                "idEstadoCivil": 3,
                "descripcion": "VIUDO"
            },
            {
                "idEstadoCivil": 4,
                "descripcion": "DIVORCIADO"
            }
        ]
    },
    "ResponseWrapperListaPais": {
        "estado": 1,
        "msg": "Paises listados correctamente",
        "aaData": [
            {
                "idPais": 1,
                "descripcion": "Afganistán"
            },
            {
                "idPais": 2,
                "descripcion": "Islas Gland"
            },
            {
                "idPais": 3,
                "descripcion": "Albania"
            },
            {
                "idPais": 4,
                "descripcion": "Alemania"
            }
        ]
    },
    "ResponseWrapperListaDepa": {
        "estado": 1,
        "msg": "Departamentos listados correctamente",
        "aaData": [
            {
                "idDepartamento": 1,
                "descripcion": "AMAZONAS"
            },
            {
                "idDepartamento": 2,
                "descripcion": "ANCASH"
            },
            {
                "idDepartamento": 3,
                "descripcion": "APURIMAC"
            }
        ]
    },
    "ResponseWrapperListaProv": {
        "estado": 1,
        "msg": "Provincias listados correctamente",
        "aaData": [
            {
                "idProvincia": 1,
                "descripcion": "BAGUA"
            },
            {
                "idProvincia": 2,
                "descripcion": "BONGARA"
            },
            {
                "idProvincia": 3,
                "descripcion": "CHACHAPOYAS"
            }
        ]
    },
    "ResponseWrapperListaDistrito": {
        "estado": 1,
        "msg": "Distritos listados correctamente",
        "aaData": [
            {
                "idDistrito": 1,
                "descripcion": "ARAMANGO"
            },
            {
                "idDistrito": 2,
                "descripcion": "BAGUA"
            },
            {
                "idDistrito": 3,
                "descripcion": "COPALLIN"
            },
            {
                "idDistrito": 4,
                "descripcion": "EL PARCO"
            }
        ]
    },
    "ResponseWrapperListaTipoZona": {
        "estado": 1,
        "msg": "Tipos de zona listados correctamente",
        "aaData": [
            {
                "idTipoZona": 1,
                "descripcion": "A.H. ASENTAMIENTO HUMANO"
            },
            {
                "idTipoZona": 2,
                "descripcion": "C.H. CONJUNTO HABITACIONAL"
            },
            {
                "idTipoZona": 3,
                "descripcion": "CAS. CASERÍO"
            },
            {
                "idTipoZona": 4,
                "descripcion": "COO. COOPERATIVA"
            }
        ]
    },
    "ResponseWrapperListaNivelEdu": {
        "estado": 1,
        "msg": "Niveles de educacion listados correctamente",
        "aaData": [
            {
                "idNivelEdu": 1,
                "descripcion": "EDUCACIÓN ESPECIAL COMPLETA"
            },
            {
                "idNivelEdu": 2,
                "descripcion": "EDUCACIÓN ESPECIAL INCOMPLETA"
            },
            {
                "idNivelEdu": 3,
                "descripcion": "EDUCACIÓN PRIMARIA COMPLETA"
            },
            {
                "idNivelEdu": 4,
                "descripcion": "EDUCACIÓN PRIMARIA INCOMPLETA"
            }
        ]
    },
    "ResponseWrapperListaOcup": {
        "estado": 1,
        "msg": "Ocupaciones listados correctamente",
        "aaData": [
            {
                "idOcupacion": 1,
                "descripcion": "ABANIQUERO,CONFECCIONADOR DE ABANICOS"
            },
            {
                "idOcupacion": 2,
                "descripcion": "ABARQUERO"
            },
            {
                "idOcupacion": 3,
                "descripcion": "ABOGADO"
            }
        ]
    },
    "ResponseWrapperListaAfp": {
        "estado": 1,
        "msg": "AFP listadas correctamente",
        "aaData": [
            {
                "idAfp": 1,
                "descripcion": "ONP",
                "comSobFlu": 0.0,
                "comSobFluMix": 0.0,
                "comAnuSobSal": 0.0,
                "primaSeguro": 0.0,
                "apoOblFndPen": 0.13
            }
        ]
    },
    "ResponseWrapperListaEps": {
        "estado": 1,
        "msg": "EPS listados correctamente",
        "aaData": [
            {
                "idEps": 1,
                "descripcion": "COLSANITAS PERU S.A.  EPS",
                "aporte": 0.0225,
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "asdasd",
                    "ruc": "12345678910",
                    "estado": 1,
                    "fechaRegistro": "2020-01-06T14:30:19.377+0000",
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
            },
            {
                "idEps": 2,
                "descripcion": "MAPFRE PERU S.A. EPS",
                "aporte": 0.0225,
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "asdasd",
                    "ruc": "12345678910",
                    "estado": 1,
                    "fechaRegistro": "2020-01-06T14:30:19.377+0000",
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
            }
        ]
    },
    "ResponseWrapperListaRegSal": {
        "estado": 1,
        "msg": "Regimenes de salud listados correctamente",
        "aaData": [
            {
                "idRegSalud": 1,
                "descripcion": "ESSALUD AGRARIO/ACUÍCOLA"
            },
            {
                "idRegSalud": 2,
                "descripcion": "ESSALUD PENSIONISTAS"
            },
            {
                "idRegSalud": 3,
                "descripcion": "ESSALUD REGULAR (Exclusivamente)"
            }
        ]
    },
    "ResponseWrapperListaSituac": {
        "estado": 1,
        "msg": "Situaciones laborales listados correctamente",
        "aaData": [
            {
                "idSituacion": 1,
                "descripcion": "ACTIVO O SUBSIDIADO"
            }
        ]
    },
    "ResponseWrapperListaRegLab": {
        "estado": 1,
        "msg": "Regimenes laborales listados correctamente",
        "aaData": [
            {
                "idRegLaboral": 1,
                "descripcion": "AGRARIO LEY 27360"
            },
            {
                "idRegLaboral": 2,
                "descripcion": "CONSTRUCCION CIVIL"
            },
            {
                "idRegLaboral": 3,
                "descripcion": "CONTRATO ADMINISTRATIVO DE SERVICIOS - D.LEG. N.° 1057"
            }
        ]
    },
    "ResponseWrapperListaTipCont": {
        "estado": 1,
        "msg": "Tipos de contrato listados correctamente",
        "aaData": [
            {
                "idTipContrato": 1,
                "descripcion": "A DOMICILIO"
            },
            {
                "idTipContrato": 2,
                "descripcion": "A PLAZO INDETERMINADO - D.LEG. 728"
            },
            {
                "idTipContrato": 3,
                "descripcion": "A TIEMPO PARCIAL"
            }
        ]
    },
    "ResponseWrapperListaCenCost": {
        "estado": 1,
        "msg": "Centro de costos listados correctamente",
        "aaData": [
            {
                "idCentroCosto": 1,
                "descripcion": "CENTRO DE COSTO PRUEBA",
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "asdasd",
                    "ruc": "12345678910",
                    "estado": 1,
                    "fechaRegistro": "2020-01-06T14:30:19.377+0000",
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
            }
        ]
    },
    "ResponseWrapperListaAreaDepEmp": {
        "estado": 1,
        "msg": "Areas listadas por departamento empresa correctamente",
        "aaData": [
            {
                "iidAreaDepartamentoEmpresa": 1,
                "descripcion": "SDASDSAD"
            }
        ]
    },
    "ResponseWrapperListaPuesto": {
        "estado": 1,
        "msg": "Hay registros",
        "aaData": [
            {
                "iid_puesto": 1,
                "descripcion": "asdasdas",
                "areaDepEmp": {
                    "iidAreaDepartamentoEmpresa": 1,
                    "descripcion": "SDASDSAD"
                }
            }
        ]
    },
    "ResponseWrapperListaTipPago": {
        "estado": 1,
        "msg": "Tipos de pago listados correctamente",
        "aaData": [
            {
                "idTipoPago": 1,
                "descripcion": "DEPOSITO CUENTA"
            },
            {
                "idTipoPago": 2,
                "descripcion": "EFECTIVO"
            },
            {
                "idTipoPago": 3,
                "descripcion": "OTRO"
            }
        ]
    },
    "ResponseWrapperListaBanco": {
        "estado": 1,
        "msg": "Bancos listados correctamente",
        "aaData": [
            {
                "idBanco": 1,
                "descripcion": "BANCO DE COMERCIO"
            },
            {
                "idBanco": 2,
                "descripcion": "BANCO DE CREDITO DEL PERU"
            },
            {
                "idBanco": 3,
                "descripcion": "BANCO PICHINCHA"
            }
        ]
    },
    "ResponseWrapperListaSctr": {
        "estado": 1,
        "msg": "Sctr listados correctamente",
        "aaData": [
            {
                "idSctr": 1,
                "descripcion": "Ninguno",
                "tipo": 0
            },
            {
                "idSctr": 2,
                "descripcion": "ESSALUD",
                "tipo": 1
            },
            {
                "idSctr": 3,
                "descripcion": "EPS",
                "tipo": 1
            }
        ]
    },
    "Trabajador1": {
        "accion": "D",
        "idContrato": 2,
        "regAlterAcuAtp": 0,
        "discap": 0,
        "jorMax": 0,
        "horNoc": 0,
        "fecInicio": "2015-12-19T05:00:00.000+0000",
        "sueldoBase": 3000.0,
        "valorHora": 12.5,
        "nroCta": null,
        "nroCci": null,
        "movilidad": null,
        "otrIgr5ta": 0,
        "sindical": 0,
        "quintaExo": 0,
        "cuentaCTS": null,
        "tipoComprob":1,
        "epsServPropSalud": 0,
        "trabajador": {
            "idTrabajador": 2,
            "nombres": "GABRIEL",
            "apePater": "GARCIA",
            "apeMater": "MARQUEZ",
            "nroDoc": "73515487",
            "fecNac": "1958-11-09T05:00:00.000+0000",
            "sexo": "M",
            "correo": null,
            "nroCel": null,
            "direccion": "sdasdasdasd",
            "nomZona": "asdas",
            "referencia": "sadad",
            "nroHij": 0,
            "fecRegPens": null,
            "nroCuspp": null,
            "fecIngrSalud": null,
            "nroEssalud": null,
            "essaludVida": 0,
            "afilAseguPens": 0,
            "epsServProp": 0,
            "comiMixta": 0,
            "tipoDoc": {
                "idTipoDoc": 1,
                "descripcion": "DNI"
            },
            "pais": {
                "idPais": 1
            },
            "estadoCivil": {
                "idEstadoCivil": 1,
                "descripcion": "SOLTERO"
            },
            "departamento": {
                "idDepartamento": 3,
                "descripcion": "APURIMAC"
            },
            "provincia": {
                "idProvincia": 30,
                "descripcion": "ANTABAMBA"
            },
            "distrito": {
                "idDistrito": 281,
                "descripcion": "EL ORO"
            },
            "tipoZona": {
                "idTipoZona": 2,
                "descripcion": "C.H. CONJUNTO HABITACIONAL"
            },
            "nivelEdu": {
                "idNivelEdu": 5,
                "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
            },
            "ocupacion": {
                "idOcupacion": 16,
                "descripcion": "ACABADOR DE TRABAJOS DE PELETERIA"
            },
            "horario": {
                "idHorario": 1
            },
            "empresa": {
                "idEmpresa": 3,
                "razonSocial": "asdsad",
                "ruc": "77777777777",
                "estado": 1,
                "fechaRegistro": "2020-01-06T21:41:16.934+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 3,
                    "descripcion": "RMT - Régimen MYPE Tributario"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 1,
                    "descripcion": "MICROEMPRESA"
                }
            },
            "afp": {
                "idAfp": 1
            },
            "eps": {
                'idEps': 1
            },
            "regSalud": {
                'idRegSalud': 1
            },
            "situacion": {
                "idSituacion": 1,
                "descripcion": "ACTIVO O SUBSIDIADO"
            }
        },
        "regimenLaboral": {
            "idRegLaboral": 1,
            "descripcion": "AGRARIO LEY 27360"
        },
        "tipoContrato": {
            "idTipContrato": 1,
            "descripcion": "A DOMICILIO"
        },
        "centroCosto": {
            'idCentroCosto': 1
        },
        "areaDepEmp": {
            "iidAreaDepartamentoEmpresa": 1,
            "descripcion": "SDASDSAD"
        },
        "puesto": {
            "iid_puesto": 1,
            "descripcion": "asdasdas",
            "areaDepEmp": {
                "iidAreaDepartamentoEmpresa": 1,
                "descripcion": "SDASDSAD"
            }
        },

        "tipoPago": {
            "idTipoPago": 2,
            "descripcion": "EFECTIVO"
        },
        "bancoSueldo": {
            'idBanco': 1
        },
        "epsSalud": {
            'idEps': 1
        },
        "epsPension": {
            'idEps': 1
        },
        "bancoCts": {
            'idBanco': 1
        },
        "sctrPension": {
            'idSctr': 1
        },
        "sctrSalud": {
            'idSctr': 3,
            'tipo': 1
        }
    },
    "Trabajador2": {
        "accion": "D",
        "idContrato": 2,
        "regAlterAcuAtp": 0,
        "discap": 0,
        "jorMax": 0,
        "horNoc": 0,
        "fecInicio": "2015-12-19T05:00:00.000+0000",
        "fecFin":"2020-12-19T05:00:00.000+0000",
        "sueldoBase": 3000.0,
        "valorHora": 12.5,
        "nroCta": null,
        "nroCci": null,
        "movilidad": null,
        "otrIgr5ta": 0,
        "sindical": 0,
        "quintaExo": 0,
        "cuentaCTS": null,
        "epsServPropSalud": 0,
        "tipoComprob":2,
        "trabajador": {
            "idTrabajador": 2,
            "nombres": "GABRIEL",
            "apePater": "GARCIA",
            "apeMater": "MARQUEZ",
            "nroDoc": "73515487",
            "fecNac": "1958-11-09T05:00:00.000+0000",
            "sexo": "M",
            "correo": null,
            "nroCel": null,
            "direccion": "sdasdasdasd",
            "nomZona": "asdas",
            "referencia": "sadad",
            "nroHij": 0,
            "fecRegPens": null,
            "nroCuspp": null,
            "fecIngrSalud": null,
            "nroEssalud": null,
            "essaludVida": 0,
            "afilAseguPens": 0,
            "epsServProp": 0,
            "comiMixta": 0,
            "tipoDoc": {
                "idTipoDoc": 1,
                "descripcion": "DNI"
            },
            "pais": {
                "idPais": 1
            },
            "estadoCivil": {
                "idEstadoCivil": 1,
                "descripcion": "SOLTERO"
            },
            "departamento": {
                "idDepartamento": 3,
                "descripcion": "APURIMAC"
            },
            "provincia": {
                "idProvincia": 30,
                "descripcion": "ANTABAMBA"
            },
            "distrito": {
                "idDistrito": 281,
                "descripcion": "EL ORO"
            },
            "tipoZona": {
                "idTipoZona": 2,
                "descripcion": "C.H. CONJUNTO HABITACIONAL"
            },
            "nivelEdu": {
                "idNivelEdu": 5,
                "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
            },
            "ocupacion": {
                "idOcupacion": 16,
                "descripcion": "ACABADOR DE TRABAJOS DE PELETERIA"
            },
            "horario": {
                "idHorario": 1
            },
            "empresa": {
                "idEmpresa": 3,
                "razonSocial": "asdsad",
                "ruc": "77777777777",
                "estado": 1,
                "fechaRegistro": "2020-01-06T21:41:16.934+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 3,
                    "descripcion": "RMT - Régimen MYPE Tributario"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 1,
                    "descripcion": "MICROEMPRESA"
                }
            },
            "afp": {
                "idAfp": 1
            },
            "eps": {
                'idEps': 1
            },
            "regSalud": {
                'idRegSalud': 1
            },
            "situacion": {
                "idSituacion": 1,
                "descripcion": "ACTIVO O SUBSIDIADO"
            }
        },
        "regimenLaboral": {
            "idRegLaboral": 1,
            "descripcion": "AGRARIO LEY 27360"
        },
        "tipoContrato": {
            "idTipContrato": 1,
            "descripcion": "A DOMICILIO"
        },
        "centroCosto": {
            'idCentroCosto': 1
        },
        "areaDepEmp": {
            "iidAreaDepartamentoEmpresa": 1,
            "descripcion": "SDASDSAD"
        },
        "puesto": {
            "iid_puesto": 1,
            "descripcion": "asdasdas",
            "areaDepEmp": {
                "iidAreaDepartamentoEmpresa": 1,
                "descripcion": "SDASDSAD"
            }
        },
        "tipoPago": {
            "idTipoPago": 2,
            "descripcion": "EFECTIVO"
        },
        "bancoSueldo": {
            "idBanco":1
        },
        "epsSalud": {
            "idEps":1
        },
        "epsPension": {
            "idEps":1
        },
        "bancoCts": {
            "idBanco":1
        },
        "sctrPension": {
            "idSctr":2
        },
        "sctrSalud": {
            'idSctr': 2,
            'tipo': 1
        }
    },
    "Trabajador3": {
        "accion": "D",
        "idContrato": 2,
        "regAlterAcuAtp": 0,
        "discap": 0,
        "jorMax": 0,
        "horNoc": 0,
        "fecInicio": "2015-12-19T05:00:00.000+0000",
        "sueldoBase": 3000.0,
        "valorHora": 12.5,
        "nroCta": null,
        "nroCci": null,
        "movilidad": null,
        "otrIgr5ta": 0,
        "sindical": 0,
        "quintaExo": 0,
        "cuentaCTS": null,
        "epsServPropSalud": 1,
        "tipoComprob":1,
        "trabajador": {
            "idTrabajador": 2,
            "nombres": "GABRIEL",
            "apePater": "GARCIA",
            "apeMater": "MARQUEZ",
            "nroDoc": "73515487",
            "fecNac": "1958-11-09T05:00:00.000+0000",
            "sexo": "M",
            "correo": null,
            "nroCel": null,
            "direccion": "sdasdasdasd",
            "nomZona": "asdas",
            "referencia": "sadad",
            "nroHij": 0,
            "fecRegPens": null,
            "nroCuspp": null,
            "fecIngrSalud": null,
            "nroEssalud": null,
            "essaludVida": 0,
            "afilAseguPens": 0,
            "epsServProp": 0,
            "comiMixta": 0,
            "tipoDoc": {
                "idTipoDoc": 1,
                "descripcion": "DNI"
            },
            "pais": {
                "idPais": 1
            },
            "estadoCivil": {
                "idEstadoCivil": 1,
                "descripcion": "SOLTERO"
            },
            "departamento": {
                "idDepartamento": 3,
                "descripcion": "APURIMAC"
            },
            "provincia": {
                "idProvincia": 30,
                "descripcion": "ANTABAMBA"
            },
            "distrito": {
                "idDistrito": 281,
                "descripcion": "EL ORO"
            },
            "tipoZona": {
                "idTipoZona": 2,
                "descripcion": "C.H. CONJUNTO HABITACIONAL"
            },
            "nivelEdu": {
                "idNivelEdu": 5,
                "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
            },
            "ocupacion": {
                "idOcupacion": 16,
                "descripcion": "ACABADOR DE TRABAJOS DE PELETERIA"
            },
            "horario": {
                "idHorario": 1
            },
            "empresa": {
                "idEmpresa": 3,
                "razonSocial": "asdsad",
                "ruc": "77777777777",
                "estado": 1,
                "fechaRegistro": "2020-01-06T21:41:16.934+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 3,
                    "descripcion": "RMT - Régimen MYPE Tributario"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 1,
                    "descripcion": "MICROEMPRESA"
                }
            },
            "afp": {
                "idAfp": 1
            },
            "eps": {
                'idEps': 1
            },
            "regSalud": {
                'idRegSalud': 1
            },
            "situacion": {
                "idSituacion": 1,
                "descripcion": "ACTIVO O SUBSIDIADO"
            }
        },
        "regimenLaboral": {
            "idRegLaboral": 1,
            "descripcion": "AGRARIO LEY 27360"
        },
        "tipoContrato": {
            "idTipContrato": 1,
            "descripcion": "A DOMICILIO"
        },
        "centroCosto": {
            'idCentroCosto': 1
        },
        "areaDepEmp": {
            "iidAreaDepartamentoEmpresa": 1,
            "descripcion": "SDASDSAD"
        },
        "puesto": {
            "iid_puesto": 1,
            "descripcion": "asdasdas",
            "areaDepEmp": {
                "iidAreaDepartamentoEmpresa": 1,
                "descripcion": "SDASDSAD"
            }
        },
        "tipoPago": {
            "idTipoPago": 2,
            "descripcion": "EFECTIVO"
        },
        "bancoSueldo": null,
        "epsSalud": null,
        "epsPension": null,
        "bancoCts": null,
        "sctrPension": null,
        "sctrSalud": {
            'idSctr': 2,
            'tipo': 1
        }
    },
    "TrabajadorSinContrato": {
        "idTrabajador": 2,
        "nombres": "GABRIEL",
        "apePater": "GARCIA",
        "apeMater": "MARQUEZ",
        "nroDoc": "73515487",
        "fecNac": "1958-11-09T05:00:00.000+0000",
        "sexo": "M",
        "correo": null,
        "nroCel": null,
        "direccion": "sdasdasdasd",
        "nomZona": "asdas",
        "referencia": "sadad",
        "nroHij": 0,
        "fecRegPens": null,
        "nroCuspp": null,
        "fecIngrSalud": null,
        "nroEssalud": null,
        "essaludVida": 0,
        "afilAseguPens": 0,
        "epsServProp": 0,
        "comiMixta": 0,
        "tipoDoc": {
            "idTipoDoc": 1,
            "descripcion": "DNI"
        },
        "pais": {
            "idPais": 1
        },
        "estadoCivil": {
            "idEstadoCivil": 1,
            "descripcion": "SOLTERO"
        },
        "departamento": {
            "idDepartamento": 3,
            "descripcion": "APURIMAC"
        },
        "provincia": {
            "idProvincia": 30,
            "descripcion": "ANTABAMBA"
        },
        "distrito": {
            "idDistrito": 281,
            "descripcion": "EL ORO"
        },
        "tipoZona": {
            "idTipoZona": 2,
            "descripcion": "C.H. CONJUNTO HABITACIONAL"
        },
        "nivelEdu": {
            "idNivelEdu": 5,
            "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
        },
        "ocupacion": {
            "idOcupacion": 16,
            "descripcion": "ACABADOR DE TRABAJOS DE PELETERIA"
        },
        "horario": {
            "idHorario": 1
        },
        "empresa": {
            "idEmpresa": 3,
            "razonSocial": "asdsad",
            "ruc": "77777777777",
            "estado": 1,
            "fechaRegistro": "2020-01-06T21:41:16.934+0000",
            "urlImagen": null,
            "logo": null,
            "companyLimit": 0.0,
            "regTrib": {
                "idRegTrib": 3,
                "descripcion": "RMT - Régimen MYPE Tributario"
            },
            "limiteAutorizacion": null,
            "tipoEmp": {
                "idTipoEmp": 1,
                "descripcion": "MICROEMPRESA"
            }
        },
        "afp": {
            "idAfp": 1
        },
        "eps": {
            'idEps': 1
        },
        "regSalud": {
            'idRegSalud': 1
        },
        "situacion": {
            "idSituacion": 1,
            "descripcion": "ACTIVO O SUBSIDIADO"
        }
    },
    "ResponseWrapperCRUDTrab": {
        "estado": 1,
        "msg": "Trabajador listado por empresa correctamente",
        "aaData": [
            {
                "idContrato": 2,
                "regAlterAcuAtp": 0,
                "discap": 0,
                "jorMax": 0,
                "horNoc": 0,
                "fecInicio": "2015-12-19T05:00:00.000+0000",
                "sueldoBase": 3000.0,
                "valorHora": 12.5,
                "nroCta": null,
                "nroCci": null,
                "movilidad": null,
                "otrIgr5ta": 0,
                "sindical": 0,
                "quintaExo": 0,
                "cuentaCTS": null,
                "epsServPropSalud": 0,
                "trabajador": {
                    "idTrabajador": 2,
                    "nombres": "GABRIEL",
                    "apePater": "GARCIA",
                    "apeMater": "MARQUEZ",
                    "nroDoc": "73515487",
                    "fecNac": "1958-11-09T05:00:00.000+0000",
                    "sexo": "M",
                    "correo": null,
                    "nroCel": null,
                    "direccion": "sdasdasdasd",
                    "nomZona": "asdas",
                    "referencia": "sadad",
                    "nroHij": 0,
                    "fecRegPens": null,
                    "nroCuspp": null,
                    "fecIngrSalud": null,
                    "nroEssalud": null,
                    "essaludVida": 0,
                    "afilAseguPens": 0,
                    "epsServProp": 0,
                    "comiMixta": 0,
                    "tipoDoc": {
                        "idTipoDoc": 1,
                        "descripcion": "DNI"
                    },
                    "pais": null,
                    "estadoCivil": {
                        "idEstadoCivil": 1,
                        "descripcion": "SOLTERO"
                    },
                    "departamento": {
                        "idDepartamento": 3,
                        "descripcion": "APURIMAC"
                    },
                    "provincia": {
                        "idProvincia": 30,
                        "descripcion": "ANTABAMBA"
                    },
                    "distrito": {
                        "idDistrito": 281,
                        "descripcion": "EL ORO"
                    },
                    "tipoZona": {
                        "idTipoZona": 2,
                        "descripcion": "C.H. CONJUNTO HABITACIONAL"
                    },
                    "nivelEdu": {
                        "idNivelEdu": 5,
                        "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
                    },
                    "ocupacion": {
                        "idOcupacion": 16,
                        "descripcion": "ACABADOR DE TRABAJOS DE PELETERIA"
                    },
                    "horario": {
                        "idHorario": 1
                    },
                    "empresa": {
                        "idEmpresa": 3,
                        "razonSocial": "asdsad",
                        "ruc": "77777777777",
                        "estado": 1,
                        "fechaRegistro": "2020-01-06T21:41:16.934+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 3,
                            "descripcion": "RMT - Régimen MYPE Tributario"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 1,
                            "descripcion": "MICROEMPRESA"
                        }
                    },
                    "afp": null,
                    "eps": null,
                    "regSalud": null,
                    "situacion": {
                        "idSituacion": 1,
                        "descripcion": "ACTIVO O SUBSIDIADO"
                    }
                },
                "regimenLaboral": {
                    "idRegLaboral": 1,
                    "descripcion": "AGRARIO LEY 27360"
                },
                "tipoContrato": {
                    "idTipContrato": 1,
                    "descripcion": "A DOMICILIO"
                },
                "centroCosto": null,
                "areaDepEmp": {
                    "iidAreaDepartamentoEmpresa": 1,
                    "descripcion": "SDASDSAD"
                },
                "puesto": {
                    "iid_puesto": 1,
                    "descripcion": "asdasdas",
                    "areaDepEmp": {
                        "iidAreaDepartamentoEmpresa": 1,
                        "descripcion": "SDASDSAD"
                    }
                },
                "tipoPago": {
                    "idTipoPago": 2,
                    "descripcion": "EFECTIVO"
                },
                "bancoSueldo": null,
                "epsSalud": null,
                "epsPension": null,
                "bancoCts": null,
                "sctrPension": null,
                "sctrSalud": null
            }
        ]
    },
    "checkTokenUsuario": {
        "estado": true,
        "id_usuario": 1,
        "user_name": "junior",
        "scope": [
            "read",
            "write"
        ],
        "correo": "correoooo@hotmail.com",
        "id_perfil": 2,
        "exp": 1579278457,
        "authorities": [
            "ROLE_TRABAJADOR"
        ],
        "jti": "255ddf6d-fa7e-45ab-ba04-8bb0afcfd1ef",
        "client_id": "planillas123"
    },
    "usuarioPrueba1": {
        "accion":'D',
        "idUsuario": 1,
        "email": "asd@asd.com",
        "estado": true,
        "username": "juan",
        "user_name":"juan",
        "id_usuario":1,
        "id_perfil":1,
        "id_role":1,
        "correo":"asdsd@4asdsa.com",
        "password": "asdSADSADASDSADasdasdasd",
        "perfil": {
            "idPerfil": 1
        }
    },
    "info_token_login": {
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlc3RhZG8iOnRydWUsImlkX3VzdWFyaW8iOjMsInVzZXJfbmFtZSI6Imp1YW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiY29ycmVvIjoiYXNkQGFzZC5jb20iLCJpZF9wZXJmaWwiOjEsImV4cCI6MTU3OTI3NjQyNywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhMGZlNTk4OC0yMmE1LTQ0NjctYmMyNS1kMGMzOThkNzg2N2MiLCJjbGllbnRfaWQiOiJwbGFuaWxsYXMxMjMifQ.mQK7OkEJKeqanYzysPnqOIg0Mq8t7-YZrp9_Gf61vJGAp3x9e3v5ElKtJQZjllPzA8nHumrJg9XmOiXcbeFbjx8u2iFJ6Zc8ASBdutcOFkUqNkCDtyW4Mfpanev-4WU1XTSHqLBwm5PeTy4P1eDIBOlLYC7lQYFPEn13Gro6wODWItlxnZ-B3TtBH-EgyZUvOvkTmrWSVFownW7AZZpqWSUQ2f4ckpp3YTUkHZDesWoBXVDatIGw53O4fRipV0K3SCf4VZKCPHbj_OSP9z4ZVX4-BOFh--xPehiEBN6KxKLifiwan_wir-I7Eabk2FqPHT_fcZkjECmKwJbIT8E_dw",
        "token_type": "bearer",
        "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlc3RhZG8iOnRydWUsImlkX3VzdWFyaW8iOjMsInVzZXJfbmFtZSI6Imp1YW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiY29ycmVvIjoiYXNkQGFzZC5jb20iLCJhdGkiOiJhMGZlNTk4OC0yMmE1LTQ0NjctYmMyNS1kMGMzOThkNzg2N2MiLCJpZF9wZXJmaWwiOjEsImV4cCI6MTU3OTI3NjQyNywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiIyY2M0YWI2Mi1mYjEyLTRkNGQtYWRlYi1iMThjNWE1M2M3MDgiLCJjbGllbnRfaWQiOiJwbGFuaWxsYXMxMjMifQ.u3-JJUtdIN_KS-_p9q4OPs_39ftmlsRTp1kmZ5tHSKPQyDzYl_vOZipq6eKv86UIvRhkEVYSLmbYkiXMYoq3D8sIMeeYpabbNVmQRcSBe_uJa276b9j1AOUGzj2KrdfQ5cWbet8S4vy-tROZUXmUEL_P6Z40BZZTlYINDwWBeEQRcQNkdImGT900pZF_u6hlMDw0_sHcBYvxjZeicJtMEXFBbMZNZ_Bs8rsH1rEd3VzBB7HV5spdEGeXBlHFK85ckYxWKbEfu8gLLIdhlvlsZaGZswD-Ir0113DGXkSb2Shs0wv6Y2uox9N3N6v-vkgX-k_CFq6M-iyvekyCiKJpJA",
        "expires_in": 3599,
        "scope": "read write",
        "estado": true,
        "id_usuario": 3,
        "correo": "asd@asd.com",
        "id_perfil": 1,
        "jti": "a0fe5988-22a5-4467-bc25-d0c398d7867c"
    },
    "ResponseWrapperListaUsuarios": {
        "estado": 1,
        "msg": "Usuarios listados correctamente",
        "aaData": [
            {
                "idUsuario": 4,
                "username": "pedro",
                "password": "$2a$10$u9xnm7gSCJaTdoQ5Dp.YDu546/KVQ8OM1riOIHeaYjwUNdu/kIyeu",
                "email": "pedro@hotmail.com",
                "estado": true,
                "perfil": {
                    "idPerfil": 1,
                    "nombres": "ROLE_ADMIN",
                    "ambito": 1,
                    "estado": true,
                    "lspaginas": [
                        {
                            "idPagina": 1,
                            "descripcion": "Gestión Usuarios",
                            "url": "/gestionusuarios",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 2,
                            "descripcion": "Gestión Trabajador",
                            "url": "/gestiontrabajador",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 3,
                            "descripcion": "Generar Planillas",
                            "url": "/generarplanillas",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 4,
                            "descripcion": "Parametros",
                            "url": "/parametros",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 5,
                            "descripcion": "AFP",
                            "url": "/afp",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 6,
                            "descripcion": "AreaDepartamentoEmpresa",
                            "url": "/areaDepEmp",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 7,
                            "descripcion": "PuestoAreaEmpresa",
                            "url": "/puesto",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 8,
                            "descripcion": "Empresa",
                            "url": "/empresa",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        }
                    ]
                }
            },
            {
                "idUsuario": 3,
                "username": "juan",
                "password": "$2a$10$zgEfOh9lZJheIiC1Xpl1XuyW0pHZaIy0vUyNYp3UuOli0xnnOEnji",
                "email": "asd@asd.com",
                "estado": true,
                "perfil": {
                    "idPerfil": 1,
                    "nombres": "ROLE_ADMIN",
                    "ambito": 1,
                    "estado": true,
                    "lspaginas": [
                        {
                            "idPagina": 1,
                            "descripcion": "Gestión Usuarios",
                            "url": "/gestionusuarios",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 2,
                            "descripcion": "Gestión Trabajador",
                            "url": "/gestiontrabajador",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 3,
                            "descripcion": "Generar Planillas",
                            "url": "/generarplanillas",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 4,
                            "descripcion": "Parametros",
                            "url": "/parametros",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 5,
                            "descripcion": "AFP",
                            "url": "/afp",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 6,
                            "descripcion": "AreaDepartamentoEmpresa",
                            "url": "/areaDepEmp",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 7,
                            "descripcion": "PuestoAreaEmpresa",
                            "url": "/puesto",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        },
                        {
                            "idPagina": 8,
                            "descripcion": "Empresa",
                            "url": "/empresa",
                            "parametros": "-",
                            "icono": "-",
                            "estado": 1,
                            "orden": 0
                        }
                    ]
                }
            },
            {
                "idUsuario": 1,
                "username": "junior",
                "password": "$2a$10$9txKFUjVvLmtWLNF8c.FK.oBIhhawheIdnrxS25DH2kpIDFlsgELm",
                "email": "correoooo@hotmail.com",
                "estado": true,
                "perfil": {
                    "idPerfil": 2,
                    "nombres": "ROLE_TRABAJADOR",
                    "ambito": 1,
                    "estado": true,
                    "lspaginas": []
                }
            }
        ]
    },
    "ResponseWrapperCUSuario": {
        "estado": 1,
        "msg": "Usuario ... correctamente",
        "defaultObj": {
            "idUsuario": 1,
            "username": "junior",
            "password": "$2a$10$9txKFUjVvLmtWLNF8c.FK.oBIhhawheIdnrxS25DH2kpIDFlsgELm",
            "email": "correoooo@hotmail.com",
            "estado": true,
            "perfil": {
                "idPerfil": 2,
                "nombres": "ROLE_TRABAJADOR",
                "ambito": 1,
                "estado": true,
                "lspaginas": []
            }
        }
    },
    "ResponseWrapperListaPerfil": {
        "estado": 1,
        "msg": "Perfiles listados correctamente",
        "aaData": [
            {
                "idPerfil": 1,
                "estado": true,
                "nombres": "ROLE_ADMIN"
            },
            {
                "idPerfil": 2,
                "estado": true,
                "nombres": "ROLE_TRABAJADOR"
            }
        ]
    },
    "ResponseWrapperListaHorario": {
        "estado": 1,
        "msg": "Horarios listados correctamente",
        "aaData": [
            {
                "idHorario": 1,
                "horIniDia": "2020-02-05T13:00:00.000+0000",
                "horFinDia": "2020-02-05T21:00:00.000+0000",
                "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
                "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
                "descripcion": "administrativo",
                "estado": true,
                "checkLunes": true,
                "checkMartes": true,
                "checkMiercoles": true,
                "checkJueves": true,
                "checkViernes": true,
                "checkSabado": false,
                "checkDomingo": false,
                "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes",
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "EMPRESA 1",
                    "ruc": "12345678965",
                    "ubicacion": "SAASDS",
                    "estado": 1,
                    "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                    "urlImagen": null,
                    "logo": null,
                    "companyLimit": 0.0,
                    "regTrib": {
                        "idRegTrib": 1,
                        "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                    },
                    "limiteAutorizacion": null,
                    "tipoEmp": {
                        "idTipoEmp": 2,
                        "descripcion": "PEQUEÑA EMPRESA"
                    }
                }
            }
        ]
    },
    "lsTipoPlanillaPerfiles":[
      {
        "idTipoPlanillaPerfil":1,
        "estado":1
      },
      {
        "idTipoPlanillaPerfil":2,
        "estado":0
      }
    ],
    "lsTipoPlanilla":[
      {
        "idTipoPlanilla":1,
        "descripcion":'tipoPlanilla1'
      },
      {
        "idTipoPlanillaPerfil":2,
        "descripcion":'tipoPlanilla2'
      }
    ],
    "ResponseWrapperRegistrarHorario": {
        "estado": 1,
        "msg": "Horario registrado correctamente",
        "defaultObj": {
            "idHorario": 2,
            "horIniDia": "2020-02-05T13:00:00.000+0000",
            "horFinDia": "2020-02-05T21:00:00.000+0000",
            "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
            "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
            "descripcion": "trabajador",
            "estado": true,
            "checkLunes": true,
            "checkMartes": true,
            "checkMiercoles": true,
            "checkJueves": true,
            "checkViernes": true,
            "checkSabado": true,
            "checkDomingo": false,
            "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes - Sabado",
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            }
        }
    },
    "ResponseWrapperActualizarHorario": {
        "estado": 1,
        "msg": "Horario actualizado correctamente",
        "defaultObj": {
            "idHorario": 2,
            "horIniDia": "2020-02-05T13:00:00.000+0000",
            "horFinDia": "2020-02-05T21:00:00.000+0000",
            "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
            "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
            "descripcion": "trabajador",
            "estado": true,
            "checkLunes": true,
            "checkMartes": true,
            "checkMiercoles": true,
            "checkJueves": true,
            "checkViernes": true,
            "checkSabado": true,
            "checkDomingo": false,
            "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes - Sabado",
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            }
        }
    },
    "horario": {
        "idHorario": 2,
        "horIniDia": "2020-02-05T13:00:00.000+0000",
        "horFinDia": "2020-02-05T21:00:00.000+0000",
        "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
        "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
        "descripcion": "trabajador",
        "estado": true,
        "checkLunes": true,
        "checkMartes": true,
        "checkMiercoles": true,
        "checkJueves": true,
        "checkViernes": true,
        "checkSabado": true,
        "checkDomingo": false,
        "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes - Sabado",
        "empresa": {
            "idEmpresa": 1,
            "razonSocial": "EMPRESA 1",
            "ruc": "12345678965",
            "ubicacion": "SAASDS",
            "estado": 1,
            "fechaRegistro": "2020-02-05T17:01:50.477+0000",
            "urlImagen": null,
            "logo": null,
            "companyLimit": 0.0,
            "regTrib": {
                "idRegTrib": 1,
                "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
            },
            "limiteAutorizacion": null,
            "tipoEmp": {
                "idTipoEmp": 2,
                "descripcion": "PEQUEÑA EMPRESA"
            }
        }
    },
    "ResponseWrapperListaTipoPermisos": {
        "estado": 1,
        "msg": "Permisos listados correctamente",
        "aaData": [
            {
                "idTipoPermiso": 1
            },
            {
                "idTipoPermiso": 2
            },
            {
                "idTipoPermiso": 3
            }
        ]
    },
    "ResponseWrapperRegTipoPermiso": {
        "estado": 1,
        "msg": "Permiso registrado correctamente",
        "defaultObj": {
            "idTipoPermiso": 1
        }
    },
    "ResponseWrapperActTipoPermiso": {
        "estado": 1,
        "msg": "Permiso actualizado correctamente",
        "defaultObj": {
            "idTipoPermiso": 1
        }
    },
    "Tipopermiso": {
        "idTipoPermiso": 1
    },
    "permiso": {

        "idPermiso": 1,
        "tipoPermiso": {
            "idTipoPermiso": 1,
            "descripcion": "Maternidad",
            "diasPermiso": 98,
            "estado": true
        },
        "fechaIni": "2020-02-11T19:24:58.595+0000",
        "fechaFin": "2020-05-19T19:24:58.595+0000",
        "trabajador": {
            "idTrabajador": 1,
            "nombres": "JUNIOR ANGEL",
            "apePater": "MORALES",
            "apeMater": "BRENIS",
            "nroDoc": "73058001",
            "fecNac": "1996-09-04T05:00:00.000+0000",
            "sexo": "M",
            "correo": "",
            "nroCel": null,
            "direccion": "adsdsad",
            "nomZona": "asdasd",
            "referencia": "adasdas",
            "nroHij": 0,
            "fecRegPens": "2019-12-05T05:00:00.000+0000",
            "nroCuspp": null,
            "fecIngrSalud": null,
            "nroEssalud": null,
            "essaludVida": 0,
            "afilAseguPens": 0,
            "epsServProp": 0,
            "horario": {
                "idHorario": 1,
                "horIniDia": "2020-02-05T13:00:00.000+0000",
                "horFinDia": "2020-02-05T21:00:00.000+0000",
                "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
                "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
                "descripcion": "administrativo",
                "estado": true,
                "checkLunes": true,
                "checkMartes": true,
                "checkMiercoles": true,
                "checkJueves": true,
                "checkViernes": true,
                "checkSabado": false,
                "checkDomingo": false,
                "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes",
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "EMPRESA 1",
                    "ruc": "12345678965",
                    "ubicacion": "SAASDS",
                    "estado": 1,
                    "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                    "urlImagen": null,
                    "logo": null,
                    "companyLimit": 0.0,
                    "regTrib": {
                        "idRegTrib": 1,
                        "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                    },
                    "limiteAutorizacion": null,
                    "tipoEmp": {
                        "idTipoEmp": 2,
                        "descripcion": "PEQUEÑA EMPRESA"
                    }
                }
            }
        },
        "pdoAno": {
            "idPdoAno": 6,
            "descripcion": 2020,
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            }
        },
        "pdoMes": {
            "idPdoMes": 2,
            "descripcion": "FEBRERO",
            "abrev": "FEB",
            "diasFeriadoCalend": 0,
            "cantidadDias": 29,
            "txtDiasFeriados": null
        }
    },
    "ResponseWrapperCRUDPermiso": {
        "estado": 1,
        "msg": "Permisos listadaos correctamente",
        "aaData": [
            {
                "idPermiso": 1,
                "tipoPermiso": {
                    "idTipoPermiso": 1,
                    "descripcion": "Maternidad",
                    "diasPermiso": 98,
                    "estado": true,
                    "empresa": {
                        "idEmpresa": 1,
                        "razonSocial": "EMPRESA 1",
                        "ruc": "12345678965",
                        "ubicacion": "SAASDS",
                        "estado": 1,
                        "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 1,
                            "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 2,
                            "descripcion": "PEQUEÑA EMPRESA"
                        }
                    }
                },
                "fechaIni": "2020-02-11T19:24:58.595+0000",
                "fechaFin": "2020-05-19T19:24:58.595+0000",
                "trabajador": {
                    "idTrabajador": 1,
                    "nombres": "JUNIOR ANGEL",
                    "apePater": "MORALES",
                    "apeMater": "BRENIS",
                    "nroDoc": "73058001",
                    "fecNac": "1996-09-04T05:00:00.000+0000",
                    "sexo": "M",
                    "correo": "",
                    "nroCel": null,
                    "direccion": "adsdsad",
                    "nomZona": "asdasd",
                    "referencia": "adasdas",
                    "nroHij": 0,
                    "fecRegPens": "2019-12-05T05:00:00.000+0000",
                    "nroCuspp": null,
                    "fecIngrSalud": null,
                    "nroEssalud": null,
                    "essaludVida": 0,
                    "afilAseguPens": 0,
                    "epsServProp": 0,
                    "comiMixta": 1,
                    "tipoDoc": {
                        "idTipoDoc": 1,
                        "descripcion": "DNI"
                    },
                    "pais": null,
                    "estadoCivil": {
                        "idEstadoCivil": 1,
                        "descripcion": "SOLTERO"
                    },
                    "departamento": {
                        "idDepartamento": 1,
                        "descripcion": "AMAZONAS"
                    },
                    "provincia": {
                        "idProvincia": 1,
                        "descripcion": "BAGUA"
                    },
                    "distrito": {
                        "idDistrito": 2,
                        "descripcion": "BAGUA"
                    },
                    "tipoZona": {
                        "idTipoZona": 1,
                        "descripcion": "A.H. ASENTAMIENTO HUMANO"
                    },
                    "nivelEdu": {
                        "idNivelEdu": 5,
                        "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
                    },
                    "ocupacion": {
                        "idOcupacion": 9,
                        "descripcion": "ABOGADOS Y OTROS"
                    },
                    "empresa": {
                        "idEmpresa": 1,
                        "razonSocial": "EMPRESA 1",
                        "ruc": "12345678965",
                        "ubicacion": "SAASDS",
                        "estado": 1,
                        "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 1,
                            "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 2,
                            "descripcion": "PEQUEÑA EMPRESA"
                        }
                    },
                    "afp": {
                        "idAfp": 1,
                        "descripcion": "ONP",
                        "comSobFlu": 0.0,
                        "comSobFluMix": 0.0,
                        "comAnuSobSal": 0.0,
                        "primaSeguro": 0.0,
                        "apoOblFndPen": 0.13
                    },
                    "eps": null,
                    "regSalud": null,
                    "situacion": {
                        "idSituacion": 1,
                        "descripcion": "ACTIVO O SUBSIDIADO"
                    },
                    "horario": {
                        "idHorario": 1,
                        "horIniDia": "2020-02-05T13:00:00.000+0000",
                        "horFinDia": "2020-02-05T21:00:00.000+0000",
                        "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
                        "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
                        "descripcion": "administrativo",
                        "estado": true,
                        "checkLunes": true,
                        "checkMartes": true,
                        "checkMiercoles": true,
                        "checkJueves": true,
                        "checkViernes": true,
                        "checkSabado": false,
                        "checkDomingo": false,
                        "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes",
                        "empresa": {
                            "idEmpresa": 1,
                            "razonSocial": "EMPRESA 1",
                            "ruc": "12345678965",
                            "ubicacion": "SAASDS",
                            "estado": 1,
                            "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                            "urlImagen": null,
                            "logo": null,
                            "companyLimit": 0.0,
                            "regTrib": {
                                "idRegTrib": 1,
                                "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                            },
                            "limiteAutorizacion": null,
                            "tipoEmp": {
                                "idTipoEmp": 2,
                                "descripcion": "PEQUEÑA EMPRESA"
                            }
                        }
                    }
                },
                "pdoAno": {
                    "idPdoAno": 6,
                    "descripcion": 2020,
                    "empresa": {
                        "idEmpresa": 1,
                        "razonSocial": "EMPRESA 1",
                        "ruc": "12345678965",
                        "ubicacion": "SAASDS",
                        "estado": 1,
                        "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 1,
                            "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 2,
                            "descripcion": "PEQUEÑA EMPRESA"
                        }
                    }
                },
                "pdoMes": {
                    "idPdoMes": 2,
                    "descripcion": "FEBRERO",
                    "abrev": "FEB",
                    "diasFeriadoCalend": 0,
                    "cantidadDias": 29,
                    "txtDiasFeriados": null
                }
            }
        ]
    },
    "falta": {
        "idFalta": 1,
        "trabajador": {
            "idTrabajador": 1,
            "nombres": "JUNIOR ANGEL",
            "apePater": "MORALES",
            "apeMater": "BRENIS",
            "nroDoc": "73058001",
            "fecNac": "1996-09-04T05:00:00.000+0000",
            "sexo": "M",
            "correo": "",
            "nroCel": null,
            "direccion": "adsdsad",
            "nomZona": "asdasd",
            "referencia": "adasdas",
            "nroHij": 0,
            "fecRegPens": "2019-12-05T05:00:00.000+0000",
            "nroCuspp": null,
            "fecIngrSalud": null,
            "nroEssalud": null,
            "essaludVida": 0,
            "afilAseguPens": 0,
            "epsServProp": 0,
            "comiMixta": 1,
            "tipoDoc": {
                "idTipoDoc": 1,
                "descripcion": "DNI"
            },
            "pais": null,
            "estadoCivil": {
                "idEstadoCivil": 1,
                "descripcion": "SOLTERO"
            },
            "departamento": {
                "idDepartamento": 1,
                "descripcion": "AMAZONAS"
            },
            "provincia": {
                "idProvincia": 1,
                "descripcion": "BAGUA"
            },
            "distrito": {
                "idDistrito": 2,
                "descripcion": "BAGUA"
            },
            "tipoZona": {
                "idTipoZona": 1,
                "descripcion": "A.H. ASENTAMIENTO HUMANO"
            },
            "nivelEdu": {
                "idNivelEdu": 5,
                "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
            },
            "ocupacion": {
                "idOcupacion": 9,
                "descripcion": "ABOGADOS Y OTROS"
            },
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            },
            "afp": {
                "idAfp": 1,
                "descripcion": "ONP",
                "comSobFlu": 0.0,
                "comSobFluMix": 0.0,
                "comAnuSobSal": 0.0,
                "primaSeguro": 0.0,
                "apoOblFndPen": 0.13
            },
            "eps": null,
            "regSalud": null,
            "situacion": {
                "idSituacion": 1,
                "descripcion": "ACTIVO O SUBSIDIADO"
            },
            "horario": {
                "idHorario": 1,
                "horIniDia": "2020-02-05T13:00:00.000+0000",
                "horFinDia": "2020-02-05T21:00:00.000+0000",
                "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
                "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
                "descripcion": "administrativo",
                "estado": true,
                "checkLunes": true,
                "checkMartes": true,
                "checkMiercoles": true,
                "checkJueves": true,
                "checkViernes": true,
                "checkSabado": false,
                "checkDomingo": false,
                "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes",
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "EMPRESA 1",
                    "ruc": "12345678965",
                    "ubicacion": "SAASDS",
                    "estado": 1,
                    "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                    "urlImagen": null,
                    "logo": null,
                    "companyLimit": 0.0,
                    "regTrib": {
                        "idRegTrib": 1,
                        "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                    },
                    "limiteAutorizacion": null,
                    "tipoEmp": {
                        "idTipoEmp": 2,
                        "descripcion": "PEQUEÑA EMPRESA"
                    }
                }
            }
        },
        "pdoAno": {
            "idPdoAno": 6,
            "descripcion": 2020,
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            }
        },
        "pdoMes": {
            "idPdoMes": 2,
            "descripcion": "FEBRERO",
            "abrev": "FEB",
            "diasFeriadoCalend": 0,
            "cantidadDias": 29,
            "txtDiasFeriados": null
        },
        "fecha": "2020-02-11",
        "justificado": 0
    },
    "CRUDFaltas": {
        "estado": 1,
        "msg": "Faltas listadas correctamente",
        "aaData": [
            {
                "idFalta": 1
            },
            {
                "idFalta": 2
            }
        ]
    },
    "CRUDTipoPlanilla":{
      "idTipoPlanilla":1,
      "nombre":'Trabajadores',
      "estado":1
    },
    "CRUDAsistencias": {
        "estado": 1,
        "msg": "Asistencias listadas correctamente",
        "aaData": [
            {
                "idAsistencia": 1,
                "fecha": "2019-09-04T05:00:00.000+0000",
                "horIniDia": "2019-09-04T05:00:00.000+0000",
                "horFinDia": "2019-09-04T05:00:00.000+0000",
                "horIniAlmu": "2019-09-04T05:00:00.000+0000",
                "horFinAlmu": "2019-09-04T05:00:00.000+0000"

            },
            {
                "idAsistencia": 2,
                "fecha": "2019-09-04T05:00:00.000+0000",
                "horIniDia": "2019-09-04T05:00:00.000+0000",
                "horFinDia": "2019-09-04T05:00:00.000+0000",
                "horIniAlmu": "2019-09-04T05:00:00.000+0000",
                "horFinAlmu": "2019-09-04T05:00:00.000+0000"
            }
        ]
    },
    "asistencia": {
        "idAsistencia": 1,
        "fecha": "2020-02-05",
        "horIniDia": null,
        "horFinDia": null,
        "horIniAlmu": null,
        "horFinAlmu": null,
        "tipoAsistencia": 0,
        "trabajador": {
            "idTrabajador": 1,
            "nombres": "JUNIOR ANGEL",
            "apePater": "MORALES",
            "apeMater": "BRENIS",
            "nroDoc": "73058001",
            "fecNac": "1996-09-04T05:00:00.000+0000",
            "sexo": "M",
            "correo": "",
            "nroCel": null,
            "direccion": "adsdsad",
            "nomZona": "asdasd",
            "referencia": "adasdas",
            "nroHij": 0,
            "fecRegPens": "2019-12-05T05:00:00.000+0000",
            "nroCuspp": null,
            "fecIngrSalud": null,
            "nroEssalud": null,
            "essaludVida": 0,
            "afilAseguPens": 0,
            "epsServProp": 0,
            "comiMixta": 1,
            "tipoDoc": {
                "idTipoDoc": 1,
                "descripcion": "DNI"
            },
            "pais": null,
            "estadoCivil": {
                "idEstadoCivil": 1,
                "descripcion": "SOLTERO"
            },
            "departamento": {
                "idDepartamento": 1,
                "descripcion": "AMAZONAS"
            },
            "provincia": {
                "idProvincia": 1,
                "descripcion": "BAGUA"
            },
            "distrito": {
                "idDistrito": 2,
                "descripcion": "BAGUA"
            },
            "tipoZona": {
                "idTipoZona": 1,
                "descripcion": "A.H. ASENTAMIENTO HUMANO"
            },
            "nivelEdu": {
                "idNivelEdu": 5,
                "descripcion": "EDUCACIÓN SECUNDARIA COMPLETA"
            },
            "ocupacion": {
                "idOcupacion": 9,
                "descripcion": "ABOGADOS Y OTROS"
            },
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            },
            "afp": {
                "idAfp": 1,
                "descripcion": "ONP",
                "comSobFlu": 0.0,
                "comSobFluMix": 0.0,
                "comAnuSobSal": 0.0,
                "primaSeguro": 0.0,
                "apoOblFndPen": 0.13
            },
            "eps": null,
            "regSalud": null,
            "situacion": {
                "idSituacion": 1,
                "descripcion": "ACTIVO O SUBSIDIADO"
            },
            "horario": {
                "idHorario": 1,
                "horIniDia": "2020-02-05T13:00:00.000+0000",
                "horFinDia": "2020-02-05T21:00:00.000+0000",
                "horAlmuerIni": "2020-02-05T17:00:00.000+0000",
                "horAlmuerFin": "2020-02-05T18:00:00.000+0000",
                "descripcion": "administrativo",
                "estado": true,
                "checkLunes": true,
                "checkMartes": true,
                "checkMiercoles": true,
                "checkJueves": true,
                "checkViernes": true,
                "checkSabado": false,
                "checkDomingo": false,
                "totalDias": "Lunes - Martes - Miercoles - Jueves - Viernes",
                "empresa": {
                    "idEmpresa": 1,
                    "razonSocial": "EMPRESA 1",
                    "ruc": "12345678965",
                    "ubicacion": "SAASDS",
                    "estado": 1,
                    "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                    "urlImagen": null,
                    "logo": null,
                    "companyLimit": 0.0,
                    "regTrib": {
                        "idRegTrib": 1,
                        "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                    },
                    "limiteAutorizacion": null,
                    "tipoEmp": {
                        "idTipoEmp": 2,
                        "descripcion": "PEQUEÑA EMPRESA"
                    }
                }
            }
        },
        "pdoAno": {
            "idPdoAno": 6,
            "descripcion": 2020,
            "empresa": {
                "idEmpresa": 1,
                "razonSocial": "EMPRESA 1",
                "ruc": "12345678965",
                "ubicacion": "SAASDS",
                "estado": 1,
                "fechaRegistro": "2020-02-05T17:01:50.477+0000",
                "urlImagen": null,
                "logo": null,
                "companyLimit": 0.0,
                "regTrib": {
                    "idRegTrib": 1,
                    "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                },
                "limiteAutorizacion": null,
                "tipoEmp": {
                    "idTipoEmp": 2,
                    "descripcion": "PEQUEÑA EMPRESA"
                }
            }
        },
        "pdoMes": {
            "idPdoMes": 2,
            "descripcion": "FEBRERO",
            "abrev": "FEB",
            "diasFeriadoCalend": 0,
            "cantidadDias": 29,
            "txtDiasFeriados": null
        }
    },
    "ResponseWrapperListaAsistencias": {
        "estado": 1,
        "msg": "Asistencias listadas correctamente",
        "aaData": [
            {
                "idAsistencia": 1
            }
        ]
    },
    "ResponseWrapperCRUDAsistencia": {
        "estado": 1,
        "msg": "Asistencia crud correctamente",
        "defaultObj": {
            "idAsistencia": 1
        }
    },
    "ResponseWrapperListaFaltas": {
        "estado": 1,
        "msg": "Faltas listadas correctamente",
        "aaData": [
            {
                "idFalta": 1
            }
        ]
    },
    "ResponseWrapperCRUDFalta": {
        "estado": 1,
        "msg": "Falta crud correctamente",
        "defaultObj": {
            "idFalta": 1
        }
    },
    "ResponseWrapperListaPermisos": {
        "estado": 1,
        "msg": "Permisos listadas correctamente",
        "aaData": [
            {
                "idPermiso": 1
            }
        ]
    },
    "ResponseWrapperCRUDAPeriso": {
        "estado": 1,
        "msg": "Permiso crud correctamente",
        "defaultObj": {
            "idPermiso": 1
        }
    },


}

export default ConstantesDatosPrueba;
