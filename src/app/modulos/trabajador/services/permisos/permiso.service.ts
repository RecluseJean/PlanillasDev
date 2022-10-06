import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { catchError } from 'rxjs/operators';
import Swal from "sweetalert2";
import Constantes from '../../../../models/Constantes';
import { Observable } from 'rxjs';

@Injectable()
export class PermisoService {
  listaErrores: String[] = [];
  constructor(
    public http: HttpClient
  ) { }

  listarPermisosPorTrabajador(trab, ano, mes) {
    var tmp: any = {
      'trabajador': trab,
      'pdoAno': ano,
      'pdoMes': mes,
      'fechaIni': new Date(),
      'tipoPermiso': {}
    }
    return this.http.post(URL_SERVICIOSBACK + 'permiso/listarXTrabajador', tmp);
  }

  registrarPermiso(permiso) {
    return this.http.post(URL_SERVICIOSBACK + 'permiso/registrar', permiso).pipe(
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

  actualizarPermiso(permiso) {
    return this.http.put(URL_SERVICIOSBACK + 'permiso/modificar', permiso);
  }

  buscarFecha(permiso) {
    return this.http.post(URL_SERVICIOSBACK + 'permiso/buscarFecha', permiso);
  }

  eliminarPermiso(id) {
    return this.http.delete(URL_SERVICIOSBACK + 'permiso/' + id);
  }

  subirArchivo(archivo: File, id: number) {
    let formData = new FormData();
    formData.append("archivo", archivo);
    return this.http.post(URL_SERVICIOSBACK + "permiso/subirArchivo/" + id, formData);
  }

  decargarArchivo(nombreArchivo: string) {
    return this.http.get(URL_SERVICIOSBACK + "permiso/descargarArchivo/" + nombreArchivo, {
      responseType: "arraybuffer"
    });
  }

}
