import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoEmpresa } from '../../../../../../models/DepartamentoEmpresa';
import { Empresa } from '../../../../../../models/Empresa';
import { DepartamentoEmpresaService } from '../../../../services/departamentoEmpresa/departamento-empresa.service';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Trabajador } from '../../../../../../models/Trabajador';

@Component({
  selector: 'app-confirmar-nuevo-departamento-empresa',
  templateUrl: './confirmar-nuevo-departamento-empresa.component.html',
  styles: []
})
export class ConfirmarNuevoDepartamentoEmpresaComponent implements OnInit {

  @Input() input_departamentoEmpresa;
  @Input() input_trabajador;

  departamentoEmpresa: any = new DepartamentoEmpresa();
  trabajador: Trabajador = new Trabajador();
  empresa : Empresa = new Empresa();

  constructor(
    public activemodal: NgbActiveModal,
    private departamentoEmpresaService: DepartamentoEmpresaService,
    public router: Router
    ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.departamentoEmpresa = this.input_departamentoEmpresa;
    this.trabajador = this.input_trabajador;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }


  crud() {
    switch (this.departamentoEmpresa.accion) {
      case Constantes.ACTUALIZAR: this.actualizarDepEmp();
        break;
      case Constantes.ELIMINAR: this.eliminarDepEmp();
        break;
      default: this.registrarDepEmp();
    }
  }

  eliminarDepEmp() {
    this.departamentoEmpresaService.eliminarDepEmp(this.departamentoEmpresa).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })

  }

  actualizarDepEmp() {
    if (this.trabajador.idTrabajador == null) {
      this.departamentoEmpresa.gerente = null;
    } else{
      this.departamentoEmpresa.gerente = this.trabajador;
    }
    this.departamentoEmpresaService.actualizarDepEmp(this.departamentoEmpresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public registrarDepEmp() {
    var tmp_depEmp = {
      "trabajador": this.trabajador.idTrabajador==null?null:this.trabajador,
      "departamentoEmpresa": this.departamentoEmpresa,
      "empresa": this.empresa
    }
    this.departamentoEmpresaService.insertarDepEmp(tmp_depEmp).subscribe((resp: any) => {
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

