import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../../../models/Empresa';
import Constantes from '../../../../../../models/Constantes';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { Contrato } from '../../../../../../models/Contrato';
import { PlanillasService } from '../../../../../planillas/services/planillas/planillas.service';
import { Remuneracion } from '../../../../../../models/Remuneracion';

@Component({
  selector: 'app-generar-txt',
  templateUrl: './txt.component.html',
  styles: []
})
export class TxtComponent implements OnInit {

  @Input() input_remuneracion;

  empresa: Empresa = new Empresa();
  remuneracion:Remuneracion = new Remuneracion();
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
    this.remuneracion = this.input_remuneracion;
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
      this.descripcionRef = "Pago " + this.remuneracion.descripcion + " " + this.mes.descripcion + " " + this.ano.descripcion;
    }
  }

  seleccionarTipo(){
    this.generarTxtGeneral();
  }

  generarTxtGeneral(){
    var temp={
      "empresa": this.empresa,
      "cuentaCargo": {
        "idCuentaCargo":this.idCuentaCargo
      },
      "descripcion":this.descripcionRef,
      "idRemuneracion":this.remuneracion.idRemuneraciones,
      "pdoAno":this.ano,
      "pdoMes":this.mes
    }
    this.planillasService.generarTxtGeneralRemu(temp).subscribe((resp:any)=>{
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


}
