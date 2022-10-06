import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Usuario } from '../../../../../../models/usuario.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NuevoUsuarioConfirmarComponent } from '../nuevo-usuario-confirmar/nuevo-usuario-confirmar.component';
import { RolService } from '../../../../services/roles/roles.service';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { URL_SERVICIOSBACK } from '../../../../../../config/config';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: []
})
export class NuevoUsuarioComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() input_usuario_final;

  lsUsuarios = null;
  usuario: any = new Usuario();
  oldpass: string = "";
  confirm: string = "";
  lsPerfiles = [];
  lsPerfilesOrden: any [] = [];
  lsEstado = []
  objUsuario_final = null;
  validar: boolean = true;
  rol: number = null;
  infoToken: any;
  // public imagePath;
  // imgURL: any;
  // public fotoSeleccionada: File = null;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _userService: UsuarioService,
    public _rolService: RolService
  ) { }

  ngOnInit() {
    this.infoToken = JSON.parse(localStorage.getItem("InfoToken"));
    var idPerfil = JSON.parse(localStorage.getItem("InfoToken")).id_perfil;
    if (idPerfil == 1) {
      this.listarValores();
    } else {
    this.listarPorPerfiles();
    this.listarPorPerfilesxOrden();
    }
    console.log(this.listarPorPerfiles());

    if (this.input_usuario_final != null) {
      this.llenarValores();
    }
  }

  listarValores() {
    this.lsEstado = Constantes.ESTADO;
    this._rolService.listarPerfiles().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPerfiles = resp.aaData;
        console.log('1',resp.aaData);
      }
    })
  }

  listarPorPerfilesxOrden() { debugger
    this.lsEstado = Constantes.ESTADO;
    //var idPerfil = JSON.parse(localStorage.getItem("InfoToken")).id_perfil;
    //var perfil= info.id_perfil;
    var perfil = {
      "idPerfil": this.infoToken.id_perfil
    }
    this._rolService.listarPorPerfilesOrden(perfil).subscribe((resp: any) => {
      if (resp.estado == 1) {        
        this.lsPerfilesOrden = resp.aaData;
        console.log('3',resp.aaData);        
      }
    })
  }

  listarPorPerfiles() {
    var empresa =  JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this._rolService.listarPorPerfiles(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        let lsUsuariosFilter: Usuario[] = [];
        lsUsuariosFilter = resp.aaData;
        this.lsUsuarios = new MatTableDataSource<Usuario>(lsUsuariosFilter);
        this.lsUsuarios.paginator = this.paginator;
        console.log('2',resp.aaData);
      }
    })
  }

  llenarValores() {
    this.usuario = this.input_usuario_final;
    this.rol = this.input_usuario_final.perfil.idPerfil;
  }

  // porDefecto() {
  //   this.usuario.estado = true;
  //   this.fotoSeleccionada = new File([], 'default.jpg');
  // }

  // subirFoto(event) {
  //   var reader = new FileReader();
  //   this.fotoSeleccionada = event.target.files[0];
  //   this.imagePath = event.target.files;
  //   reader.readAsDataURL(this.fotoSeleccionada);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }

  // }

  verificarContrasena(event) {
    if (event) {
      if (this.usuario.password == this.confirm) {
        this.validar = true;
      } else {
        this.validar = false;
      }
    } else {
      this.confirm = "";
      this.usuario.password = "";
      this.validar = true;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  confirmarNuevoUsuario() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.asignandoObjetos();
    const modalRef = this.modalService.open(NuevoUsuarioConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_usuario_final = this.objUsuario_final;
    // modalRef.componentInstance.input_foto = this.fotoSeleccionada;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  asignandoObjetos() {
    this.objUsuario_final = {
      "usuario": this.usuario,
      "perfil": {
        "idPerfil": this.rol
      }
    }
  }

  verificarCorreo(valor) {
    var patron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})/
    if (!patron.test(valor) && this.usuario.email != "" && this.usuario.email != null) {
      Swal.fire({ title: "Correo inválido, ejemplo de formato: name@dir.do", timer: 2000, showConfirmButton: false });
    }
  }
}
