import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Año } from '../../../../../../models/Año';
import { saveAs } from 'file-saver';
import { Mes } from '../../../../../../models/Mes';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarRegistroRheComponent } from './confirmar-registro-rhe/confirmar-registro-rhe.component';
import { Router } from '@angular/router';
import { HeaderService } from '../../../../../../services/service.index';
import { Empresa } from '../../../../../../models/Empresa';
import { MostrarRheBuscadaComponent } from './mostrar-rhe-buscada/mostrar-rhe-buscada.component';

@Component({
  selector: 'app-mostrar-rhe',
  templateUrl: './mostrar-rhe.component.html',
  styles: []
})
export class MostrarRheComponent implements OnInit {

  @Input() input_Trab;

  trabajador: Trabajador = new Trabajador();
  empresa: Empresa = new Empresa();
  lsRhe: any[] = [];
  selecArch: File;
  ano: Año = new Año();
  mes: Mes = new Mes();
  anoCab: Año = new Año();
  mesCab: Mes = new Mes();
  lsAno: any[] = [];
  lsMeses: any[] = [];

  constructor(
    public planillasService: PlanillasService,
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public _headerService: HeaderService
  ) { }

  ngOnInit() {
    this.trabajador = this.input_Trab;
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    this.anoCab = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mesCab = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.listarUtl();
    this.listarAno();
    this.listarMeses();
  }

  subirArchivo(archivo, rhe) {
    // if (this.anoCab == null || this.mesCab == null) {
    //   this.activemodal.dismiss();
    //   Swal.fire(Constantes.WARNING, "Debe selecionar un periodo", 'warning');
    // } else {
      this.selecArch = archivo.target.files[0];
      this.openModal(rhe)
    // }
  }

  openModal(rhe) {
    const modalRef = this.modalService.open(ConfirmarRegistroRheComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    modalRef.componentInstance.input_rhe = rhe;
    modalRef.componentInstance.input_selecArch = this.selecArch;
    modalRef.result.then((result) => {
    }, (reason) => {
      // this.listarUtl();
      this.activemodal.dismiss();
    });
  }

  listarUtl() {
    this.planillasService.listarUlt(this.trabajador).subscribe((resp: any) => {
      this.lsRhe = resp.aaData;
    })
  }

  eliminarRHE(rhe) {
    var idRhe = rhe.idRhe;
    this.planillasService.eliminarRHE(idRhe).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.listarUtl();
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      //this.activemodal.dismiss();
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
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

  abrirModalBuscarRHE(lsRHEs) {

    if (this.ano.idPdoAno == null || this.mes.idPdoMes == null) {
      Swal.fire(Constantes.WARNING, 'Seleccione un periodo', 'warning');
    } else {
      const modalRef = this.modalService.open(MostrarRheBuscadaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',
          windowClass: 'modal-mdC'
        }
      );
      modalRef.componentInstance.input_trab = this.trabajador;
      modalRef.componentInstance.input_lsRHEs = lsRHEs;
      modalRef.componentInstance.input_ano = this.ano;
      modalRef.componentInstance.input_mes = this.mes;
      modalRef.result.then((result) => {
      }, (reason) => {
        this.listarUtl();
      });
    }
  }

  BuscarRHE() {
    if (this.ano.idPdoAno == null || this.mes.idPdoMes == null) {
      Swal.fire(Constantes.WARNING, 'Seleccione un periodo', 'warning');
    } else {
      var tmp = {
        "trabajador": this.trabajador,
        "pdoAno": this.ano,
        "pdoMes": this.mes
      }
      this.planillasService.listarRHEs(tmp).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.abrirModalBuscarRHE(resp.aaData)
        } else if (resp.estado == 2) {
          // this.activemodal.dismiss();
          Swal.fire(Constantes.INFO, resp.msg, 'info');
        }
      })
    }
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
    this.activemodal.dismiss();
  }

  descargarBoleRHE(rhe) {
    const nombre = "Boletilla";
    var tmp={
      "idPlanillaHistorico":rhe.idRhe
    }
    this.planillasService.descargarBoletaRHE(tmp).subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], { type: 'application/pdf' });
        saveAs(file, nombre);
        Swal.fire(Constantes.SUCCESS, "Boleta descargada correctamente", 'success');
      } else { Swal.fire(Constantes.ERROR, "Error descargando boleta", 'error');}
    });
    this.activemodal.dismiss();
  }
}
