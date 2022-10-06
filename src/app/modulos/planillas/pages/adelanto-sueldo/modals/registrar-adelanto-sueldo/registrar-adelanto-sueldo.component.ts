import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { AdelantoSueldo } from '../../../../../../models/Adelanto-Sueldo';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HeaderService } from '../../../../../../services/service.index';
import { Empresa } from '../../../../../../models/Empresa';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Contrato } from '../../../../../../models/Contrato';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { ConfirmarAdelantoSueldoComponent } from '../confirmar-adelanto-sueldo/confirmar-adelanto-sueldo.component';

@Component({
  selector: 'app-registrar-adelanto-sueldo',
  templateUrl: './registrar-adelanto-sueldo.component.html',
  styles: []
})
export class RegistrarAdelantoSueldoComponent implements OnInit {

  @Input() input_contrato;

  trabajador: Trabajador = new Trabajador();
  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  ano: Año = new Año();
  mes: Mes = new Mes();
  adeSue: AdelantoSueldo = new AdelantoSueldo();
  lsAno: any[] = [];
  lsMeses: any[] = [];
  lsDeuda: any[] = [];
  lsTipoAdeSue: any[] = Constantes.tipoAdeSue;
  pagoMensual: number = 0;
  tipoAdeSue: number = 1;
  montoTotal: number = 0;

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

    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    this.listarDeuda();
    this.listarAno()
    this.listarMeses()
    if (this.tipoAdeSue == 1) {
      this.calcularMontoTotal()
    }
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

  calcular(evento) {
    if (this.tipoAdeSue == 1) {
      this.pagoMensual = this.montoTotal / evento;
    } else if (this.adeSue.montoTotal == undefined || this.adeSue.nroCuotas == undefined) {
      this.pagoMensual = 0;
    } else {
      this.pagoMensual = this.adeSue.montoTotal / evento;
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
    this.montoTotal = sueldoDia * dia;
  }

  setearDatos() { //debugger
    if (this.ano.idPdoAno == undefined || this.mes.idPdoMes == undefined) {
      Swal.fire(Constantes.WARNING, "Seleccione un perido", 'warning');
    } else {

      if (this.tipoAdeSue == 1) {
        this.adeSue.montoTotal = this.montoTotal
      }
      this.adeSue.tipo = this.tipoAdeSue;

      var adelantoSueldoDTO = {
        "trabajador": this.trabajador,
        "adelantoSueldo": this.adeSue,
        "pdoAno": this.ano,
        "pdoMes": this.mes
      }

      this.openModalConfirmar(adelantoSueldoDTO)
    }
  }


  public openModalConfirmar(adelantoSueldoDTO) { //debugger
    this.modalRef = this.modalService.open(ConfirmarAdelantoSueldoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_adelantoSueldoDTO = adelantoSueldoDTO;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();

    });
  }
}
