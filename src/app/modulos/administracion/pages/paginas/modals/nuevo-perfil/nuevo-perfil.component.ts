import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Perfil } from '../../../../../../models/Perfil';
import { NuevoPerfilConfirmarComponent } from '../nuevo-perfil-confirmar/nuevo-perfil-confirmar.component';

@Component({
  selector: 'app-nuevo-perfil',
  templateUrl: './nuevo-perfil.component.html',
  styleUrls: []
})
export class NuevoPerfilComponent implements OnInit {

  @Input() input_perfil_nuevo;

  perfil: any = new Perfil();
  validar: boolean = true;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router
  ) { }

  ngOnInit() {
  }

  confirmarNuevaPagina() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    const modalRef = this.modalService.open(NuevoPerfilConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_perfil_nuevo = this.perfil;
    // modalRef.componentInstance.input_foto = this.fotoSeleccionada;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
