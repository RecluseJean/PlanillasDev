import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import Constantes from '../../../../models/Constantes';
import { throws } from "assert";
import { Observable } from 'rxjs';

@Injectable()
export class FaltaService {
  listaErrores: String[] = [];
  constructor(
    public http: HttpClient
  ) { }

  listarFaltasPorTrabajador(trab, ano, mes) {
    var tmp: any = {
      "fecha": new Date(),
      "justificado": 0,
      'trabajador': trab,
      'pdoAno': ano,
      'pdoMes': mes
    }
    return this.http.post(URL_SERVICIOSBACK + 'falta/listarXTrabajador', tmp);
  }

  registrarFalta(falta) {
    return this.http.post(URL_SERVICIOSBACK + 'falta/registrar', falta).pipe(
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

  actualizarFalta(falta) {
    return this.http.put(URL_SERVICIOSBACK + 'falta/modificar', falta);
  }

  buscarFecha(falta) {
    return this.http.post(URL_SERVICIOSBACK + 'falta/buscarFecha', falta);
  }

  eliminarFalta(id) {
    return this.http.delete(URL_SERVICIOSBACK + 'falta/' + id);
  }

  subirArchivo(archivo: File, id: number) {
    let formData = new FormData();
    formData.append("archivo", archivo);
    return this.http.post(URL_SERVICIOSBACK + "falta/subirArchivo/" + id, formData);
  }

  decargarArchivo(nombreArchivo: string) {
    return this.http.get(URL_SERVICIOSBACK + "falta/descargarArchivo/" + nombreArchivo, {
      responseType: "arraybuffer"
    });
  }

}
