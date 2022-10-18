import { Component, OnInit, Input } from '@angular/core';
import Constantes from '../../../../../../models/Constantes';
import { Falta } from '../../../../../../models/Falta';

import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { DatePipe } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-falta',
  templateUrl: './nueva-falta.component.html',
  styles: []
})
export class NuevaFaltaComponent implements OnInit {

  falta: Falta = new Falta();
  lsJustificado: any = Constantes.JUSTIFICADO; 7
  @Input() input_trabajador;
  @Input() input_falta;

  public minDate: Date
  public maxDate: Date
  trabajador: any;
  pdoAno: Año = new Año();
  pdoMes: Mes = new Mes();
  pipe = new DatePipe('es-PE');
  existe: number;
  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public faltaService: FaltaService
  ) { }

  nombreArchivo: any;
  public selecArch: any;

  ngOnInit() {
    this.pdoAno = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.pdoMes = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.trabajador = this.input_trabajador;
    if (this.input_falta != null) {
      this.falta = this.input_falta;
      this.trabajador = this.input_falta.trabajador;
      if (this.falta.nombreArchivo != null) {
        this.selecArch = "CONTIENE ARCHIVO";
        this.nombreArchivo = this.falta.nombreArchivo;
      }
    } else {
      this.falta.fecha = new Date();
    }
    var fecha1 = `${this.pdoMes.idPdoMes}/1/${this.pdoAno.descripcion}`;
    var fecha2 = `/${this.pdoMes.idPdoMes}/${this.pdoMes.cantidadDias}/${this.pdoAno.descripcion}`;
    this.minDate = new Date(fecha1)
    this.maxDate = new Date(fecha2)
  }

  subirArchivo(event) { //debugger
    this.selecArch = event.target.files[0];
    this.nombreArchivo = event.target.files[0].name;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  crud() {

    if (this.input_falta != null) {
      this.actualizarFalta();
    } else {
      if (this.input_trabajador.accion == Constantes.REGISTRAR) {
        this.buscarFechaSiExiste();
      }
    }
  }

  actualizarFalta() { //debugger
    var tmp = this.asignarObjetos();
    this.faltaService.actualizarFalta(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.selecArch != null) {
          this.faltaService.subirArchivo(this.selecArch, resp.defaultObj.idFalta).subscribe(() => {
            Swal.fire(Constantes.SUCCESS, resp.msg, 'success')
            this.activemodal.close();
          })
        } else {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success')
          this.activemodal.close();
        }
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
        this.activemodal.dismiss();
      }
    })
  }

  registrarFalta(tmp) { //debugger
    this.faltaService.registrarFalta(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.selecArch != null) {
          this.faltaService.subirArchivo(this.selecArch, resp.defaultObj.idFalta).subscribe(() => {
            Swal.fire(Constantes.SUCCESS, resp.msg, 'success')
            this.activemodal.close();
          })
        } else {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success')
          this.activemodal.close();
        }
      } else if (resp.estado == 7) {
        Swal.fire(Constantes.INFO, resp.msg, 'info')
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
        this.activemodal.dismiss();
      }
    },
      (err) => {
        this.activemodal.dismiss('error')
      })
  }

  buscarFechaSiExiste() {
    var tmp = this.asignarObjetos();
    this.faltaService.buscarFecha(tmp).subscribe((resp: any) => {
      switch (resp.defaultObj) {
        case 0: Swal.fire(Constantes.INFO, 'Esta fecha esta registrada como asistencia para este trabajador', 'info'); this.existe = 0; break;
        case 1: Swal.fire(Constantes.INFO, 'Ya ha sido registrada una falta en esta fecha para este trabajador', 'info'); this.existe = 1; break;
        case 2: this.registrarFalta(tmp); this.existe = 2; break;
      }
    })
  }

  asignarObjetos(): any {
    var tmp = {
      "idFalta": this.falta.idFalta,
      "fecha": this.falta.fecha,
      "nombreArchivo": this.falta.nombreArchivo,
      "justificado": this.falta.justificado,
      "pdoAno": this.pdoAno,
      "pdoMes": this.pdoMes,
      "trabajador": this.trabajador
    }
    return tmp;
  }


}
