import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { HeaderService } from '../../../../../../services/service.index';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { PrevisualizacionPlanillaComponent } from '../previsualizacion-planilla/previsualizacion-planilla.component';
import { EliminarBoletaComponent } from '../eliminar-boleta/eliminar-boleta.component';
import { MostrarBoletaBuscadaComponent } from '../mostrar-boleta/mostrat-boleta-buscada/mostrar-boleta-buscada.component';
import { Router } from '@angular/router';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';




@Component({
  selector: 'app-mostrar-boleta',
  templateUrl: './mostrar-boleta.component.html',
  styles: []
})
export class MostrarBoletaComponent implements OnInit, OnDestroy {

  @Input() input_trabajador;

  lsPlanilla: any[] = [];
  public lsAno: any[] = [];
  public lsMeses: any[] = [];
  trabajador: any;
  empresa: any;
  public ano: Año = new Año();
  public mes: Mes = new Mes();

  modalRef: NgbModalRef;


  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService,
    private modalService: NgbModal,
    public _headerService: HeaderService,
    public router: Router
  ) { }

  ngOnInit() {
    this.trabajador = this.input_trabajador;
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.listarAno();
    this.listarMeses();
    this.listarBoletas();

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

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarBoletas() {
    var tmp: any = {
      "contrato": {
        "idContrato": this.trabajador.idContrato
      }
    }
    this.planillasService.listarBoletas(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPlanilla = resp.aaData;
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  previsualizarPlanilla(indice) {

    this.planillasService.listarPHDsctRemu(indice).subscribe((resp: any) => {

      this.modalRef = this.modalService.open(PrevisualizacionPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalLG'
        }
      );
      this.modalRef.componentInstance.input_planilla_historica = indice;
      this.modalRef.componentInstance.input_lsphDsctRemu = resp.aaData;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    })

  }

  eliminarPlanilla(indice) {
    var planilla_tmp = Object.assign({}, indice);
    planilla_tmp.accion = Constantes.ELIMINAR;
    this.openModal(planilla_tmp);
  }

  buscar(ano, mes) {
    var tmp = {
      "pdoAno": ano,
      "pdoMes": mes,
      "planilla": {
        "pdo_ano": ano,
        "pdo_mes": mes
      },
      "contrato": {
        "idContrato": this.trabajador.idContrato
      }
    }
    if (ano.idPdoAno != null && mes.idPdoMes != null) {

      this.obtenerFecha();

      this.planillasService.encontrarPlanilla(tmp).subscribe((resp: any) => {
        if (resp.estado == 1) {
          var planilla_tmp = Object.assign({}, resp.defaultObj);
          planilla_tmp.accion = Constantes.MOSTRAR;
          this.openModal(resp.defaultObj);
        } else {
          Swal.fire(Constantes.INFO, `El trabajador no presenta planilla para ${this.mes.descripcion}-${this.ano.descripcion}`, 'info');
        }
      })
    } else {
      Swal.fire(Constantes.WARNING, 'Ingrese los datos necesarios', 'warning');
    }
  }

  obtenerFecha() {
    this.lsAno.forEach(valor => {
      if (valor.idPdoAno == this.ano.idPdoAno) {
        this.ano.descripcion = valor.descripcion;
      }
    });

    this.lsMeses.forEach(valor => {
      if (valor.idPdoMes == this.mes.idPdoMes) {
        this.mes.descripcion = valor.descripcion;
      }
    });
  }



  openModal(indice) {
    if (indice.accion != "D") {
      this.modalRef = this.modalService.open(MostrarBoletaBuscadaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        }
      );
      this.modalRef.componentInstance.input_planilla = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    } else {

      this.modalRef = this.modalService.open(EliminarBoletaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_planilla = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.dismiss();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }


}
