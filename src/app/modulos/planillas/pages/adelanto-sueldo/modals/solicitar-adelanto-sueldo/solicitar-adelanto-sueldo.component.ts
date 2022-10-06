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
  selector: 'app-solicitar-adelanto-sueldo',
  templateUrl: './solicitar-adelanto-sueldo.component.html',
  styles: []
})
export class SolicitarAdelantoSueldoComponent implements OnInit {

  @Input() input_contrato;

  trabajador: Trabajador = new Trabajador();
  empresa: Empresa = new Empresa();
  contrato: Contrato = new Contrato();
  adeSue: AdelantoSueldo = new AdelantoSueldo();
  lsDeuda: any[] = [];
  lsTipoAdeSue: any[] = Constantes.tipoAdeSue;
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

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  setearDatos() {debugger
    this.adeSue.tipo=2;
    var diaHoy = new Date();
    this.adeSue.fechaSol=diaHoy;
      var adelantoSueldoDTO = {
        "trabajador": this.trabajador,
        "adelantoSueldo": this.adeSue,
        "accion":Constantes.SOLICITAR
      }

      this.openModalConfirmar(adelantoSueldoDTO)
  }


  public openModalConfirmar(adelantoSueldoDTO) {
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
