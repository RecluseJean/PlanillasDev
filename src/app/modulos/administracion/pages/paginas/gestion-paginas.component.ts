import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { EditarGestionPaginasComponent } from './modals/editar-gestion-paginas/editar-gestion-paginas.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NuevoPerfilComponent } from './modals/nuevo-perfil/nuevo-perfil.component';

@Component({
  selector: 'app-gestion-paginas',
  templateUrl: './gestion-paginas.component.html',
  styles: []
})
export class GestionPaginasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public modalService: NgbModal,
    public _usuarioService: UsuarioService,
    public activemodal: NgbActiveModal) { }

  modalRef: NgbModalRef;
  lsPerfile: any = null;

  displayedColumns: string[] = [
    'perfil',
    'editar'
  ];

  ngOnInit() {
    this.listarPerfil();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarPerfil() {
    this._usuarioService.listarPerfil().subscribe((resp: any) => {
      let lsPerfileFilter: Object[] = [];
      lsPerfileFilter = resp.aaData;
      this.lsPerfile = new MatTableDataSource<Object>(lsPerfileFilter);
      this.lsPerfile.paginator = this.paginator;
    })
  }

  nuevoPerfil() {
    let indice = null;
    this.openModal(indice);
  }

  public openModal(indice) {

    this.modalRef = this.modalService.open(NuevoPerfilComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_perfil_nuevo = indice;
  }

  gestionPaginas(perfil) {
    this.modalRef = this.modalService.open(EditarGestionPaginasComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_perfil = perfil;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsPerfile.filter = filterValue.trim().toLowerCase();
  }

}
