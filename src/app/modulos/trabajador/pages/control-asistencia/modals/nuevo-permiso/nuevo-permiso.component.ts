import { Component, OnInit, Input } from '@angular/core';
import { Permiso } from '../../../../../../models/Permiso';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import Constantes from '../../../../../../models/Constantes';
import { TiposPermisoService } from '../../../../../configuracion/services/permisos/permisos.service';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-permiso',
  templateUrl: './nuevo-permiso.component.html',
  styles: []
})
export class NuevoPermisoComponent implements OnInit {

  @Input() input_trabajador;
  @Input() input_permiso;

  permiso: Permiso = new Permiso();
  lsTipoPermiso: any = [];

  public minDate: Date
  public maxDate: Date
  trabajador: any;
  idTipoPermiso: number;
  tipoPermiso: any;
  pdoAno: Año = new Año();
  pdoMes: Mes = new Mes();
  pipe = new DatePipe('es-PE');

  nombreArchivo: any;
  public selecArch: any;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public permisoService: PermisoService,
    public tipoPermisoService: TiposPermisoService
  ) { }

  ngOnInit() {
    this.pdoAno = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.pdoMes = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.trabajador = this.input_trabajador;
    if (this.input_permiso != null) {
      this.permiso = this.input_permiso;
      this.trabajador = this.input_permiso.trabajador;
      if (this.permiso.nombreArchivo != null) {
        this.selecArch = "CONTIENE ARCHIVO";
        this.nombreArchivo = this.permiso.nombreArchivo;
      }
    } else {
      this.permiso.fechaIni = new Date();
    }
    this.listarTiposPermiso();
    var fecha1 = `${this.pdoMes.idPdoMes}/1/${this.pdoAno.descripcion}`;
    var fecha2 = `12/31/2029`;
    this.minDate = new Date(fecha1)
    this.maxDate = new Date(fecha2)
  }

  subirArchivo(event) {
    this.selecArch = event.target.files[0];
    this.nombreArchivo = event.target.files[0].name;
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  crud() {
    if (this.input_permiso != null) {
      this.actualizarPermiso();
    } else {
      if (this.input_trabajador.accion == Constantes.REGISTRAR) {
        this.buscarFechaSiExiste();
      }
    }
  }

  listarTiposPermiso() {
    this.tipoPermisoService.listarPermisosPorEmpresa(this.trabajador.empresa).subscribe((resp: any) => {
      this.lsTipoPermiso = resp.aaData;
      if (this.input_permiso != null) {
        this.idTipoPermiso = this.input_permiso.tipoPermiso.idTipoPermiso;
      }
    })
  }

  actualizarPermiso() {
    var tmp = this.asignarObjetos();
    this.permisoService.actualizarPermiso(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.selecArch != null) {
          this.permisoService.subirArchivo(this.selecArch, resp.defaultObj.idPermiso).subscribe(() => {
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

  registrarPermiso(tmp) {
    this.permisoService.registrarPermiso(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.selecArch != null) {
          this.permisoService.subirArchivo(this.selecArch, resp.defaultObj.idPermiso).subscribe(() => {
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
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      })
  }

  buscarFechaSiExiste() {
    var tmp = this.asignarObjetos();
    this.permisoService.buscarFecha(tmp).subscribe((resp: any) => {
      if (resp.defaultObj) {
        Swal.fire(Constantes.INFO, 'Ya ha sido registrada una permiso en esta fecha para este trabajador', 'info');
      } else {
        this.registrarPermiso(tmp);
      }
    })
  }

  llenarDropdown() {
    this.lsTipoPermiso.forEach(value => {
      if (value.idTipoPermiso == this.idTipoPermiso) {
        this.tipoPermiso = value;
      }
    })
  }

  asignarObjetos(): any { //debugger
    this.llenarDropdown();
    var tmp = {
      "idPermiso": this.permiso.idPermiso,
      "fechaIni": this.permiso.fechaIni,
      "nombreArchivo": this.permiso.nombreArchivo,
      "tipoPermiso": this.tipoPermiso,
      "pdoAno": this.pdoAno,
      "pdoMes": this.pdoMes,
      "trabajador": this.trabajador
    }
    return tmp;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
