import { of } from "rxjs";
of(this.purposes);
import ConstantesDatosPrueba from "../ConstantesMockito";

export class TipoPlanillaServiceStub{

  listar(estado){
    var  ResponseWrapperStub = {
      "estado":1,
      "aaData":[
        {"idTipoPlanilla":1},
        {"idTipoPlanilla":2},
        {"idTipoPlanilla":3},
      ]
    }
    ResponseWrapperStub.estado=estado;
    return of(ResponseWrapperStub);
  }

  registrar(estado){
    var  ResponseWrapperStub = {
      "estado":1
    }
    ResponseWrapperStub.estado=estado;
    return of(ResponseWrapperStub);
  }

  modificar(estado){
    var  ResponseWrapperStub = {
      "estado":1
    }
    ResponseWrapperStub.estado=estado;
    return of(ResponseWrapperStub);
  }

  listarPerfiles(){
    return of({
      "estado":1,
      "aaData":[
        {
          "idPerfil":1,
          "ambito":1
        },
        {
          "idPerfil":2,
          "ambito":1
        }
      ]
    });
  }

  listarPerfilesPorTipoPlanilla(planilla){
    var  ResponseWrapperStub = {
      "estado":1,
      "aaData":[
        {"idTipoPlanillaPerfil":1},
        {"idTipoPlanillaPerfil":2},
        {"idTipoPlanillaPerfil":3},
      ]
    }
    ResponseWrapperStub.estado=planilla.estado;
    return of(ResponseWrapperStub);
  }

  actualizarPerfiles(estado){
    var  ResponseWrapperStub = {
      "estado":1
    }
    if(estado==null){
      ResponseWrapperStub.estado = 0;
    }
    return of(ResponseWrapperStub);
  }

  eliminar(estado){
    var  ResponseWrapperStub = {
      "estado":1
    }
    ResponseWrapperStub.estado=estado;
    return of(ResponseWrapperStub);
  }

  listarTrabajadores(tipoPlanilla){
    return of();
  }
  listarTrabajadoresAsignados(tipoPlanilla){
    return of();
  }

  listarTrabajadoresPorTipoPlanilla(tipoPlanilla){
    var  ResponseWrapperStub = {
      "estado":1,
      "aaData":[
        ConstantesDatosPrueba.Trabajador1,
        ConstantesDatosPrueba.Trabajador2,
        ConstantesDatosPrueba.Trabajador3
      ]
    }
    return of(ResponseWrapperStub );
  }

  agregarTrabajador(tipPlanillaDTO){
    return of();
  }

  quitarTrabajador(tipPlanDTO){
     return of();
  }

  listarTipoPlanillaPorPerfil(perfil){
    var  ResponseWrapperStub = {
      "estado":1,
      "aaData":[
        {
          "idTipoPlanilla":1,
          "descripcion":"tipoplanilla1"
        },
        {
          "idTipoPlanilla":2,
          "descripcion":"tipoplanilla2"
        }
      ]
    }
    return of(ResponseWrapperStub);
  }

}
