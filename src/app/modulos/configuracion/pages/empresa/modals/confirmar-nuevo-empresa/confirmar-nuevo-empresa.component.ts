import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../../../models/Empresa';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { Parametros } from '../../../../../../models/parametros.models';

@Component({
  selector: 'app-confirmar-nuevo-empresa',
  templateUrl: './confirmar-nuevo-empresa.component.html',
  styles: []
})
export class ConfirmarNuevoEmpresaComponent implements OnInit {

  @Input() input_empresa;
  @Input() input_logo;

  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService,
    public router: Router,
  ) { }

  public empresa: any;
  public tipoEmpresa: any;
  public regTributario: number = null;
  public objTipoEmpresa: any = null;
  public objRegTributario: any = null;

  ngOnInit() {
    this.empresa = this.input_empresa;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.empresa.empresa.accion) {
      case Constantes.ACTUALIZAR: this.actualizarEmpresa();
        break;
      case Constantes.ELIMINAR: this.eliminarEmpresa();
        break;
      default: this.registrarEmpresa();
    }
  }

  registrarEmpresa() {
    // if(this.tipoEmpresa!=null){this.objTipoEmpresa={"idTipoEmp": this.tipoEmpresa}}
    // if(this.regTributario!=null){this.objRegTributario={"idRegTrib":this.regTributario}};
    // var tmp_emp={
    //   "empresa": this.empresa,
    //   "tipoEmpresa": this.objTipoEmpresa,
    //   "regTributario": this.objRegTributario
    // }
    this.empresaService.registrarEmpresa(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        if (this.input_logo != null) {
          this.empresaService.subirLogo(this.input_logo, resp.defaultObj.idEmpresa).subscribe((result: any) => {
            if (result.estado == 1) {
              Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
              this.refrescar(this.router.url);
            }
          })
        } else {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
          this.refrescar(this.router.url);
        }
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  actualizarEmpresa() {

    // if(this.tipoEmpresa!=null){this.objTipoEmpresa={"idTipoEmp": this.tipoEmpresa}};
    // if(this.regTributario!=null){this.objRegTributario={"idRegTrib":this.regTributario}};
    // var tmp_emp={
    //   "empresa": this.empresa,
    //   "tipoEmpresa": this.objTipoEmpresa,
    //   "regTributario": this.objRegTributario
    // }
    this.empresaService.actualizarEmpresa(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        if (this.input_logo != null) {
          this.empresaService.subirLogo(this.input_logo, resp.defaultObj.idEmpresa).subscribe((result: any) => {
            if (result.estado == 1) {
              Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
              this.refrescar(this.router.url);
            }
          })
        } else {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
          this.refrescar(this.router.url);
        }
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  eliminarEmpresa() {

    this.empresaService.eliminarEmpresa(this.empresa.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url)
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
