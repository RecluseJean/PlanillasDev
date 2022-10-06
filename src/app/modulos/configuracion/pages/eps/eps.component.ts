import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { Eps } from '../../../../models/Eps';
import { NuevoEpsComponent } from './modals/nuevo-eps/nuevo-eps.component';
import { EpsService } from '../../services/eps/eps.service';
import { ConfirmarNuevoEpsComponent } from './modals/confirmar-nuevo-eps/confirmar-nuevo-eps.component';
import Constantes from '../../../../models/Constantes';
import { PageEvent } from '@angular/material';
import { LIMIT } from '../../../../config/config';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-eps',
  templateUrl: './eps.component.html',
  styles: []
})
export class EpsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private EpsService: EpsService
  ) { }

  displayedColumns: string[] = [
    'descripcion',
    'aporte',
    'editar',
    'eliminar'
  ];

  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;
  empresa: Empresa = new Empresa();
  public listEps = null;
  listEpsFilter: any [] = [];
  public eps: Eps = new Eps();

  pA: number = 1;
  numItem = Constantes.numeroItem;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarEps(this.empresa);
    }
  }

  listarEps(empresa) {
    this.EpsService.listarEps(empresa).subscribe((resp: any) => {
      // this.listEps = resp.aaData;
      this.listEpsFilter = resp.aaData;
      this.listEps = new MatTableDataSource<Object>(this.listEpsFilter);
      this.listEps.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    debugger
    const filterValue = (event.target as HTMLInputElement).value;
    this.listEps.filter = filterValue.trim().toLowerCase();
  }

  crearEps() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarEps(eps_u) {
    var tmp_eps = Object.assign({}, eps_u);
    tmp_eps.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp_eps);
  }

  eliminarEps(eps_u) {
    var tmp_eps = Object.assign({}, eps_u);
    tmp_eps.accion = Constantes.ELIMINAR;
    this.openModal(tmp_eps);
  }

  public openModal(indice) {
    if (indice == null || indice.accion != "D") {
      const modalRef = this.modalService.open(NuevoEpsComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      modalRef.componentInstance.input_eps = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      const modalRef = this.modalService.open(ConfirmarNuevoEpsComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      modalRef.componentInstance.input_eps = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }
}
