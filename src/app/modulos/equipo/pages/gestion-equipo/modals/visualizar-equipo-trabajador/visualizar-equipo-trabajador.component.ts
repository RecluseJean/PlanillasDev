import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EquipoService } from '../../../../services/equipo/equipo.service';
import { Equipo } from '../../../../../../models/Equipo';
import { Trabajador } from '../../../../../../models/Trabajador';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { EquipoTrabajadores } from '../../../../../../models/EquipoTrabajadores';
import { ConfirmarEquipoComponent } from '../nuevo-equipo/confirmar-equipo/confirmar-equipo.component';

@Component({
  selector: 'app-visualizar-equipo-trabajador',
  templateUrl: './visualizar-equipo-trabajador.component.html',
  styles: []
})
export class VisualizarEquipoTrabajadorComponent implements OnInit {

  @Input() input_equipo;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public equipoService: EquipoService
  ) { }

  modalRef: NgbModalRef;
  equipo:  any = new Equipo();
  trabajador: any = new Trabajador();
  equipoTrab: any = new EquipoTrabajadores();

  lsTrabajadorEquipo: any [] = [];
  objEquipo: any = null;

  ngOnInit() {//debugger
    this.listarTrabajadoresEquipo();
    this.equipo = this.input_equipo;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  /* eliminarTrabajadorEquipo(trabEqui){
    var tmp_trabEq=Object.assign({},trabEqui);
    tmp_trabEq.accion=Constantes.ELIMINAR;
    this.openModal(tmp_trabEq);
  } */

  eliminarTrabajadorEquipo(eqTrab) {
    //const idTrabEq = eqTrab.idEquipoTrabajadores;
    this.equipoTrab= eqTrab;
    this.equipoService.eliminarTrabajadorEquipo(this.equipoTrab).subscribe((resp:any) =>{

      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  public openModal(indice) {
    if (indice.accion=="D"){
      const modalRef = this.modalService.open(ConfirmarEquipoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        modalRef.componentInstance.input_centro_costos=indice;
        modalRef.result.then((result)=>{
        }, (reason) => {
        });
      }
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }


    listarTrabajadoresEquipo() { 
    const idEquip = this.equipo.idEquipo;
     var equipo = {
        "idEquipo" : this.equipo.idEquipo,
        "descripcion" : this.equipo.descripcion,
        "trabajador" : this.equipo.trabajador
    } 

    var tmp_equi = {

      "equipo": {
        "idEquipo": this.equipo.idEquipo
      }
    }
    this.equipoService.listarTrabajadorEquipo(tmp_equi).subscribe((resp: any) => {
    this.lsTrabajadorEquipo = resp.aaData;
    })
   }



}
