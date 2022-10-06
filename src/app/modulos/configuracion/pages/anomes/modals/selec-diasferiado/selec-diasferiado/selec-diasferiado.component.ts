import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Mes } from '../../../../../../../models/Mes';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';
import { DatePipe } from '@angular/common';
import { AnoMesService } from '../../../../../services/anomes/anomes.service';

@Component({
  selector: 'app-selec-diasferiado',
  templateUrl: './selec-diasferiado.component.html',
  styles: [],
  moduleId: module.id
})
export class SelecDiasferiadoComponent implements OnInit {

  @Input() input_mes;
  mes: Mes = new Mes();
  dia: number;
  lsFeriados: any[] = [];
  fecha: Date;
  minDate: Date;
  maxDate: Date;


  constructor(
    public activemodal: NgbActiveModal,
    public anomesService: AnoMesService
  ) { }

  ngOnInit() {
    this.mes = this.input_mes;
    this.generarArray();
    var fecha_actual = new Date();
    var year_act = fecha_actual.getFullYear();
    this.minDate = new Date(`${this.mes.idPdoMes}/1/${year_act}`)
    this.maxDate = new Date(`${this.mes.idPdoMes}/${this.mes.cantidadDias}/${year_act}`)
  }

  generarArray() {
    if (this.mes.txtDiasFeriados != null) {
      this.lsFeriados = this.mes.txtDiasFeriados.split(",");
    }
  }

  guardarCambios() {
    var noExiste: boolean = true;
    this.dia = this.fecha.getDate();
    this.lsFeriados.forEach(item => {
      if (item == this.dia) {
        noExiste = false;
      }
    })

    if (noExiste) {
      //convertir el string falta codigo
      this.lsFeriados.push(this.dia);
      var cad = this.lsFeriados.join();
      this.mes.txtDiasFeriados = cad;

      this.anomesService.actualizarMes(this.mes).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, 'Feriado registrado correctamente', 'success');

        } else {
          Swal.fire(Constantes.ERROR, resp.msg, 'error');
        }
      })
    } else {
      Swal.fire(Constantes.INFO, 'Este dia feriado ya esta registrado', 'info');
    }
  }

  eliminarFeriado(dia) {
    const index = this.lsFeriados.indexOf(dia);
    this.lsFeriados.splice(index, 1);
    var cad = this.lsFeriados.join();
    if (this.lsFeriados.length == 0) {
      cad = null;
    }
    this.mes.txtDiasFeriados = cad;
    this.anomesService.actualizarMes(this.mes).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, 'Feriado eliminado correctamente', 'success');
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');

      }
    })

  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
}
