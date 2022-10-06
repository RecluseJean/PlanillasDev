import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConfirmarNuevoDepartamentoEmpresaComponent } from "../confirmar-nuevo-departamentoEmpresa/confirmar-nuevo-departamento-empresa.component";
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoEmpresa } from '../../../../../../models/DepartamentoEmpresa';
import { Empresa } from '../../../../../../models/Empresa';
import { Trabajador } from '../../../../../../models/Trabajador';
import { TrabajadorService } from '../../../../../trabajador/services/trabajador/trabajador.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-departamento-empresa',
  templateUrl: './nuevo-departamento-empresa.component.html',
  styles: []
})
export class NuevoDepartamentoEmpresaComponent implements OnInit, OnDestroy {

  @Input() input_departamentoEmpresa;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private trabajadorService: TrabajadorService,
  ) { }

  departamentoEmpresa: DepartamentoEmpresa = new DepartamentoEmpresa();
  empresa: Empresa = new Empresa();
  trabajador: Trabajador = new Trabajador();
  lsGerente: any[] = [];
  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    this.listarGerente()
    if (this.input_departamentoEmpresa != null) {
      this.departamentoEmpresa = this.input_departamentoEmpresa;
      if (this.departamentoEmpresa.gerente != null) {
        this.trabajador = this.input_departamentoEmpresa.gerente;
      }
    }

  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarGerente() {
    this.trabajadorService.listarTrabajador(this.empresa).subscribe((resp: any) => {
      this.lsGerente = resp.aaData;
      this.lsGerente.forEach((trab: Trabajador) => {
        trab.nombres = trab.apePater + " " + trab.apeMater + " " + trab.nombres;
      })
    })
  }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  confirmarNuevoDepartamentoEmpresa() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarNuevoDepartamentoEmpresaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_departamentoEmpresa = this.departamentoEmpresa;
    this.modalRef.componentInstance.input_trabajador = this.trabajador;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activeModal.close();
    });
  }

}
