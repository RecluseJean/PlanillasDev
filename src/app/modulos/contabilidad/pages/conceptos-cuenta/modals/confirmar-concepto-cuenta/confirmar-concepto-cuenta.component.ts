import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { ConceptoCuentaService } from '../../../../services/concepto-cuenta/concepto-cuenta.service';

@Component({
  selector: 'app-confirmar-concepto-cuenta',
  templateUrl: './confirmar-concepto-cuenta.component.html',
  styles: []
})
export class ConfirmarConceptoCuentaComponent implements OnInit {

  @Input() input_concue;

  conceptoPlanilla: any;
  cuentaContable: any;

  accion: string = "";
  titulo: string = "";
  boton: string = "";

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public conceptoCuentaSercive : ConceptoCuentaService
  ) { }

  ngOnInit() {
    this.accion = this.input_concue.accion;

    if (this.accion == "RCU" || this.accion == "ACU" || this.accion == "DCU") {
      this.cuentaContable = this.input_concue;
      this.titulo = this.accion == "RCU" ? "Desea registrar la cuenta contable" : this.accion == "ACU" ? "Desea actualizar la cuenta contable" : "Desea eliminar la cuenta contable";
      this.boton = this.accion == "RCU" ? "Registrar" : this.accion == "ACU" ? "Actualizar" : "Eliminar";
    } else {
      this.conceptoPlanilla = this.input_concue;
      this.titulo = this.accion == "RCO" ? "Desea registrar el concepto planilla" : this.accion == "ACO" ? "Desea actualizar el concepto planilla" : "Desea eliminar el concepto planilla";
      this.boton = this.accion == "RCO" ? "Registrar" : this.accion == "ACO" ? "Actualizar" : "Eliminar";
    }

  }

  escogerAccion() {
    switch (this.accion) {
      case "RCU":
        this.registrarCuentaContable();
        break;

      case "ACU":
        this.actualizarCuentaContable();
        break;

      case "DCU":
        this.eliminarCuentaContable();
        break;

      case "RCO":
        this.registrarConceptoPlanilla();
        break;

      case "ACO":
        this.actualizarConceptoPlanilla();
        break;

      case "DCO":
        this.eliminarConceptoPlanilla();
        break;
    }
  }

  registrarCuentaContable() {
    this.conceptoCuentaSercive.registrarCuentaContable(this.cuentaContable).subscribe((resp:any) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  actualizarCuentaContable() {
    this.conceptoCuentaSercive.actualizarCuentaContable(this.cuentaContable).subscribe((resp:any) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }
  eliminarCuentaContable() {
    this.conceptoCuentaSercive.eliminarCuentaContable(this.cuentaContable).subscribe((resp:any) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  registrarConceptoPlanilla() {
    this.conceptoCuentaSercive.registrarConceptoPlanilla(this.conceptoPlanilla).subscribe((resp:any) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }
  actualizarConceptoPlanilla() {
    this.conceptoCuentaSercive.actualizarConceptoPlanilla(this.conceptoPlanilla).subscribe((resp:any) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }
  eliminarConceptoPlanilla() {
    this.conceptoCuentaSercive.eliminarConceptoPlanilla(this.conceptoPlanilla).subscribe((resp:any) => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

}
