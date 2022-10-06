import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Equipo } from '../../../../../../models/Equipo';
import { ConfirmarEquipoComponent } from './confirmar-equipo/confirmar-equipo.component';


@Component({
  selector: 'app-nuevo-equipo',
  templateUrl: './nuevo-equipo.component.html',
  styleUrls: []
})
export class NuevoEquipoComponent implements OnInit {

  @Input() input_equipo;
  
  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  modalRef: NgbModalRef;
  equipo:  any = new Equipo();
  
  ngOnInit() {

  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmarNuevoEquipo() { //debugger
    this.openModalConfirmar();
  }

  public openModalConfirmar() { //debugger
    this.modalRef = this.modalService.open(ConfirmarEquipoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_equipo = this.equipo;
    //this.modalRef.componentInstance.input_departamentoEmpresa = this.departamentoEmpresa;
    
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

}
