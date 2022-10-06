import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VacacionesService } from '../../../../services/vacaciones/vacaciones.service';
import { ConfirmarVacacionComponent } from '../confirmar-vacacion/confirmar-vacacion.component';

@Component({
  selector: 'app-tomar-vacaciones',
  templateUrl: './tomar-vacaciones.component.html',
  styles: []
})
export class TomarVacacionesComponent implements OnInit {

  @Input() input_vacacion;

  vacacion: any;
  diasTomados: number;
  auxTomado: number;
  fechaIni: Date;
  fechaFin: Date;
  objVacaTom: any;
  estado: number;



  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public serviceVacaciones: VacacionesService,
    public modalService : NgbModal
  ) { }

  ngOnInit() {
    this.vacacion = this.input_vacacion;
    this.diasTomados = 15 - this.vacacion.diasVendidos - this.vacacion.diasTomados;
    this.auxTomado = 15 - this.vacacion.diasVendidos - this.vacacion.diasTomados;
  }


  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  aumentar() {
    this.diasTomados = this.diasTomados + 1;
    this.calcularFin();
  }

  disminuir() {
    this.diasTomados = this.diasTomados - 1;
    this.calcularFin();
  }

  calcularFin(){
    const tmp = {
      "fechaIni": this.fechaIni,
      "dias": this.diasTomados
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
    if(this.fechaIni.getMonth() == this.fechaFin.getMonth()){
      this.estado = 0;
    }else{
      this.estado = 1;
    }

    if(this.diasTomados == this.auxTomado){
      this.vacacion.estado = 0;
    }else{
      this.vacacion.estado = 2;
    }
    this.vacacion.diasTomados = this.vacacion.diasTomados + this.diasTomados;

    const tmp = {
      "vacaciones": this.vacacion,
      "vacaTomadas":{
        "fechaIni":this.fechaIni,
        "fechaFin":this.fechaFin,
        "tipo": this.estado,
        "pdoVacacion":{
          "idVacacion": this.vacacion.idVacacion
        }
      }    
    }

    this.objVacaTom = Object.assign({},tmp);
    this.objVacaTom.accion = "VT";
  }

  confirmarTomaVaca(){
    this.asignarObjetos();
    const modalRef = this.modalService.open(ConfirmarVacacionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_vaca = this.objVacaTom;
    modalRef.result.then((result) => {
      this.activemodal.close();
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

}
