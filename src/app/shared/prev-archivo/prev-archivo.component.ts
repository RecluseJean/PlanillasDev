import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../models/Constantes';
import { DerechoHabiente } from '../../models/Derecho-Habiente';
import { TrabajadorService } from '../../modulos/trabajador/services/trabajador/trabajador.service';
import Swal from 'sweetalert2';
import { AdelantoSueldo } from '../../models/Adelanto-Sueldo';
import { PlanillasService } from '../../modulos/planillas/services/planillas/planillas.service';
import { Prestamo } from '../../models/Prestamo';
import { Contrato } from '../../models/Contrato';

@Component({
  selector: 'app-prev-archivo',
  templateUrl: './prev-archivo.component.html',
  styles: []
})

export class PrevArchivoComponent implements OnInit {

  @Input() input_derHab;
  @Input() input_obj;
  @Input() input_adeSue;
  @Input() input_contrato;
  

  constructor(    
    private modalService: NgbModal,
    public activemodal: NgbActiveModal,
    private trabajadorService: TrabajadorService,
    public planillasService: PlanillasService,
    public router: Router,
  ) { }

  nombreArchivo: any;
  public selecArch: any;
  derHab: DerechoHabiente = new DerechoHabiente();
  adeSue: AdelantoSueldo = new AdelantoSueldo();
  prest: Prestamo = new Prestamo();
  objContrato: any = null;
  contr : Contrato = new Contrato();

  resEstado: number;

  objArch: any;
  modalRef: NgbModalRef;

  ngOnInit() {
    this.derHab=this.input_derHab;
    this.adeSue=this.input_adeSue;
    this.objArch=this.input_obj;
    this.objContrato = this.input_contrato;
    //console.log('1',this.input_obj);
    //console.log('2',this.input_derHab);
  }

  subirArchivoDHRA(archivo, derchoHabiente) { //debugger
    this.selecArch = archivo.target.files[0];
    this.nombreArchivo = archivo.target.files[0].name;
    this.derHab = derchoHabiente;
  }

  subirArchivoAdeSue(archivo, adeSueldo) { //debugger
    this.selecArch = archivo.target.files[0];
    this.nombreArchivo = archivo.target.files[0].name;
    this.adeSue = adeSueldo;
  }

  subirArchivoPrest(archivo, prestamo) { //debugger
    this.selecArch = archivo.target.files[0];
    this.nombreArchivo = archivo.target.files[0].name;
    this.prest = prestamo;
  }

  subirArchivoContr(archivo, contrato) { //debugger
    this.selecArch = archivo.target.files[0];
    this.nombreArchivo = archivo.target.files[0].name;
    this.contr = contrato;
  }

  elegir(archivo){ //debugger
    switch(this.objArch.accion){
      case 'DHRA': this.subirArchivoDHRA(archivo,this.derHab); break;
      case 'ASUE': this.subirArchivoAdeSue(archivo,this.adeSue); break;
      case 'PREST': this.subirArchivoPrest(archivo,this.objArch); break;
      case 'CONTR': this.subirArchivoContr(archivo,this.objArch); break;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmar(){ //debugger
    switch(this.objArch.accion){
      case 'DHRA' : this.cargarArchivoDRHA(this.derHab); break;
      case 'ASUE' : this.cargarArchivoAdeSue(this.adeSue); break;
      case 'CONTR' : this.cargarContrato(); break;
    }
  }

  cargarArchivoDRHA(derchoHabiente) { //debugger
    const idDH = derchoHabiente.idDerechoHabiente;
    this.trabajadorService.subirArchivo(this.selecArch, idDH).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.activemodal.dismiss();
        //this.listarDereHabActivo();
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    })
  }

  cargarArchivoAdeSue(adeSueadeSueldo){ //debugger
    const idAdeSueldo=adeSueadeSueldo.idAdelantoSueldo
    this.planillasService.subirArchivoAdelantoSueldo(this.selecArch,idAdeSueldo).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.dismiss();
        //this.listarAdeSue();
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
    })
  }

  cargarContrato(){
    const idTrab=this.objContrato.trabajador.idTrabajador
    this.trabajadorService.subirContrato(this.selecArch, idTrab).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.resEstado = 1;
        } else if(resp.estado == 2){
          Swal.fire(Constantes.WARNING,resp.msg,'warning');
          this.resEstado = 2;
        } else {
          Swal.fire(Constantes.ERROR,resp.msg,'error');
          this.resEstado = 3;
        }
    });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  

}
