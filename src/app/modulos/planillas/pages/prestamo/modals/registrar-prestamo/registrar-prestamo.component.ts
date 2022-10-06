import { Component, Input, OnInit } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { Empresa } from '../../../../../../models/Empresa';
import { Contrato } from '../../../../../../models/Contrato';
import { Mes } from '../../../../../../models/Mes';
import { Año } from '../../../../../../models/Año';
import { AdelantoSueldo } from '../../../../../../models/Adelanto-Sueldo';
import Constantes from '../../../../../../models/Constantes';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../../../../../services/shared/header.service';
import Swal from 'sweetalert2';
import { ConfirmarPrestamoComponent } from '../confirmar-prestamo/confirmar-prestamo.component';
import { Prestamo } from '../../../../../../models/Prestamo';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.component.html',
  styles: []
})
export class RegistrarPrestamoComponent implements OnInit {

  @Input() input_contrato;

  trabajador: Trabajador = new Trabajador();
  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  ano: Año = new Año();
  mes: Mes = new Mes();
  prestamo: any = new Prestamo();
  lsAno: any[] = [];
  lsMeses: any[] = [];
  lsDeuda: any[] = [];
  // lsTipoAdeSue: any[] = Constantes.tipoAdeSue;
  // tipoAdeSue: number = 1;
  pagoMensual: number = 0;
  montoTotal: number = 0;
  diaHoy;
  impedirSol: boolean;
  denegarSol: boolean = false;
  modalRef: NgbModalRef;

  constructor(
    public planillasService: PlanillasService,
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public _headerService: HeaderService
  ) { }

  ngOnInit() {
    this.contrato = this.input_contrato;
    this.trabajador = this.input_contrato.trabajador;
    this.definirRangoFecha();
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    this.listarDeuda();
    this.listarAno()
    this.listarMeses()
    //this.calcularMontoTotal()
  }

  definirRangoFecha() {
    let fechaHoy = new Date();
    var ano = fechaHoy.getFullYear();
    var mes = fechaHoy.getMonth() + 1;
    this.diaHoy = `${ano}-${mes}-${fechaHoy.getUTCDate()}`;
  }

  listarDeuda() {
    this.planillasService.listarDeuda(this.trabajador).subscribe((resp: any) => {
      this.lsDeuda = resp.aaData;
      if (resp.estado == 0) {
        this.impedirSol = false;
      } else if (resp.estado == 1) {
        this.impedirSol = true;
      } else {
        this.impedirSol = true;
        this.denegarSol = true;
      }
    })
  }

  listarAno() {
    this._headerService.listarAno(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsAno = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  listarMeses() {
    this._headerService.listarMeses().subscribe(resp => {
      if (resp.estado == 1) {
        this.lsMeses = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  calcular(evento:number) {
    if (this.prestamo.montoTotal == null || this.prestamo.nroCuotas == null) {
      this.pagoMensual = 0;
    } else {
      this.pagoMensual = this.prestamo.montoTotal / evento;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  calcularMontoTotal() {
    var fechaHoy = new Date();
    var dia = fechaHoy.getDate();
    var sueldo: any = this.contrato.sueldoBase;
    var sueldoDia: number = sueldo / 30;
    this.prestamo.montoTotal = (sueldoDia * dia).toFixed(2);
  }

  setearDatos() {
    if (this.ano.idPdoAno == undefined || this.mes.idPdoMes == undefined) {
      Swal.fire(Constantes.WARNING, "Seleccione un perido", 'warning');
    } else {
      var prestamoDTO = {
        "trabajador": this.trabajador,
        "prestamo": this.prestamo,
        "pdoAno": this.ano,
        "pdoMes": this.mes
      }
      this.openModalConfirmar(prestamoDTO)
    }
  }

  public openModalConfirmar(prestamoDTO) {
    this.modalRef = this.modalService.open(ConfirmarPrestamoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_prestamoDTO = prestamoDTO;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

}
