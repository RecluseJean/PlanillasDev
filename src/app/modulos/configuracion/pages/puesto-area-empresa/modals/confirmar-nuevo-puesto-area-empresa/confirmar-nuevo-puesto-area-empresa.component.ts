import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaDepartamentoEmpresa } from '../../../../../../models/AreaDepartamentoEmpresa';
import { PuestoAreaEmpresaService } from '../../../../services/puesto-area-empresa/puesto-area-empresa.service';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { PuestoAreaEmpresa } from '../../../../../../models/PuestoAreaEmpresa';
import { ProyeccionPuesto } from '../../../../../../models/ProyeccionPuesto';

@Component({
  selector: 'app-confirmar-nuevo-puesto-area-empresa',
  templateUrl: './confirmar-nuevo-puesto-area-empresa.component.html',
  styles: []
})
export class ConfirmarNuevoPuestoAreaEmpresaComponent implements OnInit {

  @Input() input_puestoDto;

  constructor(
    public activemodal: NgbActiveModal,
    private PuestoAreaEmpresaService: PuestoAreaEmpresaService,
    public router: Router
  ) { }

  puestoDto:any;

  ngOnInit() {
      this.puestoDto = this.input_puestoDto;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }


  crud() {
    switch (this.puestoDto.accion) {
      case Constantes.ACTUALIZAR: this.actualizarPuestoAreaEmp();
        break;
      case Constantes.REGISTRAR: this.registrarPuestoAreaEmp();
        break;
      default: this.eliminarPuestoAreaEmp();
    }
  }

  eliminarPuestoAreaEmp() {debugger
    //this.puestoDto = proyeccion
    this.PuestoAreaEmpresaService.eliminarProyeccion(this.puestoDto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })
    Swal.fire(Constantes.ERROR_FK_PA)
  }

  actualizarPuestoAreaEmp() {
    this.PuestoAreaEmpresaService.actualizarPuestoAreaEmp(this.puestoDto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public registrarPuestoAreaEmp() {
    this.PuestoAreaEmpresaService.insertarPuestoAreaEmp(this.puestoDto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
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
}
