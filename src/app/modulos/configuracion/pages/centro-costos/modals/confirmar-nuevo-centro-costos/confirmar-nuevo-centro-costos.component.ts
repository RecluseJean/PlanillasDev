import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { CentroCostosService } from '../../../../services/centro-costos/centro-costos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CentroCostos } from '../../../../../../models/centro-costos';
import { Empresa } from '../../../../../../models/Empresa';

@Component({
  selector: 'app-confirmar-nuevo-centro-costos',
  templateUrl: './confirmar-nuevo-centro-costos.component.html',
  styles: []
})
export class ConfirmarNuevoCentroCostosComponent implements OnInit {

  @Input() input_centro_costos;

  constructor(
    public activemodal : NgbActiveModal,
    public centroCostosService: CentroCostosService,
    public router: Router,
    ) { }

  public centroCostos: any = new CentroCostos();
  empresa: Empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

  ngOnInit() {
    this.centroCostos = this.input_centro_costos;
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  crud(){
    switch(this.centroCostos.accion){
      case Constantes.ACTUALIZAR :  this.actualizarCenCostos();
      break;
      case Constantes.ELIMINAR : this.eliminarCenCostos();
      break;
      default : this.registrarCenCostos();
    }
  }
  registrarCenCostos() {
    var tmp_cat = {
      "centroCosto": {
        "descripcion" : this.centroCostos.descripcion
      },
	      "empresa": {
        "idEmpresa" : this.empresa.idEmpresa
      }
    }
    this.centroCostosService.insertarCentroCostos(tmp_cat).subscribe((resp:any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.refrescar(this.router.url);
      } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
      },
      (err) =>{
        Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
    this.activemodal.dismiss();
  }

  eliminarCenCostos() {
    this.centroCostosService.nulearCentroCostos(this.centroCostos).subscribe((respuesta: any) => {
      if (respuesta) {
        this.centroCostosService.eliminarCentroCostos(this.centroCostos).subscribe((resp:any) =>{
          if(resp.estado==1){
            Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
            this.refrescar(this.router.url);
          }else{
            Swal.fire(Constantes.ERROR,resp.msg , 'error');
          }
          this.activemodal.dismiss();
        })
      } else {
        Swal.fire(Constantes.ERROR, "Error al eliminar centro de costo" , 'error');
      }
    })


  }

  actualizarCenCostos() {
    // var tmp_cat = {
    //   "centroCosto": this.centroCostos,
    //   "empresa": this.empresa
    // }
    this.centroCostosService.actualizarCentroCostos(this.centroCostos).subscribe((resp:any) =>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.refrescar(this.router.url);
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
        },
        (err) =>{
          Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
      this.activemodal.dismiss();
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

}
