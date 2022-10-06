import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NuevoEmpresaComponent } from './modals/nuevo-empresa/nuevo-empresa.component';
import { Empresa } from '../../../../models/Empresa';
import { EmpresaService } from '../../services/empresa/empresa.service';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevoEmpresaComponent } from './modals/confirmar-nuevo-empresa/confirmar-nuevo-empresa.component';
import { Router } from '@angular/router';
import { MostrarEncargadoPlanillaComponent } from './modals/mostrar-encargado-planilla/mostrar-encargado-planilla.component';
import { MostrarCuentaCargoComponent } from './modals/mostrar-cuenta-cargo/mostrar-cuenta-cargo.component';
import { PageEvent } from '@angular/material';
import { LIMIT } from '../../../../config/config';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsEmpresas', { static: true }) paginatorlsEmpresas: MatPaginator;
  @ViewChild('paginatorlsEmpresasInactiva', { static: true }) paginatorlsEmpresasInactiva: MatPaginator;
  @ViewChild('paginatorlsEmpresaxPerfil', { static: true }) paginatorlsEmpresaxPerfil: MatPaginator;

  

  constructor(
    private modalService: NgbModal,
    public empresaService: EmpresaService,
    public router: Router
  ) { }

  public lsEmpresas = null;
  public lsEmpresasInactiva = null;
  public lsEmpresaxPerfil = null;
  public lsEmpresasFiltro: any[] = [];
  public lsEmpresasInactivaFiltro: any[] = [];
  public lsEmpresaxPerfilFiltro: any[] = [];

  public objEmpresa_final: any = null;
  cerrar: boolean = false;
  modalRef: NgbModalRef;

  token: any;
  empresa: Empresa = new Empresa();
  defaultTab : any;
  activoShow = "";
  inactivoShow = "";
  activoActive = "";
  inactivoActive = "";

  displayedColumns: string[] = [
    'ruc',
    'parametro',
    'estado',
    'encargado',
    'cuenta',
    'editar',
    'darbaja',
  ];

  displayed2Columns: string[] = [
    'ruc',
    'parametro',
    'estado',
    'encargado',
    'cuenta',
    'editar',
    'activar',
    'eliminar'
  ];

  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;

  ngOnInit() {
    this.token= JSON.parse(localStorage.getItem('InfoToken'));
    this.empresa= JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

    if(this.token.id_perfil == 1){debugger
    this.gestionarTabs();
    this.listarEmpresa();
    this.listarEmpresaInactiva();
    }else{
    this.listarEmpresaxPerfil();
    }

  }

  ngOnDestroy() {
    if (this.modalRef != null && this.cerrar == false) {
      this.modalRef.close();
    }
  }

  public listarEmpresa() {
    this.empresaService.listarEmpresa().subscribe(resp => {
      if (resp.estado == 1) {
        this.lsEmpresasFiltro = resp.aaData;
        this.lsEmpresas = new MatTableDataSource<Object>(this.lsEmpresasFiltro);
        this.lsEmpresas.paginator = this.paginatorlsEmpresas;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  public listarEmpresaInactiva() {
    this.empresaService.listarEmpresaInactiva().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEmpresasInactivaFiltro = resp.aaData;
        this.lsEmpresasInactiva = new MatTableDataSource<Object>(this.lsEmpresasInactivaFiltro);
        this.lsEmpresasInactiva.paginator = this.paginatorlsEmpresasInactiva;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  public listarEmpresaxPerfil() {
        this.lsEmpresaxPerfilFiltro = [this.empresa]
        this.lsEmpresaxPerfil = new MatTableDataSource<Object>(this.lsEmpresaxPerfilFiltro);
        this.lsEmpresaxPerfil.paginator = this.paginatorlsEmpresas;
    };
  


  listarEncargadoPlan(empresa) {
    var empresa_tmp = Object.assign({}, empresa);
    empresa_tmp.accion = "LEP";
    this.openModal(empresa_tmp)
  }

  listarCuentaCargo(empresa) {
    var tmp = Object.assign({}, empresa);
    tmp.accion = "LCC";
    this.openModal(tmp)
  }

  nuevoEmpresa() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarEmpresa(empresa_u) {
    var empresa_tmp = Object.assign({}, empresa_u);
    empresa_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(empresa_tmp);
  }

  eliminarEmpresa(empresa_d) {
    var empresa_tmp = Object.assign({}, empresa_d);
    empresa_tmp.accion = Constantes.ELIMINAR;
    this.openModal(empresa_tmp);
  }

  darBajaEmpresa(empresa) {
    var tmp = Object.assign({}, empresa);
    tmp.accion = "DB";
    this.empresaService.darBajaEmpresa(empresa).subscribe((resp: any) => {
      Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      this.refrescar(this.router.url);
    });
    // this.openModal(tmp);
  }

  activarEmpresa(empresa) {
    var tmp = Object.assign({}, empresa);
    tmp.accion = "AC";
    this.empresaService.activarEmpresa(empresa).subscribe((resp: any) => {
      Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      this.refrescar(this.router.url);
    });
    // this.openModal(tmp);
  }

  armarObjeto(empresa) {
    this.objEmpresa_final = {
      "empresa": empresa,
    }
  }

  public openModal(indice) {
    this.armarObjeto(indice);
    if (indice == null || indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        }
      );
      this.modalRef.componentInstance.input_empresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "LEP") {
      this.modalRef = this.modalService.open(MostrarEncargadoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdB'
        }
      );
      this.modalRef.componentInstance.input_empresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason == "accion") {
          this.cerrar = true;
          this.refrescar(this.router.url);
          this.openModal(indice)
        }
      });
    } else if (indice.accion == "LCC") {
      this.modalRef = this.modalService.open(MostrarCuentaCargoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',
          windowClass: 'modal-mdCC'
        }
      );
      this.modalRef.componentInstance.input_empresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason == "accion") {
          this.cerrar = true;
          this.refrescar(this.router.url);
          this.openModal(indice)
        }
      });
    } else {
      this.modalRef = this.modalService.open(ConfirmarNuevoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_empresa = this.objEmpresa_final;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsEmpresas.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsEmpresasInactiva.filter = filterValue.trim().toLowerCase();
  }

  gestionarTabs(){
    this.defaultTab = JSON.parse(localStorage.getItem('defaultTabs'));
    if (this.defaultTab.pagEmpresa.estado) {
      this.activoActive = this.defaultTab.active
      this.activoShow =  this.defaultTab.descripcion;
      this.inactivoActive = "";
      this.inactivoShow = "";
    } else {
      this.inactivoActive = this.defaultTab.active
      this.inactivoShow = this.defaultTab.descripcion;
      this.activoActive = "";
      this.activoShow = "";
    }
  }

  cambiarTabs(valor){
    this.defaultTab.pagEmpresa.estado = valor;
    localStorage.setItem("defaultTabs", JSON.stringify(this.defaultTab));
  }

}
