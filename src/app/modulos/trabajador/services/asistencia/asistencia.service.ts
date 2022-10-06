import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import Constantes from '../../../../models/Constantes';
import { Observable } from 'rxjs';
import { Empresa } from '../../../../models/Empresa';

@Injectable()
export class AsistenciaService {
  listaErrores: String[] = [];
  constructor(
    public http: HttpClient
  ) { }

  listarAsistenciasPorTrabajador(trab, ano, mes) {
    var tmp: any = {
      'fecha': new Date(),
      'trabajador': trab,
      'pdoAno': ano,
      'pdoMes': mes
    }
    return this.http.post(URL_SERVICIOSBACK + 'asistencia/listarXTrabajadorAnoMes', tmp);
  }

  registrarAsistencia(asistencia) {
    return this.http.post(URL_SERVICIOSBACK + 'asistencia/registrar', asistencia).pipe(
      catchError(e => {
        if (e.status == 400) {
          this.listaErrores = e.error.errores as String[];
          var errores = "";
          this.listaErrores.forEach((value) => {
            errores = errores + value
          })
          Swal.fire(Constantes.ERROR, errores, 'error');
          return Observable.throw(e);
        }
        Swal.fire(Constantes.ERROR, e.error.error, 'error')
        return Observable.throw(e);
      })
    );
  }

  actualizarAsistencia(asistencia) {
    return this.http.put(URL_SERVICIOSBACK + 'asistencia/modificar', asistencia);
  }

  buscarFecha(asistencia) {
    return this.http.post(URL_SERVICIOSBACK + 'asistencia/buscarFecha', asistencia);
  }

  eliminarAsistencia(id) {
    return this.http.delete(URL_SERVICIOSBACK + 'asistencia/' + id);
  }

  cargaMasivaAsistencia(asistencia: File, empresa: Empresa) {
    let formData = new FormData();
    formData.append("file", asistencia);
    return this.http.post(URL_SERVICIOSBACK + "asistencia/cargarAsistencia/" + empresa.idEmpresa, formData);
  }

}
