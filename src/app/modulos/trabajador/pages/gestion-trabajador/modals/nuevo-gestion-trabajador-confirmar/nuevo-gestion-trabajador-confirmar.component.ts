import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-gestion-trabajador-confirmar',
  templateUrl: './nuevo-gestion-trabajador-confirmar.component.html',
  styles: []
})
export class NuevoGestionTrabajadorConfirmarComponent implements OnInit {
  error: boolean = false;
  @Input() input_trabajador_final;

  constructor(
    public activemodal: NgbActiveModal,
    public trabajadorService: TrabajadorService,
    public router: Router
  ) { }

  public objtrabajador: any = null;
  public tipodoc: any;

  ngOnInit() {
    this.objtrabajador = this.input_trabajador_final;
  }

  crud() {
    switch (this.objtrabajador.accion) {
      case Constantes.ACTUALIZAR: this.actualizarTrabajador();
        break;
      case Constantes.ELIMINAR: this.eliminarTrabajador();
        break;
      default: this.registrarTrabajador();
    }
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  registrarTrabajador() {
    this.trabajadorService.insertarTrabajador(this.objtrabajador).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      }
    }, (err) => {
      Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      this.error = true
    }
    );
    this.activemodal.dismiss();
  }

  eliminarTrabajador() {
    this.trabajadorService.eliminarTrabajador(this.objtrabajador.trabajador.idTrabajador).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    }, (err) => {
      Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      this.error = true
    }
    );
    this.activemodal.dismiss();
  }

  actualizarTrabajador() {
    // var tmp_traba = {
    //   "tipoDoc": this.objtrabajador.tipoDoc,
    //   "pais": this.objtrabajador.trabajador.pais,
    //   "estadoCivil": this.objtrabajador.trabajador.estadoCivil,
    //   "departamento": this.objtrabajador.departamento,
    //   "provincia": this.objtrabajador.provincia,
    //   "distrito": this.objtrabajador.distrito,
    //   "tipoZona": this.objtrabajador.tipoZona,
    //   "nivelEdu": this.objtrabajador.nivelEdu,
    //   "ocupacion": this.objtrabajador.ocupacion,
    //   "empresa": this.objtrabajador.empresa,
    //   "afp": this.objtrabajador.afp,
    //   "epsRegSalud": this.objtrabajador.epsRegSalud,
    //   "epsSalud": this.objtrabajador.epsSalud,
    //   "epsPension": this.objtrabajador.epsPension,
    //   "regSalud": this.objtrabajador.regSalud,
    //   "situacion": this.objtrabajador.situacion,
    //   "regimenLaboral": this.objtrabajador.regimenLaboral,
    //   "tipoContrato": this.objtrabajador.tipoContrato,
    //   "centroCosto": this.objtrabajador.centroCosto,
    //   "areaDepEmp": this.objtrabajador.areaDepEmp,
    //   "puesto": this.objtrabajador.puesto,
    //   "tipoPago": this.objtrabajador.tipoPago,
    //   "bancoSueldo": this.objtrabajador.bancoSueldo,
    //   "bancoCts": this.objtrabajador.bancoCts,
    //   "sctrPension": this.objtrabajador.sctrPension,
    //   "sctrSalud": this.objtrabajador.sctrSalud,
    //   "horario": this.objtrabajador.horario,
    //   "trabajador": this.objtrabajador.trabajador,
    //   "contrato": this.objtrabajador.contrato
    // }

    this.trabajadorService.actualizarTrabajador(this.objtrabajador).subscribe(resp => {
      if (resp.estado == 1) {
        this.trabajadorService.setContrato(resp.defaultObj)
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        // this.router.navigateByUrl('gestiontrabajador')
        this.refrescar(this.router.url);
      }
    }, (err) => {
      Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      this.error = true
    });
    this.activemodal.dismiss(1);
  }
}
