import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUsuarioComponent } from './modals/nuevo-usuario/nuevo-usuario.component';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { NuevoPasswordComponent } from './modals/nuevo-password/nuevo-password.component';
import Constantes from '../../../../models/Constantes';
import { Usuario } from '../../../../models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NuevoPasswordConfirmarComponent } from './modals/nuevo-password-confirmar/nuevo-password-confirmar.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styles: []
})

export class GestionUsuariosComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  lsUsuarios = null;
  modalRef: NgbModalRef;

  displayedColumns: string[] = [
    'nomusu',
    'documento',
    'correo',
    'rol',
    'estado',
    'actualizar',
    //'cambcontra',
    'reestacontra'
  ];

  constructor(
    public modalService: NgbModal,
    public _usuarioService: UsuarioService,
    private router: Router,
    public activemodal: NgbActiveModal,
  ) { }

  ngOnInit() { //debugger
    var empresa =  JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    var idPerfil = JSON.parse(localStorage.getItem("InfoToken")).id_perfil;
    if (idPerfil == 1 && empresa==null) {
      this.listarUsuarios();
    } else {
    this.listarUsuariosPorEmpresa();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarUsuarios() {
    this._usuarioService.listarUsuarios().subscribe((resp: any) => {
      if (resp.estado == 1) {
        let lsUsuariosFilter: Usuario[] = [];
        lsUsuariosFilter = resp.aaData;
        this.lsUsuarios = new MatTableDataSource<Usuario>(lsUsuariosFilter);
        this.lsUsuarios.paginator = this.paginator;
        console.log("xx", this.lsUsuarios)
      }
    })
  }

  listarUsuariosPorEmpresa() {
    var empresa =  JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this._usuarioService.listarUsuariosPorEmpresa(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        let lsUsuariosFilter: Usuario[] = [];
        lsUsuariosFilter = resp.aaData;
        this.lsUsuarios = new MatTableDataSource<Usuario>(lsUsuariosFilter);
        this.lsUsuarios.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsUsuarios.filter = filterValue.trim().toLowerCase();
  }

  nuevoUsuario() {
    let indice = null;
    this.openModal(indice);
  }

  public actualizarUsuario(user) {
    var tmp = Object.assign({}, user);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  public actualizarContra(user) {
    this.modalRef = this.modalService.open(NuevoPasswordComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_usuario = user;
  }

  /* public reestablecerContraseña(user) {
    this.modalRef = this.modalService.open(NuevoPasswordConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_usuario = user;
  } */

  public reestablecerContra(user) {
        this._usuarioService.reestablecerContraseña(user).subscribe((resp: any) => {
            if (resp.estado == 1) {
                Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
                this.refrescar(this.router.url);
            }
            else {
                Swal.fire(Constantes.ERROR, resp.msg, 'error');
                this.refrescar(this.router.url);
            }
        })
        this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate([url]));
}


  public openModal(indice) {

    this.modalRef = this.modalService.open(NuevoUsuarioComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_usuario_final = indice;
  }
}
