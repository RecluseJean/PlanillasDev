import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { ConfirmarNuevoTipoPlanillaComponent } from '../confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';

@Component({
  selector: 'app-trabajadores-planilla',
  templateUrl: './trabajadores-planilla.component.html',
  styleUrls: []
})
export class TrabajadoresPlanillaComponent implements OnInit {

  @Input() input_tipPlan;

  modalRef: NgbModalRef;
  tipoPlanilla: any = new TipoPlanilla();
  lsTrabajadores: any[] = [];
  lsTrabajadoresAsig: any[] = [];
  lsTrabajadoresAsignados: any[] = [];
  lsTrabajadoresQuit: any[] = [];
  titulo: String = "";
  botonAct = true;

  desabilitarAgregar: boolean = true;
  desabilitarQuitar: boolean = true;

  pA:number = 1;
  pQ:number = 1;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private tipoPlanillaService: TipoPlanillaService
  ) { }

  ngOnInit() {
    this.tipoPlanilla = this.input_tipPlan;
    this.titulo = this.tipoPlanilla.descripcion;
    this.listarTrabajadoresAsignados();
    this.listarTrabajadores();
  }

  listarTrabajadores() {
    this.tipoPlanillaService.listarTrabajadores(this.tipoPlanilla).subscribe((resp: any) => {
      this.lsTrabajadores = resp.aaData;
      //console.log('trbbb', resp.aaData);
    })
  }

  listarTrabajadoresAsignados() {
    this.tipoPlanillaService.listarTrabajadoresAsignados(this.tipoPlanilla).subscribe((resp: any) => {
      this.lsTrabajadoresAsignados = resp.aaData;
      setTimeout(() => {
        for (let i = 0; i < this.lsTrabajadoresAsignados.length; i++) {
          this.lsTrabajadoresAsignados[i].tipoPlanilla = true;
        }
      }, 500);
    })
  }

  agregarTrabajador() {
    this.tipoPlanilla.accion = "A"
    for (let i = 0; i < this.lsTrabajadores.length; i++) {
      if (this.lsTrabajadores[i].estado == true) {
        this.lsTrabajadoresAsig.push(this.lsTrabajadores[i])
      }
    }
    this.modalRef = this.modalService.open(ConfirmarNuevoTipoPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.componentInstance.input_tipPlan = this.tipoPlanilla;
    this.modalRef.componentInstance.input_lstrabAsig = this.lsTrabajadoresAsig;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  quitarTrabajador() {
    this.tipoPlanilla.accion = "Q"
    for (let i = 0; i < this.lsTrabajadoresAsignados.length; i++) {
      if (this.lsTrabajadoresAsignados[i].tipoPlanilla == false) {
        this.lsTrabajadoresQuit.push(this.lsTrabajadoresAsignados[i])
      }
    }
    this.modalRef = this.modalService.open(ConfirmarNuevoTipoPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.componentInstance.input_tipPlan = this.tipoPlanilla;
    this.modalRef.componentInstance.input_lstrabQuit = this.lsTrabajadoresQuit;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  validarAgregador(event){ //debugger
    for (let i = 0; i < this.lsTrabajadores.length; i++) {
      if (this.lsTrabajadores[i].estado == true){
        this.desabilitarAgregar = false;
        break;
      } else {
        if(this.desabilitarAgregar == false){
          this.desabilitarAgregar = true;
        }
      }
    }
  }

  validarQuitar(event){
    for (let i = 0; i < this.lsTrabajadoresAsignados.length; i++) {
      if (this.lsTrabajadoresAsignados[i].tipoPlanilla == false){
        this.desabilitarQuitar = false;
        break;
      } else {
        if(this.desabilitarQuitar == false){
          this.desabilitarQuitar = true;
        }
      }
    }
  }

}
