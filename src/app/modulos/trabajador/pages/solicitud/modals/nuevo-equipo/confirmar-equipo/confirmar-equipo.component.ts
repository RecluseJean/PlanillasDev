import { Component, OnInit, Input } from '@angular/core';
import { Equipo } from '../../../../../../../models/Equipo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipoService } from '../../../../../services/equipo/equipo.service';
import { Usuario } from '../../../../../../../models/usuario.model';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { Trabajador } from '../../../../../../../models/Trabajador';

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
    this.EquipoService.insertarEquipo(tmp_equi).subscribe((resp: any) => {
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
