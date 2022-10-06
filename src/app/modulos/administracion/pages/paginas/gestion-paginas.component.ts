import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { EditarGestionPaginasComponent } from './modals/editar-gestion-paginas/editar-gestion-paginas.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-paginas',
  templateUrl: './gestion-paginas.component.html',
  styles: []
})
export class GestionPaginasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public modalService: NgbModal,
    public _usuarioService: UsuarioService) { }

  modalRef: NgbModalRef;
  lsPerfile: any = null;

  displayedColumns: string[] = [
    'perfil',
    'editar'
  ];

  ngOnInit() {
    this.listarPerfil();
  }

  listarPerfil() {
    this._usuarioService.listarPerfil().subscribe((resp: any) => {
      let lsPerfileFilter: Object[] = [];
      lsPerfileFilter = resp.aaData;
      this.lsPerfile = new MatTableDataSource<Object>(lsPerfileFilter);
      this.lsPerfile.paginator = this.paginator;
    })
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
