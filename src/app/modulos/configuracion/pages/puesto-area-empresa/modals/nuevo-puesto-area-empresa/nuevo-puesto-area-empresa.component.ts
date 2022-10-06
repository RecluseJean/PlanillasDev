import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConfirmarNuevoPuestoAreaEmpresaComponent } from "../confirmar-nuevo-puesto-area-empresa/confirmar-nuevo-puesto-area-empresa.component";
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PuestoAreaEmpresa } from '../../../../../../models/PuestoAreaEmpresa';
import { AreaDepartamentoEmpresa } from '../../../../../../models/AreaDepartamentoEmpresa';
import { ProyeccionPuesto } from '../../../../../../models/ProyeccionPuesto';
import { Empresa } from '../../../../../../models/Empresa';
import { AreaDepartamentoEmpresaService } from '../../../../services/area-departamento-empresa/area-departamento-empresa.service';
import Constantes from '../../../../../../models/Constantes';
import { PuestoAreaEmpresaService } from '../../../../services/puesto-area-empresa/puesto-area-empresa.service';


@Component({
  selector: 'app-nuevo-area-empresa',
  templateUrl: './nuevo-puesto-area-empresa.component.html',
  styles: []
})
export class NuevoPuestoAreaEmpresaComponent implements OnInit, OnDestroy {

  @Input() input_proyeccion;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private areaDepartamentoEmpresaService: AreaDepartamentoEmpresaService,
    private puestoAreaEmpresaService: PuestoAreaEmpresaService,
  ) { }

  modalRef: NgbModalRef;

  empresa: any = new Empresa();
  proyeccion: any = new ProyeccionPuesto;
  puesto: any = new PuestoAreaEmpresa();
  idPuestoJefe: number;
  iidAreaDepa: number;
  lsAreaDepa: Array<any> = [];
  lsProyeccionCargo: any[] = [];
  lsCategoria: any[] = Constantes.CATEGORIAPUESTO;

  ngOnInit() {
    if (this.input_proyeccion != null) {
      this.proyeccion = this.input_proyeccion;
      this.puesto = Object.assign({}, this.proyeccion.puesto);
      this.iidAreaDepa = this.puesto.areaDepartamentoEmpresa.iidAreaDepartamentoEmpresa;
      this.puesto.accion = Constantes.ACTUALIZAR;
      if (this.proyeccion.puestoProyeccion != null) {
        this.idPuestoJefe = this.proyeccion.puestoProyeccion.iidPuesto;
      }
    }

    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))

    this.listarAreaDepartamentoEmpresa()
    this.listarProyeccionCargo()
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarAreaDepartamentoEmpresa() {
    this.areaDepartamentoEmpresaService.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {
      this.lsAreaDepa = resp.aaData;
    })
  }

  listarProyeccionCargo() {
    this.puestoAreaEmpresaService.listarPuestoAreaEmp(this.empresa).subscribe((resp: any) => {
      this.lsProyeccionCargo = resp.aaData;
    })
  }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  public openModalConfirmar() {
    var puestoDto = this.armarPuestoDto();
    this.modalRef = this.modalService.open(ConfirmarNuevoPuestoAreaEmpresaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_puestoDto = puestoDto;

    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activeModal.close();
    });
  }

  armarPuestoDto() {
    var puestoDto = {
      "puesto": this.puesto,
      "areaDepartamentoEmpresa": {
        "iidAreaDepartamentoEmpresa": this.iidAreaDepa
      },
      "puestoJefe": this.idPuestoJefe != null ? { "iidPuesto": this.idPuestoJefe } : null,
      "proyeccion": this.proyeccion,
      "accion": this.proyeccion.accion != null ? this.proyeccion.accion : Constantes.REGISTRAR
    }
    return puestoDto;
  }

}
