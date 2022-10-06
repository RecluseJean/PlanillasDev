import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../modulos/administracion/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { idLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-confirmar-asistencia',
  templateUrl: './confirmar-asistencia.component.html',
  styles: []
})
export class ConfirmarAsistenciaComponent implements OnInit {

  @Input() input_asistencia;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  asistencia: any;
  ngOnInit() {
    this.asistencia = this.input_asistencia;
  }

  close() {
    this.activemodal.close();
  }

  tipoAsistencia(){debugger
    if (this.asistencia.accion == "E") {
      this.marcarEntrada();
    }if(this.asistencia.accion == "I"){
      this.marcarInicio();
    }if(this.asistencia.accion == "S"){
      this.marcarSalida();
    }else{
      this.marcarFin();
    }
  }

  

  marcarEntrada() {debugger
    this.usuarioService.marcarAsistencia(this.asistencia).subscribe((resp:any) => {
        if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success")
        localStorage.clear();
        this.router.navigate(["/login"]);
      } else if (resp.estado == 3) {
        Swal.fire(Constantes.INFO, resp.msg, "info")
      }
      this.activemodal.dismiss();
    })
  }

  marcarInicio() {debugger
    this.usuarioService.marcarAlmuerzo(this.asistencia).subscribe((resp:any) => {debugger
        if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success")
        localStorage.clear();
        this.router.navigate(["/login"]);
      } else if (resp.estado == 3) {
        Swal.fire(Constantes.INFO, resp.msg, "info")
      }
      this.activemodal.dismiss();
    })
  }

  marcarSalida() {debugger
    this.usuarioService.marcarAsistencia(this.asistencia).subscribe((resp:any) => {debugger
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success")
        localStorage.clear();
        this.router.navigate(["/login"]);
      } else if (resp.estado == 3) {
        Swal.fire(Constantes.INFO, resp.msg, "info")
      }
      this.activemodal.dismiss();
    })
  }

  marcarFin(){
    this.usuarioService.marcarAlmuerzo(this.asistencia).subscribe((resp:any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success")
        localStorage.clear();
        this.router.navigate(["/login"]);
      } else if (resp.estado == 3) {
        Swal.fire(Constantes.INFO, resp.msg, "info")
      }
      this.activemodal.dismiss();
    })
  }

}