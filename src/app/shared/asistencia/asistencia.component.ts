import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trabajador } from '../../models/Trabajador';
import { Router } from '@angular/router';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { Horario } from '../../models/Horario';
import { setInterval } from 'core-js';
import { Asistencia } from '../../models/Asistencia';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarAsistenciaComponent } from './modal/confirmar-asistencia/confirmar-asistencia.component';
import Swal from 'sweetalert2';
import Constantes from '../../models/Constantes';

declare function init_plugins();

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styles: []
})
export class AsistenciaComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    public router: Router,
    public usuarioService: UsuarioService) { }

  modalRef: NgbModalRef;

  token: any;
  trabajador: any = new Trabajador();
  horario: any = new Horario();
  hoy: any;
  interval: any;

  anno: any;
  mes: any;
  dia: any;
  hora: any;
  minuto: any;
  tieneHorario: boolean;

  ngOnInit() {
    init_plugins();
    this.token = JSON.parse(localStorage.getItem("InfoToken"));
    if (this.token != null) {
      this.trabajador = this.token.trabajador;

      if (this.trabajador.horario == null) {
        this.tieneHorario = false;
      } else {
        this.tieneHorario = true;
        this.horario = this.trabajador.horario;
      }

      this.obtenerFecha();
      this.refrescarToken();
      this.interval = setInterval(() => {
        this.obtenerFecha();
      }, 5000)

    } else {
      this.router.navigate(["/login"]);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval)
    localStorage.clear();
  }

  obtenerFecha() {
    this.hoy = new Date();
    let numMes = this.hoy.getMonth() + 1;
    let numDia = this.hoy.getDate();
    this.anno = this.hoy.getFullYear();
    this.mes = numMes < 10 ? "0" + numMes : numMes;
    this.dia = numDia < 10 ? "0" + numDia : numDia;
    this.hora = this.hoy.getHours();
    this.minuto = this.hoy.getMinutes();
  }

  refrescarToken() {
    this.usuarioService.refreshToken().subscribe((resp: any) => {
      localStorage.setItem('InfoToken', JSON.stringify(resp));
    })
  }

  marcarEntrada() {
    var asistencia = {
      "accion": "E",
      "fecha": this.crearFecha(),
      "horIniDia": this.crearHora(),
      "trabajador": this.trabajador,
      "pdoAno": {
        "descripcion": this.anno
      },
      "pdoMes": {
        "idPdoMes": this.mes
      }
    }
    this.openModalConfirmar(asistencia);
  }

  marcarInicio() {
    var asistencia = {
      "accion": "I",
      "fecha": this.crearFecha(),
      "horIniDia": this.crearHora(),
      "horIniAlmu":this.crearHora(),
      "trabajador": this.trabajador,
      "pdoAno": {
        /* "idPdoAno":73 */
        "descripcion": this.anno 
      },
      "pdoMes": {
        "idPdoMes": this.mes
      }
    }
    this.openModalConfirmar(asistencia);
  }

  marcarSalida() {
    var asistencia = {
      "accion": "S",
      "fecha": this.crearFecha(),
      "horFinDia": this.crearHora(),
      "trabajador": this.trabajador,
      "pdoAno": {
        "descripcion": this.anno
      },
      "pdoMes": {
        "idPdoMes": this.mes
      }
    }
    this.openModalConfirmar(asistencia);
  }

  marcarFin() {
    var asistencia = {
      "accion": "F",
      "fecha": this.crearFecha(),
      "horFinDia": this.crearHora(),
      "horFinAlmu":this.crearHora(),
      "trabajador": this.trabajador,
      "pdoAno": {
        "idPdoAno": this.anno

        /* "descripcion": this.anno */
      },
      "pdoMes": {
        "idPdoMes": this.mes
      }
    }
    this.openModalConfirmar(asistencia);
  }

  crearFecha(): Date {
    let fechaHoy = new Date("yyyy-MM-dd HH:mm:ss");
    fechaHoy.setFullYear(this.anno);
    fechaHoy.setMonth(this.mes - 1);
    fechaHoy.setDate(this.dia);
    fechaHoy.setHours(0);
    fechaHoy.setMinutes(0);
    fechaHoy.setSeconds(0);
    return fechaHoy;
  }

  crearHora(): Date {
    let horaDia = new Date("yyyy-MM-dd HH:mm:ss");
    horaDia.setFullYear(this.anno);
    horaDia.setMonth(this.mes - 1);
    horaDia.setDate(this.dia);
    horaDia.setHours(this.hora);
    horaDia.setMinutes(this.minuto);
    horaDia.setSeconds(0);
    return horaDia;
  }

  public openModalConfirmar(asistencia) {
    this.modalRef = this.modalService.open(ConfirmarAsistenciaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_asistencia = asistencia;
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
