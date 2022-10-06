import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../../models/Constantes';
import { Equipo } from '../../../../../../../models/Equipo';
import { Trabajador } from '../../../../../../../models/Trabajador';
import { Usuario } from '../../../../../../../models/usuario.model';
import { EquipoService } from '../../../../../../../modulos/equipo/services/equipo/equipo.service';
import Swal from 'sweetalert2';
import { SolicitudService } from '../../../../../../../modulos/equipo/services/solicitud/solicitud.service';

@Component({
  selector: 'app-confirmar-equipo',
  templateUrl: './confirmar-equipo.component.html',
  styles: []
})
export class ConfirmarEquipoComponent implements OnInit {


  @Input() input_equipo;

  constructor(
    public activemodal: NgbActiveModal,
    private EquipoService : EquipoService,
    private SolicitudService : SolicitudService,
    public router: Router
  ) { }

  equipo:  any = new Equipo();
  public usuario: any = new Usuario();
  public trabajador: any = new Trabajador();
  infoToken: any;
  ngOnInit() {

    this.equipo=this.input_equipo;
    this.trabajador = JSON.parse(localStorage.getItem('InfoToken')).trabajador;
    //this.usuario = JSON.parse(localStorage.getItem('InfoToken')).usuario;
    this.infoToken = JSON.parse(localStorage.getItem("InfoToken"));
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  crud(){
    switch(this.equipo.accion){
      case Constantes.ELIMINAR : this.eliminarTrabajadorEquipo();
      break;
      default : this.registrarEquipo();
    }
  }

  public registrarEquipo() {
    var tmp_equi = {
      /* "trabajador": {
        "idTrabajador": this.trabajador.idTrabajador
      }, */
      "usuario": {
        "idUsuario": this.infoToken.id_usuario
      },
      "equipo": {
        "descripcion": this.equipo.descripcion
      }
    }
    this.SolicitudService.insertarEquipo(tmp_equi).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  eliminarTrabajadorEquipo() {
    this.EquipoService.eliminarTrabajadorEquipo(this.equipo).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}
