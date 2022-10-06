import { Component, OnInit, Input } from '@angular/core';
import { Horario } from '../../../../../../models/Horario';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComunicadosService } from '../../../../services/comunicados/comunicados.service';
import { NuevoCronogramaConfirmarComponent } from '../nuevo-cronograma-confirmar/nuevo-cronograma-confirmar.component';



@Component({
  selector: 'app-nuevo-cronograma',
  templateUrl: 'nuevo-cronograma.component.html',
  styles: []
})
export class NuevoCronogramaComponent implements OnInit {

  @Input() input_horario_final;
  horario: Horario = new Horario();
  horario_final: any;
  lsEstado: any = [];
  deshabilitar = true;
  mayorEdad: any;

  constructor(
    public router: Router,
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public comunicadoService: ComunicadosService
  ) { }

  ngOnInit() {
    this.cargarDatos();
    this.iniciarChecks();
    if (this.input_horario_final != null) {
      this.horario = this.input_horario_final;
      this.llenarChecks();
      this.deshabilitar = false;
    }
  }


  cargarDatos() {
    this.lsEstado = Constantes.ESTADO;
    this.horario.dias = Constantes.DiasSemana;
    if (this.input_horario_final == null) {
      this.horario.accion = Constantes.REGISTRAR;
    } else {
      this.horario.accion = Constantes.ACTUALIZAR;
    }
  }

  llenarChecks() {
    this.horario.dias = Constantes.DiasSemana;
    this.horario.dias[0].seleccionado = this.input_horario_final.checkLunes;
    this.horario.dias[1].seleccionado = this.input_horario_final.checkMartes;
    this.horario.dias[2].seleccionado = this.input_horario_final.checkMiercoles;
    this.horario.dias[3].seleccionado = this.input_horario_final.checkJueves;
    this.horario.dias[4].seleccionado = this.input_horario_final.checkViernes;
    this.horario.dias[5].seleccionado = this.input_horario_final.checkSabado;
    this.horario.dias[6].seleccionado = this.input_horario_final.checkDomingo;
  }

  iniciarChecks() {
    this.horario.dias[0].seleccionado = false;
    this.horario.dias[1].seleccionado = false;
    this.horario.dias[2].seleccionado = false;
    this.horario.dias[3].seleccionado = false;
    this.horario.dias[4].seleccionado = false;
    this.horario.dias[5].seleccionado = false;
    this.horario.dias[6].seleccionado = false;
  }


  checkLunes(event) {
    if (event) { this.horario.dias[0].seleccionado = true; } else { this.horario.dias[0].seleccionado = false; }
  }
  checkMartes(event) {
    if (event) { this.horario.dias[1].seleccionado = true; } else { this.horario.dias[1].seleccionado = false; }
  }
  checkMiercoles(event) {
    if (event) { this.horario.dias[2].seleccionado = true; } else { this.horario.dias[2].seleccionado = false; }
  }
  checkJueves(event) {
    if (event) { this.horario.dias[3].seleccionado = true; } else { this.horario.dias[3].seleccionado = false; }
  }
  checkViernes(event) {
    if (event) { this.horario.dias[4].seleccionado = true; } else { this.horario.dias[4].seleccionado = false; }
  }
  checkSabado(event) {
    if (event) { this.horario.dias[5].seleccionado = true; } else { this.horario.dias[5].seleccionado = false; }
  }
  checkDomingo(event) {
    if (event) { this.horario.dias[6].seleccionado = true; } else { this.horario.dias[6].seleccionado = false; }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
    //this.refrescar(this.router.url);
  }

  asignarObjetos() {
    let totalDias = "";
    for (var i = 0; i < 7; i++) {
      if (this.horario.dias[i].seleccionado) {
        if (totalDias != "") {
          totalDias = totalDias + " - " + this.horario.dias[i].nombre;
        } else {
          totalDias = totalDias + this.horario.dias[i].nombre;
        }
      }
    }
    this.horario_final = {
      "idHorario": this.horario.idHorario,
      "horIniDia": this.horario.horIniDia,
      "horFinDia": this.horario.horFinDia,
      "horAlmuerIni": this.horario.horAlmuerIni,
      "horAlmuerFin": this.horario.horAlmuerFin,
      "descripcion": this.horario.descripcion,
      "estado": this.horario.estado,
      "accion": this.horario.accion,
      "checkLunes": this.horario.dias[0].seleccionado,
      "checkMartes": this.horario.dias[1].seleccionado,
      "checkMiercoles": this.horario.dias[2].seleccionado,
      "checkJueves": this.horario.dias[3].seleccionado,
      "checkViernes": this.horario.dias[4].seleccionado,
      "checkSabado": this.horario.dias[5].seleccionado,
      "checkDomingo": this.horario.dias[6].seleccionado,
      "totalDias": totalDias
    }
  }

  confirmarNuevoHorario() {
    this.asignarObjetos();
    const modalRef = this.modalService.open(NuevoCronogramaConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_horario_final = this.horario_final;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }
}
