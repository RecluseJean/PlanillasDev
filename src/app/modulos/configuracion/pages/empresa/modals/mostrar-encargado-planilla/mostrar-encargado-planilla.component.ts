import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { Empresa } from '../../../../../../models/Empresa';
import { NuevoEncargadoPlanillaComponent } from '../nuevo-encargado-planilla/nuevo-encargado-planilla.component';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarEncargadoPlanillaComponent } from '../confirmar-encargado-planilla/confirmar-encargado-planilla.component';
import { LIMIT } from '../../../../../../config/config';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-mostrar-encargado-planilla',
  templateUrl: './mostrar-encargado-planilla.component.html',
  styles: []
})
export class MostrarEncargadoPlanillaComponent implements OnInit, OnDestroy {

  @Input() input_empresa;

  empresa: Empresa = new Empresa();
  lsEncarPlan: any[] = [];
  lsEncarPlanInac: any[] = [];
  modalRef:NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService,
    private modalService: NgbModal,
  ) { }

  displayedColumns: string[] = [
    'datos_perso',
    'dni',
    'baja'
  ];

  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;

  ngOnInit() {
    this.empresa = this.input_empresa;
    this.listarEncargadoPlan();
    this.listarEncargadoPlanInac();
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
        this.modalRef.close();
    }
  }

  listarEncargadoPlan(){
    this.empresaService.listarEncargadoPlan(this.empresa).subscribe((resp:any)=>{
        this.lsEncarPlan = resp.aaData;
    })
  }

  listarEncargadoPlanInac(){
    this.empresaService.listarEncargadoPlanInac(this.empresa).subscribe((resp:any)=>{
        this.lsEncarPlanInac = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  registrarEncargadoPlan(){
    var empresa_tmp=Object.assign({},this.empresa);
    empresa_tmp.accion=Constantes.REGISTRAR;
    this.openModal(empresa_tmp);
  }

  darBaja(encarPlan){
    var tmp=Object.assign({},encarPlan);
    tmp.accion=Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  activar(encarPlan){
    var tmp=Object.assign({},encarPlan);
    tmp.accion="A";
    this.openModal(tmp);
  }

  openModal(indice) {
    if(indice.accion == "R"){
      this.modalRef = this.modalService.open(NuevoEncargadoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-sm'
        }
      );
      this.modalRef.componentInstance.input_empresa=this.empresa;
      this.modalRef.result.then((result) => {
     }, (reason) => {
       if(reason!="Cancelado"){
         this.activemodal.dismiss("accion")
       }
     });
    } else {
      this.modalRef = this.modalService.open(ConfirmarEncargadoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-sm'
        }
      );
      this.modalRef.componentInstance.input_encarPlan=indice;
      this.modalRef.result.then((result) => {
     }, (reason) => {
       if(reason=="accion"){
         this.activemodal.dismiss("accion")
       }
     });
    }
  }
}
