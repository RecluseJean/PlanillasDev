import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConfirmarNuevaAreaDepartamentoEmpresaComponent } from "../confirmar-nueva-area-departamento-empresa/confirmar-nueva-area-departamento-empresa.component";
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AreaDepartamentoEmpresa } from '../../../../../../models/AreaDepartamentoEmpresa';
import { DepartamentoEmpresa } from '../../../../../../models/DepartamentoEmpresa';
import { Empresa } from '../../../../../../models/Empresa';
import { DepartamentoEmpresaService } from '../../../../../../modulos/rrhh/services/departamentoEmpresa/departamento-empresa.service';



@Component({
  selector: 'app-nueva-area-departamento-empresa',
  templateUrl: './nueva-area-departamento-empresa.component.html',
  styles: []
})
export class NuevaAreaDepartamentoEmpresaComponent implements OnInit, OnDestroy {

  @Input() input_areaDepartamentoEmpresa;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private departamentoEmpresaService: DepartamentoEmpresaService,
  ) { }

  areaDepartamentoEmpresa: any = new AreaDepartamentoEmpresa();
  departamentoEmpresa: DepartamentoEmpresa = new DepartamentoEmpresa();
  lsDepartamentoEmpresa: Array<any> = [];
  empresa: Empresa = new Empresa();

  modalRef: NgbModalRef;

  ngOnInit() {
    if (this.input_areaDepartamentoEmpresa != null) {
      this.areaDepartamentoEmpresa = this.input_areaDepartamentoEmpresa;
      this.departamentoEmpresa = this.input_areaDepartamentoEmpresa.departamentoEmpresa;
    }
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    this.empresa.idEmpresa = tmp.idEmpresa;
    this.listarDepartamentoEmpresa()
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarDepartamentoEmpresa() {
    this.departamentoEmpresaService.listarDepEmp(this.empresa).subscribe((resp: any) => {
      this.lsDepartamentoEmpresa = resp.aaData;
    })
  }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  confirmarNuevaAreaDepartamentoEmpresa() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarNuevaAreaDepartamentoEmpresaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_areaDepartamentoEmpresa = this.areaDepartamentoEmpresa;
    this.modalRef.componentInstance.input_departamentoEmpresa = this.departamentoEmpresa;
    
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activeModal.close();
    });
  }

}
