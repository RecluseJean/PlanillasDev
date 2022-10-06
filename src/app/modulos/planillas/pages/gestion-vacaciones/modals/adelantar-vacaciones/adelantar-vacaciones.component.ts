import { Component, OnInit, Input } from '@angular/core';
import Constantes from '../../../../../../models/Constantes';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VacacionesService } from '../../../../services/vacaciones/vacaciones.service';
import { element } from 'protractor';
import { ConfirmarVacacionComponent } from '../confirmar-vacacion/confirmar-vacacion.component';

@Component({
  selector: 'app-adelantar-vacaciones',
  templateUrl: './adelantar-vacaciones.component.html',
  styles:[]
})
export class AdelantarVacacionesComponent implements OnInit {

  @Input() input_contrato;
  maxAdelanto: number;
  diasAdelantados: number;
  objContrato: any;
  fechaIni: Date;
  fechaFin: Date;
  tipo:number;
  estado: number;
  objVacaAde: any;


  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public serviceVacaciones: VacacionesService,
    public modalService : NgbModal
  ) { }

  ngOnInit() {
    this.maxAdelanto = Constantes.MAXADELANTO;
    this.objContrato = this.input_contrato;
    this.diasAdelantados = 15;
  }


  close() {
    this.activemodal.dismiss('Cancelado');
  }

  aumentar() {
    this.diasAdelantados = this.diasAdelantados + 1;
    this.calcularFin();
  }

  disminuir() {
    this.diasAdelantados = this.diasAdelantados - 1;
    this.calcularFin();
  }

  calcularFin(){
    const tmp = {
      "fechaIni": this.fechaIni,
      "dias": this.diasAdelantados
    }
    if(this.fechaIni != null){
      this.serviceVacaciones.calcularFechFin(tmp).subscribe((resp:any)=>{
        if(resp.estado==1){
          this.fechaFin = resp.defaultObj;
        }
      })
    }
  }

  asignarObjetos(){
    const tmp = {
      "vacaTomadas":{
        "fechaIni":this.fechaIni,
        "fechaFin":this.fechaFin
      },
      "contrato":this.objContrato
    }

    this.objVacaAde = Object.assign({},tmp);
    this.objVacaAde.accion = "VA";
  }

  confirmarAdeVaca(){
    this.asignarObjetos();
    const modalRef = this.modalService.open(ConfirmarVacacionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_vaca = this.objVacaAde;
    modalRef.componentInstance.input_dias_adelanto = this.diasAdelantados;
    modalRef.result.then((result) => {
      this.activemodal.close();
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }


}
