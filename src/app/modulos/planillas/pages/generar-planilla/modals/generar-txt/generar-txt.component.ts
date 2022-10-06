import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Empresa } from '../../../../../../models/Empresa';
import Constantes from '../../../../../../models/Constantes';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { Contrato } from '../../../../../../models/Contrato';

@Component({
  selector: 'app-generar-txt',
  templateUrl: './generar-txt.component.html',
  styles: []
})
export class GenerarTxtComponent implements OnInit {

  @Input() input_contrato;
  @Input() input_tpoPlan;

  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  ano: Año = new Año();
  mes: Mes = new Mes();
  lsCuentaCargo: any[] = [];
  descripcionRef: String = "";
  idCuentaCargo:number;
  tpoPlan:number;

  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService,
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.contrato = this.input_contrato;
    this.tpoPlan=this.input_tpoPlan.categoriaPlanilla;
    this.listarCuentaCargo();
    this.descripcionDefecto()
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarCuentaCargo() {
    this.planillasService.listarCuentaCargo(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsCuentaCargo = resp.aaData;
      } else if (resp.estado == 0) {
        this.activemodal.dismiss();
        Swal.fire(Constantes.INFO, "La Empresa no cuenta con cuentas cargo registradas", 'info');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });

  }

  descripcionDefecto() {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.WARNING, "Seleccione un periodo", 'warning');
      this.activemodal.dismiss();
    } else {
      this.descripcionRef = "Pago " + this.mes.descripcion + " " + this.ano.descripcion;
    }
  }

  seleccionarTipo(){
    if(this.contrato != null){
      this.generarTxtPersonal()
    } else {
      this.generarTxtGeneral();
    }
  }

  generarTxtGeneral(){
    var tmp = {
      "empresa": this.empresa,
      "cuentaCargo": {
        "idCuentaCargo":this.idCuentaCargo
      },
      "descripcion":this.descripcionRef,
      "tpoPlan":this.tpoPlan,
      "pdoAno":this.ano,
      "pdoMes":this.mes
    }

    this.planillasService.generarTxtGeneral(tmp).subscribe((resp:any)=>{
      if(resp.estado ==1){
          var nombreArchivo = resp.defaultObj;
          this.descargarTxtGeneral(nombreArchivo)
          this.activemodal.dismiss();
      }
    })
  }

  descargarTxtGeneral(nombreArchivo) {
    this.planillasService.descargarTxtGeneral(nombreArchivo).subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], { type: 'application/txt' });
        saveAs(file, nombreArchivo);
        Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
      } else { Swal.fire(Constantes.ERROR, "Error al descargar Archivo", 'error'); }
    });
    // this.activemodal.dismiss();
  }

  generarTxtPersonal(){
    var tmp = {
      "empresa": this.empresa,
      "cuentaCargo": {
        "idCuentaCargo":this.idCuentaCargo
      },
      "descripcion":this.descripcionRef,
      "contrato":this.contrato
    }
    this.planillasService.generarTxtPersonal(tmp).subscribe((resp:any)=>{
      if(resp.estado ==1){
          var nombreArchivo = resp.defaultObj;
          this.descargarTxtGeneral(nombreArchivo)
          this.activemodal.dismiss();
      }
    })
  }

}
