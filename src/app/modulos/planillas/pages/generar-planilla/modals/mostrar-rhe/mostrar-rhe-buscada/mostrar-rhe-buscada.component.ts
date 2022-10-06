import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../../services/planillas/planillas.service';
import { Trabajador } from '../../../../../../../models/Trabajador';
import { Año } from '../../../../../../../models/Año';
import { Mes } from '../../../../../../../models/Mes';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';

@Component({
  selector: 'app-mostrar-rhe-buscada',
  templateUrl: './mostrar-rhe-buscada.component.html',
  styles: []
})
export class MostrarRheBuscadaComponent implements OnInit {

  @Input() input_trab;
  @Input() input_lsRHEs;
  @Input() input_ano;
  @Input() input_mes;

  trabajador: Trabajador = new Trabajador();
  ano: Año = new Año();
  mes: Mes = new Mes();

  lsRHEs: any[] = [];

  constructor(
    public planillasService: PlanillasService,
    public activemodal: NgbActiveModal,
  ) { }

  ngOnInit() {

    this.trabajador= this.input_trab;
    this.lsRHEs=this.input_lsRHEs;
    this.ano= this.input_ano;
    this.mes= this.input_mes;
  
    // this.listarRHEs();
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarRHEs(){
    var tmp={
      "trabajador":this.trabajador,
      "pdoAno":this.ano,
      "pdoMes":this.mes
    }
    this.planillasService.listarRHEs(tmp).subscribe((resp: any)=>{
        this.lsRHEs = resp.aaData;
    })
  }

  eliminarRHE(rhe) {
    var idRhe = rhe.idRhe;
    this.planillasService.eliminarRHE(idRhe).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.listarRHEs();
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      //this.activemodal.dismiss();
    })
  }

  descargarRHE(rhe) {
  
    const nombre = rhe.nombreArchivo;
    this.planillasService.descargarRHE(nombre).subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], { type: 'application/pdf' });
        saveAs(file, nombre);
        Swal.fire(Constantes.SUCCESS, "RHE descargado correctamente", 'success');
      } else { Swal.fire(Constantes.ERROR, "Error al descargar RHE", 'error'); }
    });
    // this.activemodal.dismiss();
  }

}
