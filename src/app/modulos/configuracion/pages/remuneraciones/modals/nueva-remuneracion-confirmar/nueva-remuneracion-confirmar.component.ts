import { Component, OnInit, Input } from '@angular/core';
import { Remuneracion } from '../../../../../../models/Remuneracion';
import { RemuneracionesService } from '../../../../services/remuneraciones/remuneraciones.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../../../models/Empresa';

@Component({
  selector: 'app-nueva-remuneracion-confirmar',
  templateUrl: './nueva-remuneracion-confirmar.component.html',
  styles: []
})
export class NuevaRemuneracionConfirmarComponent implements OnInit {

  @Input() input_rem;

  remuneracion: any = new Remuneracion();
  empresa: Empresa = new Empresa();

  constructor(
    private remuneracionService: RemuneracionesService,
    public activemodal: NgbActiveModal,
    public router: Router,
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.remuneracion = this.input_rem;
  }

  crud() {

    if (this.remuneracion.accion == "U") {
      this.modificar();
    } else if (this.remuneracion.accion == "D") {
      this.darBaja();
    } else if(this.remuneracion.accion == "A") {
      this.activar();
    } else{
      this.registrar();
    }
  }

  registrar() {
    var tmp = {
      "empresa": this.empresa,
      "remuneraciones": this.remuneracion
    }
    this.remuneracionService.registrar(tmp).subscribe((resp: any) => {
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
    this.remuneracionService.modificar(this.remuneracion).subscribe((resp: any) => {
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

  darBaja(){
    this.remuneracionService.darBaja(this.remuneracion).subscribe((resp:any)=>{
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

  activar(){
    this.remuneracionService.activar(this.remuneracion).subscribe((resp:any)=>{
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
    this.activemodal.dismiss('Cancelado');
  }

}
