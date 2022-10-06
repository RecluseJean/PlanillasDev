const Constantes = {
  "numeroItem":6,
  "tiempoSegundos":1200,
  "msgInactividad":"Sesión cerrada por inactividad",
  "a": "TIPTARD",
  "b": "TIPORANGO",
  "BAD_CREDENTIALES": "Bad credentials",
  "DISABLED": "User is disabled",
  "Msg_BAD_CREDENTIALES": "¡El nombre de usuario o la contraseña son incorrectos!",
  "Msg_DISABLED": "¡El usuario ingresado esta deshabilitado¡",
  "SUCCESS": "¡Listo!",
  "ERROR": "¡Error!",
  "ERROR_FK_P":"El permiso está asignado a un usuario, revisar el control de asistencia",
  "ERROR_FK_AE":"El Area Empresa tiene asignado a trabajadores, revisar contratos",
  "ERROR_FK_PA":"El Puesto Area Empresa tiene asignado a trabajadores, revisar contratos",
  "WARNING": "¡Cuidado!",
  "INFO": "¡Mensaje!",
  "ACTUALIZAR": "U",
  "ELIMINAR": "D",
  "REGISTRAR": "R",
  "SOLICITAR": "S",
  "CANCELARSOLICITUD": "C",
  "solicitudRevision": 2,
  "SOLICITUDREVISION": "R",
  "SOLICITUDAPROBADA": "SA",
  "SOLICITUDRECHAZADA": "SR",
  "DETALLEPOSTULANTE": "VDP",
  "MOSTRAR": "M",
  "REPORTEWORD": "W",
  "IDPASAPORTE": 3,
  "IDRUC": 2,
  "IDNIVEEDU": 5,
  "IDESTCIV": 1,
  "IDTIPOPAGODEP": 1,
  "SCTRPENSIONEPS": 3,
  "REGSALUDEPS": 4,
  "SCTRSALUDEPS": 1,
  "DIASCOMPTBASE": 30,
  "MAXADELANTO": 30,
  "mensajeNuevoTipoPlanillaConf": 'Esta cambiando la categoria de la planilla.               Si guardas los cambios todos los trabajadores asignados a esta planilla seran retirados y quedaran libres',
  "genPlanillaMasiva":"Selecciona un periodo para generar planilla masiva",
  "genAsistenciaMasiva":"Selecciona un periodo para generar excel de asistencia masiva",
  "genAsistencia":"Selecciona un periodo para generar excel de asistencia por tipo de planilla",
  "genReporteCueCon":"Selecciona un periodo para generar el reporte de cuentas contables",
  "genPlanilla":"Selecciona un periodo para generar planilla",
  "JUSTIFICADO": [{
    "descripcion": "No Justificado",
    "valor": 0
  }, {
    "descripcion": "Justificado Doc",
    "valor": 1
  }, {
    "descripcion": "Justificado Permiso",
    "valor": 2
  }],
  "tiposComprobantes": [
    { 'idTipoPlanilla': 1, 'descripcion': 'Planilla' },
    { 'idTipoPlanilla': 2, 'descripcion': 'Recibo por Honorarios' }
  ]
  ,
  "SEXO": [{
    "descripcion": "Masculino",
    "abrev": "M"
  }, {
    "descripcion": "Femenino",
    "abrev": "F"
  }],
  "DiasSemana": [{
    "nombre": 'Lunes',
    "seleccionado": false
  }, {
    "nombre": 'Martes',
    "seleccionado": false
  }, {
    "nombre": 'Miercoles',
    "seleccionado": false
  }, {
    "nombre": 'Jueves',
    "seleccionado": false
  }, {
    "nombre": 'Viernes',
    "seleccionado": false
  }, {
    "nombre": 'Sabado',
    "seleccionado": false
  }, {
    "nombre": 'Domingo',
    "seleccionado": false
  }]
  ,
  "TIPOCOMPROBANTE": [{
    'idTipoPlanilla': 1,
    'descripcion': 'Planilla'
  }, {
    'idTipoPlanilla': 2,
    'descripcion': 'Recibo por Honorarios'
  }],

  "CATEGORIAPUESTO": [{
    'idCategoria': "M",
    'descripcion': 'Masivo'
  }, {
    'idCategoria': "E",
    'descripcion': 'Especializado'
  }, {
    'idCategoria': "G",
    'descripcion': 'Gerencial'
  }],

  "ESTADO": [{
    "descripcion": "ACTIVO",
    "valor": true
  },
  {
    "descripcion": "INACTIVO",
    "valor": false
  }],
  "TIPOTARDANZA": [
    {
      "val": "1",
      "descripcion": "Cantidad de días"
    },
    {
      "val": "2",
      "descripcion": "Rango minutos"
    }
  ],
  "TIPORANGO": [
    {
      "val": "1",
      "descripcion": "Minutos exactos"
    },
    {
      "val": "2",
      "descripcion": "Rango completo"
    }
  ],
  "DerechoHab": [
    {
      "idTipoDH": 1,
      "descripcion": "Cónyugue"
    },
    {
      "idTipoDH": 2,
      "descripcion": "Hijo incapacitado completamente"
    },
    {
      "idTipoDH": 3,
      "descripcion": "Madre gestante"
    }
  ],
  "tipoAdeSue": [
    {
      "id": 1,
      "descripcion": "Proporcional"
    },
    {
      "id": 2,
      "descripcion": "Emergencia"
    }

  ],
  "tipoCuenta":[
    {
      "id":1,
      "descripcion":"AHORRO"
    },
    {
      "id":2,
      "descripcion":"CORRIENTE"
    },{
      "id":3,
      "descripcion":"INTERBANCARIA"
    }
  ],
  "tipoCuentaEmp":[
    {
      "id":1,
      "descripcion":"MAESTRA"
    },
    {
      "id":2,
      "descripcion":"CORRIENTE"
    }
  ],
  "tipoModena":[
    {
      "id":1,
      "descripcion":"SOLES (S/)"
    },
    {
      "id":2,
      "descripcion":"DOLARES ($)"
    }
  ],
  "sectorEmpresa":[
    {
      "id":1,
      "descripcion":"PUBLICO"
    },
    {
      "id":2,
      "descripcion":"PRIVADO"
    }
  ],
  "tipoRem":[
    {
      "id":1,
      "descripcion":"MONTO FIJO"
    },
    {
      "id":2,
      "descripcion":"FORMULA"
    }
  ],
  "tipoCategoria":[
    {
      "id": 4,
      "descripcion": "4ta"
    },
    {
      "id": 5,
      "descripcion": "5ta"
    }
  ],
  "lsconcepto":[
    {
      "iidConceptoPlanilla":1,
      "sdescripcion":"A",
      "cuentaHaberProvision":{
        "iidCuentaContable":3,
        "sdescripcion":"Caja de beneficios de seguridad social del pescador",
        "icodigoCuenta":125
      },
      "cuentaDebeProvision":{
        "iidCuentaContable":2,
        "sdescripcion":"Seguros particulares de prestaciones de salud – EPS y otros particulares",
        "icodigoCuenta":124
      },
      "cuentaHaberPago":{
        "iidCuentaContable":1,
        "sdescripcion":"Seguro complementario de trabajo de riesgo, accidentes de trabajo y enfermedades profesionales",
        "icodigoCuenta":123
      },
      "cuentaDebePago":{
        "iidCuentaContable":3,
        "sdescripcion":"Caja de beneficios de seguridad social del pescador",
        "icodigoCuenta":125
      }
    },
    {
      "iidConceptoPlanilla":2,
      "sdescripcion":"B",
      "cuentaHaberProvision":{
        "iidCuentaContable":3,
        "sdescripcion":"Caja de beneficios de seguridad social del pescador",
        "icodigoCuenta":125
      },
      "cuentaDebeProvision":{
        "iidCuentaContable":2,
        "sdescripcion":"Seguros particulares de prestaciones de salud – EPS y otros particulares",
        "icodigoCuenta":124
      },
      "cuentaHaberPago":{
        "iidCuentaContable":1,
        "sdescripcion":"Seguro complementario de trabajo de riesgo, accidentes de trabajo y enfermedades profesionales",
        "icodigoCuenta":123
      },
      "cuentaDebePago":{
        "iidCuentaContable":3,
        "sdescripcion":"Caja de beneficios de seguridad social del pescador",
        "icodigoCuenta":125
      }
    }
  ],

  "unidadDeTiempo":[
    {
      "unidad_tiempo": "A",
      "descripcion": "Años"
    },
    {
      "unidad_tiempo": "M",
      "descripcion": "Meses"
    }
  ],


  /* "SOLICITUDREVISION": [
    {
      "iestado":2,
      "abrev":"R"
    }

  ], */

}
export default Constantes;
