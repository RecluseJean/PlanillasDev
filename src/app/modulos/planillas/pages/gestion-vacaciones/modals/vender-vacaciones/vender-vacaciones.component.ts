import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VacacionesService } from '../../../../services/vacaciones/vacaciones.service';
import { ConfirmarVacacionComponent } from '../confirmar-vacacion/confirmar-vacacion.component';

@Component({
  selector: 'app-vender-vacaciones',
  templateUrl: './vender-vacaciones.component.html',
  styles: []
})
export class VenderVacacionesComponent implements OnInit {

  @Input() input_vacacion;

  vacacion: any;
  diasVendidos: number;
  disponibles: number;
  objVacaVen: any;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public serviceVacaciones: VacacionesService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.vacacion = this.input_vacacion;
    this.diasVendidos = 15 - this.vacacion.diasTomados - this.vacacion.diasVendidos;
    this.disponibles = 15 - this.vacacion.diasTomados - this.vacacion.diasVendidos;

  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  aumentar() {
    this.diasVendidos = this.diasVendidos + 1;
  }

  disminuir() {
    this.diasVendidos = this.diasVendidos - 1;
  }

  asignarObjetos() {
    if(this.diasVendidos == this.disponibles){
      this.vacacion.estado = 0;
    }else{
      this.vacacion.estado = 2;
    }
    this.vacacion.diasVendidos = this.vacacion.diasVendidos + this.diasVendidos;

    const tmp = {
      "vacaciones": this.vacacion,
      "vacaVendidas":{
        "fechaVenta": new Date(),
        "cantDias": this.diasVendidos,
        "vacacion":{
          "idVacacion": this.vacacion.idVacacion
        }
      }    
    }

    this.objVacaVen = Object.assign({},tmp);
    this.objVacaVen.accion = "VV";
  }

  confirmarVentaVaca(){
    this.asignarObjetos();
    const modalRef = this.modalService.open(ConfirmarVacacionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_vaca = this.objVacaVen;
    modalRef.result.then((result) => {
      this.activemodal.close();
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

}
