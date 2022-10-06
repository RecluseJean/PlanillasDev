import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Empresa } from '../../../../../../models/Empresa';
import { Contrato } from '../../../../../../models/Contrato';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { saveAs } from 'file-saver';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { HeaderService } from '../../../../../../services/shared/header.service';
import { TrabajadorService } from '../../../../../trabajador/services/trabajador/trabajador.service';

@Component({
  selector: 'app-generar-excel',
  templateUrl: './generar-excel.component.html',
  styles: []
})
export class GenerarExcelComponent implements OnInit {

  @Input() input_tpoPlan;

  empresa: Empresa = new Empresa();
  tpoPlan: TipoPlanilla = new TipoPlanilla();
  ano: Año = new Año();
  mes: Mes = new Mes();
  lsAno: any[] = [];
  lsMeses: any[] = [];

  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService,
    public trabajadorService: TrabajadorService,
    public _headerService: HeaderService
  ) { }

  ngOnInit() { //debugger
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.tpoPlan = this.input_tpoPlan;
    this.descripcionDefecto();
    this.listarAno();
    this.listarMeses();
    console.log(this.tpoPlan);
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  descripcionDefecto() {
    if(localStorage.getItem("anoSeleccion")!=null){
      this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    }
    if(localStorage.getItem("mesSeleccion")!=null){
      this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    }
  }

  public listarAno() {
    this._headerService.listarAno(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsAno = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  public listarMeses() {
    this._headerService.listarMeses().subscribe(resp => {
      if (resp.estado == 1) {
        this.lsMeses = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  generar(){
    var tmp = {
      "empresa": this.empresa,
      "pdoAno": this.ano,
      "pdoMes":this.mes,
      "tipoPlanilla":this.tpoPlan
    }

    this.planillasService.generarXlsConsolidado(tmp).subscribe((resp:any)=>{
      debugger
      if(resp.estado ==1){
        /* if(this.tpoPlan==null){

          var nombreArchivo = "Reporte_Planilla_Remuneraciones.xlsx";
          this.trabajadorService.descargarReporte(nombreArchivo).subscribe((result: any) => {
            var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(file, nombreArchivo);
            Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
          })

        } else  */if (this.tpoPlan.categoriaPlanilla==4){

          var nombreArchivo = "Reporte_Planilla_4TA.xlsx";
          this.trabajadorService.descargarReporte(nombreArchivo).subscribe((result: any) => {
            var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(file, nombreArchivo);
            Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
          })

        } else {

          var nombreArchivo = "Reporte_Planilla_5TA.xlsx";
          this.trabajadorService.descargarReporte(nombreArchivo).subscribe((result: any) => {
            var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(file, nombreArchivo);
            Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
          })

        }
      }else {
        Swal.fire(Constantes.ERROR, "Error descargadondo archivo", 'error');
      }
    })
    this.activemodal.dismiss('Cancelado');
  }
}
