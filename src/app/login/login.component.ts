import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario.model";
import Swal from "sweetalert2";
import Constantes from "../models/Constantes";
import { UsuarioService } from "../modulos/administracion/services/usuarios/usuario.service";
import { Empresa } from "../models/Empresa";
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecuperarPasswordComponent } from './modals/recuperar-password/recuperar-password.component';

const publicIp = require("public-ip");

declare function init_plugins();
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  token: any;
  error: string;
  loadRegister: boolean;
  ipPublica: string;
  mostrarPassword: false;
  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.token = localStorage.getItem("token");
    this.loadRegister = false;
    (async () => {
      this.ipPublica = await publicIp.v4();
    })();
    if (this.token) {
      this.router.navigate(["/inicio"]);
    }
  }

  login() { //debugger
    this._usuarioService.login(this.usuario).subscribe(
      (data: any) => {
        localStorage.setItem("InfoToken", JSON.stringify(data));
        if (data.id_perfil == 1 || data.id_perfil == 2 || data.id_perfil == 4 || data.id_perfil == 5) {
          if (data.id_perfil == 2 || data.id_perfil == 4 || data.id_perfil == 5) {
            if (data.empresa.estado != 1) {
              Swal.fire(Constantes.WARNING, "La empresa ha sido dada de baja, por favor comuníquese con los desarrolladores del sistema", "warning");
              return;
            }
          }
          this.router.navigate(["/inicio"]);
          this.tipoPerfil(data);
          this.setearDefaultTabs();
        } else if (data.id_perfil == 3) {
          if (data.empresa.estado != 1) {
            Swal.fire(Constantes.WARNING, "La empresa a la cual pertenece ha sido dada de baja, por favor espere hasta que se solucione el inconveniente", "warning");
            return;
          }
          this.router.navigate(["/asistencia"]);
          // Swal.fire(Constantes.INFO, "Usted no tiene permiso para acceder a la aplicación web, intente ingresar a la aplicación móvil", "info");
        }
      },
      (err) => {
        if (err.status == 400) {
          Swal.fire(Constantes.ERROR,"¡El nombre de usuario o la contraseña son incorrectos!", "error");
        }
      }
    );
  }

  tipoPerfil(data) {
    if (data.id_perfil != 1 || data.empresa != null) {
      localStorage.setItem("objEmpresaSeleccion", JSON.stringify(data.empresa));
      if (data.id_perfil == 2) {
        this.asociarHuellero(data.empresa);
      }
    }
  }

  asociarHuellero(empresa: Empresa) {
    empresa.ruc = this.ipPublica;
    this._usuarioService.asignarHuellero(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success");
      }
    });
  }

  setearDefaultTabs() {
    var defaultTabs = {
      "pagEmpresa": {
        "estado": true
      },
      "pagTrabajador": {
        "estado": true
      },
      "pagPrestamo": {
        "estado": true
      },
      "descripcion": "show active",
      "active": "active"
    }
    localStorage.setItem("defaultTabs", JSON.stringify(defaultTabs));
  }

  public openModal() {
     this.modalRef = this.modalService.open(RecuperarPasswordComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
        // this.modalRef.componentInstance.input_trabajador_final = indice;
  }
}
