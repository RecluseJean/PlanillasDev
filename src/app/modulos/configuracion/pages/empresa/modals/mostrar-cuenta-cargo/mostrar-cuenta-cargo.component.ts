import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { Empresa } from '../../../../../../models/Empresa';
import Constantes from '../../../../../../models/Constantes';
import { NuevaCuentaCargoComponent } from '../nueva-cuenta-cargo/nueva-cuenta-cargo.component';
import { ConfirmarCuentaCargoComponent } from '../confirmar-cuenta-cargo/confirmar-cuenta-cargo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-cuenta-cargo',
  templateUrl: './mostrar-cuenta-cargo.component.html',
  styles: []
})
export class MostrarCuentaCargoComponent implements OnInit, OnDestroy {

  @Input() input_empresa;

  empresa: Empresa = new Empresa();

  lsCuentaCargo: any[] = [];
  modalRef:NgbModalRef;

  displayedColumns: string[] = [
    'descripcion',
    'nroCuenta',
    'tipocuenta',
    'tipoMoneda',
    'banco',
    'editar',
    'eliminar'
  ];
  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService,
    private modalService: NgbModal,
    public router: Router,
  ) { }

  ngOnInit() {
    this.empresa = this.input_empresa;
    this.listarCuentaCargo(this.empresa);
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  listarCuentaCargo(empresa) {
    this.empresaService.listarCuentaCargo(empresa).subscribe((resp: any) => {
      this.lsCuentaCargo = resp.aaData;
    });
  }

  registrarCuentaCargo() {
    let indice = null;
    this.openModal(indice);
  }

  modificarCuentaCargo(cuentaCargo) {
    var tmp = Object.assign({}, cuentaCargo);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarCuentaCargo(cuentaCargo) {
    var tmp = Object.assign({}, cuentaCargo);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(NuevaCuentaCargoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        }
      );
      this.modalRef.componentInstance.input_empresa = this.empresa;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason != "Cancelado") {
          this.activemodal.dismiss('accion');
        }
      });
    } else if (indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevaCuentaCargoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        }
      );
      this.modalRef.componentInstance.input_cuentaCargo = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason != "Cancelado") {
          this.activemodal.dismiss('accion');
        }
      });
    } else {
      this.modalRef = this.modalService.open(ConfirmarCuentaCargoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm',
        }
      );
      this.modalRef.componentInstance.input_cuentaCargo = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason != "Cancelado") {
          this.activemodal.dismiss('accion');
        }
      });
    }
  }
  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
