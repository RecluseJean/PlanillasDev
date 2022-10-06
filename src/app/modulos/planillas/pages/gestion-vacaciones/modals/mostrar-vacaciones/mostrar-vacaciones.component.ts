import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VacacionesService } from '../../../../services/vacaciones/vacaciones.service';
import { ThrowStmt } from '@angular/compiler';
import { TomarVacacionesComponent } from '../tomar-vacaciones/tomar-vacaciones.component';
import { VenderVacacionesComponent } from '../vender-vacaciones/vender-vacaciones.component';

@Component({
  selector: 'app-mostrar-vacaciones',
  templateUrl: './mostrar-vacaciones.component.html',
  styles: []
})
export class MostrarVacacionesComponent implements OnInit {

  @Input() input_trabajador;

  objTrabajadorContrato: any;
  lsPeriodoVaca: any = [];

  constructor(
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router,
    public vacaService: VacacionesService
  ) { }

  ngOnInit() {
    this.objTrabajadorContrato = this.input_trabajador;
    this.listarPeriodos();
  }

  listarPeriodos() {
    this.vacaService.listarPorTrabajador(this.objTrabajadorContrato.trabajador).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPeriodoVaca = resp.aaData;
      }
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  nuevaAccion(vaca){
    const tmp = Object.assign({ accion:this.objTrabajadorContrato.accion}, vaca);
    this.openModal(tmp);
  }

  openModal(indice){
    switch(indice.accion){
      case 'T': { 
          const modalRef = this.modalService.open(TomarVacacionesComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'sm',
           
            })
          modalRef.componentInstance.input_vacacion = indice;
          modalRef.result.then((result) => {
            this.activemodal.close();
          }, (reason) => {
          });
      };break;
      case 'V': { 
        const modalRef = this.modalService.open(VenderVacacionesComponent,
          {
            backdrop: 'static',
            keyboard: false,
            size: 'sm',
         
          })
        modalRef.componentInstance.input_vacacion = indice;
        modalRef.result.then((result) => {
          this.activemodal.close();
        }, (reason) => {
        });
    };break;
    }
  }

}
