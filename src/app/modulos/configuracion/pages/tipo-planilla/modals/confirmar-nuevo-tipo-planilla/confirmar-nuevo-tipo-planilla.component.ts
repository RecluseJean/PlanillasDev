import { Component, OnInit, Input } from '@angular/core';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import Constantes from '../../../../../../models/Constantes';
import { Empresa } from '../../../../../../models/Empresa';

@Component({
  selector: 'app-confirmar-nuevo-tipo-planilla',
  templateUrl: './confirmar-nuevo-tipo-planilla.component.html',
  styles: []
})
export class ConfirmarNuevoTipoPlanillaComponent implements OnInit {

  @Input() input_tipPlan;
  @Input() input_lsPerfiles;
  @Input() input_lsTipoPlanillaPerfil;
  @Input() input_lstrabAsig;
  @Input() input_lstrabQuit;
  @Input() input_empresaDTO;

  empresaDTO: any;
  lsPerfiles: any[] = [];
  lsTrabajadoresAsig: any[] = [];
  lsTrabajadoresQuit: any[] = [];
  tipoPlanilla: any = new TipoPlanilla();
  empresa: any = new Empresa();
  mostrarT = "";
  mostrarB = "";

  constructor(
    private tipoPlanillaService: TipoPlanillaService,
    public activemodal: NgbActiveModal,
    public router: Router,
  ) { }

  ngOnInit() {
    this.tipoPlanilla = this.input_tipPlan;
    this.lsPerfiles = this.input_lsPerfiles;
    this.lsTrabajadoresAsig = this.input_lstrabAsig;
    this.lsTrabajadoresQuit = this.input_lstrabQuit;
    this.empresaDTO = this.input_empresaDTO;
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.asignarNombres();
  }

  asignarNombres() {
    if (this.tipoPlanilla != null) {
      if (this.tipoPlanilla.accion == "U") {
        this.mostrarT = "Desea actualizar el tipo de planilla";
        this.mostrarB = "Actualizar";
      } else if (this.tipoPlanilla.accion == "D") {
        this.mostrarT = "Desea eliminar el tipo de planilla";
        this.mostrarB = "Eliminar";
      } else if (this.tipoPlanilla.accion == "A") {
        this.mostrarT = "Desea agregar los trabajadores";
        this.mostrarB = "Agregar";
      } else if (this.tipoPlanilla.accion == "Q") {
        this.mostrarT = "Desea quitar los trabajadores";
        this.mostrarB = "Quitar";
      } else {
        this.mostrarT = "Desea registrar el tipo de planilla";
        this.mostrarB = "Registrar";
      }
    } else {
      if (this.empresaDTO.accion == "AM") {
        this.mostrarT = "Desea generar excel de asistencia masiva";
      } else {
        this.mostrarT = "Desea generar excel de asistencia";
      }
      this.mostrarB = "Generar";
    }
  }

  crud() {
    if (this.tipoPlanilla != null) {
      if (this.tipoPlanilla.accion == "U") {
        this.modificar();
      } else if (this.tipoPlanilla.accion == "D") {
        this.eliminar();
      } else if (this.tipoPlanilla.accion == "A") {
        this.agregarTrabajador();
      } else if (this.tipoPlanilla.accion == "Q") {
        this.quitarTrabajador();
      } else {
        this.registrar();
      }
    }
    else {
      this.generarAsistencia();
    }
  }

  generarAsistencia(){
    this.tipoPlanillaService.generarAsistencia(this.empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.descargarAsistencia();
      } else{
        Swal.fire(Constantes.ERROR, "FALLO", 'error');
      }
      this.activemodal.dismiss();
    })
  }

  descargarAsistencia(){
    var nombreArchivo = "AttSetting.xls";
        this.tipoPlanillaService.descargarAsistencia(nombreArchivo).subscribe((resp: any) => {
          if (resp != null) {
            var file = new Blob([resp], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            saveAs(file, nombreArchivo);
            Swal.fire(Constantes.SUCCESS,"Archivo descargado correctamente",'success');
            } else {
              Swal.fire(Constantes.ERROR,"Error al descargar Archivo",'error');
            }
        })
  }

  agregarTrabajador() {
    var tmp = {
      "tipoPlanilla": this.tipoPlanilla,
      "lsTrabajador": this.lsTrabajadoresAsig
    }
    this.tipoPlanillaService.agregarTrabajador(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  quitarTrabajador() {
    for (let i = 0; i < this.lsTrabajadoresQuit.length; i++) {
      this.lsTrabajadoresQuit[i].tipoPlanilla = this.tipoPlanilla;
    }
    var tmp = {
      "lsTipoPlanillaDetalle": this.lsTrabajadoresQuit
    }
    this.tipoPlanillaService.quitarTrabajador(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  registrar() {
    var tmp = {
      "tipoPlanilla": this.tipoPlanilla,
      "empresa": this.empresa,
      "lsPerfil": this.lsPerfiles
    }

    this.tipoPlanillaService.registrar(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  modificar() {
    this.tipoPlanillaService.modificar(this.tipoPlanilla).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  eliminar() {
    this.tipoPlanillaService.eliminar(this.tipoPlanilla).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.close('Cancelado');
  }

}
