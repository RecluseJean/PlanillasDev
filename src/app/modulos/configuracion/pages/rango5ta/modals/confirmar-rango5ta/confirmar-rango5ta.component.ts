import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rango5ta } from '../../../../../../models/rango5ta';
import { Empresa } from '../../../../../../models/Empresa';
import { Router } from '@angular/router';
import { Rango5taService } from '../../../../services/rango5ta/rango5ta.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-rango5ta',
  templateUrl: './confirmar-rango5ta.component.html',
  styles: []
})
export class ConfirmarRango5taComponent implements OnInit {

  @Input() input_rango5ta;


  rango5ta : any = new Rango5ta();
  empresa : Empresa = new Empresa();

  constructor(
    public activemodal: NgbActiveModal,
    private rango5taService: Rango5taService,
    public router: Router
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.rango5ta = this.input_rango5ta;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  crud() {
    switch (this.rango5ta.accion) {
      case Constantes.ACTUALIZAR: this.actualizarDepEmp();
        break;
/*       case Constantes.ELIMINAR: this.eliminarRango5ta();
        break;
      default: this.registrarDepEmp(); */ 
    }
  }

  actualizarDepEmp() {
    var tmp_rango5ta = {
      "rango5ta": this.rango5ta,
      "empresa": this.empresa

    }
    this.rango5taService.actualizarRango5ta(tmp_rango5ta).subscribe((resp: any) => {
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

  eliminarRango5ta() {
    this.rango5taService.eliminarRango5ta(this.rango5ta).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })

  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
