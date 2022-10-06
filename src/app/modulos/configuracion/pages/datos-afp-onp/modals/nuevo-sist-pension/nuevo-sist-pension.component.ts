import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConfirmarNuevoSistPensionComponent } from '../confirmar-nuevo-sist-pension/confirmar-nuevo-sist-pension.component';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {Afp } from '../../../../../../models/Afp';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { $ } from 'protractor';

@Component({
  selector: 'app-nuevo-sist-pension',
  templateUrl: './nuevo-sist-pension.component.html',
  styles: []
})
export class NuevoSistPensionComponent implements OnInit, OnDestroy {

  @Input() input_afp;

  constructor(
    public activemodal : NgbActiveModal,
    private modalService: NgbModal
  ) { }

  afp : Afp = new Afp();
  modalRef:NgbModalRef;
  onp = false;

  ngOnInit() {
    if(this.input_afp != null){
      this.afp=this.input_afp;
      if (this.afp.idAfp == 1) {
        this.onp = true;
      }
    }
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  confirmarSistPension(){
    this.openModalConfirmar();
  }


  public openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarNuevoSistPensionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_afp=this.afp;
    this.modalRef.result.then((result) => {
   }, (reason) => {
    this.activemodal.dismiss();
   });
  }

  verificarCantidadApor(cantidad){
    if(typeof cantidad != 'number'){
      this.afp.apoOblFndPen = 0;
      Swal.fire(Constantes.WARNING,'Numero invalido','warning');
    }
  }


  verificarCantidadPrima(cantidad){
    if(typeof cantidad != 'number'){
      this.afp.primaSeguro = 0;
      Swal.fire(Constantes.WARNING,'Numero invalido','warning');
    }
  }

  verificarCantidadComSobFlu(cantidad){
    if(typeof cantidad != 'number'){
      this.afp.comSobFlu = 0;
      Swal.fire(Constantes.WARNING,'Numero invalido','warning');
    }
  }

  verificarCantidadComSobFluMix(cantidad){
    if(typeof cantidad != 'number'){
      this.afp.comSobFluMix = 0;
      Swal.fire(Constantes.WARNING,'Numero invalido','warning');
    }
  }

  verificarCantidadComAnuSobSal(cantidad){
    if(typeof cantidad != 'number'){
      this.afp.comAnuSobSal = 0;
      Swal.fire(Constantes.WARNING,'Numero invalido','warning');
    }
  }

  verificarNumero(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    var patron = /[0.0-9.9]/;
    var tecla_final = String.fromCharCode(tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
      return false;
    }
  }
}
