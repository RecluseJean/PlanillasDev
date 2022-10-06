import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaDepartamentoEmpresa } from '../../../../../../models/AreaDepartamentoEmpresa';
import { AreaDepartamentoEmpresaService } from '../../../../services/area-departamento-empresa/area-departamento-empresa.service';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { DepartamentoEmpresa } from '../../../../../../models/DepartamentoEmpresa';

@Component({
  selector: 'app-confirmar-nueva-area-departamento-empresa',
  templateUrl: './confirmar-nueva-area-departamento-empresa.component.html',
  styles: []
})
export class ConfirmarNuevaAreaDepartamentoEmpresaComponent implements OnInit {

  @Input() input_areaDepartamentoEmpresa;
  @Input() input_departamentoEmpresa;

  public areaDepartamentoEmpresa: any = new AreaDepartamentoEmpresa();
  departamentoEmpresa: DepartamentoEmpresa = new DepartamentoEmpresa();

  constructor(
    public activemodal: NgbActiveModal,
    private AreaDepartamentoEmpresaService: AreaDepartamentoEmpresaService,
    public router: Router
  ) { }

  ngOnInit() {
    this.areaDepartamentoEmpresa = this.input_areaDepartamentoEmpresa;
    this.departamentoEmpresa = this.input_departamentoEmpresa;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }


  crud() {
    switch (this.areaDepartamentoEmpresa.accion) {
      case Constantes.ACTUALIZAR: this.actualizarAreaDepEmp();
        break;
      case Constantes.ELIMINAR: this.eliminarAreaDepEmp();
        break;
      default: this.registrarAreaDepEmp();
    }
  }

  eliminarAreaDepEmp() {
    this.AreaDepartamentoEmpresaService.eliminarAreaDepEmp(this.areaDepartamentoEmpresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })

  }

  actualizarAreaDepEmp() {
    this.AreaDepartamentoEmpresaService.actualizarAreaDepEmp(this.areaDepartamentoEmpresa).subscribe((resp: any) => {
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

  public registrarAreaDepEmp() {
    var tmp_DepEmp = {
      "departamentoEmpresa": {
        "iidDepartamentoEmpresa": this.departamentoEmpresa.iidDepartamentoEmpresa
      },
      "areaDepartamentoEmpresa": {
        "snombre": this.areaDepartamentoEmpresa.snombre
      }
    }
    this.AreaDepartamentoEmpresaService.insertarAreaDepEmp(tmp_DepEmp).subscribe((resp: any) => {
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

