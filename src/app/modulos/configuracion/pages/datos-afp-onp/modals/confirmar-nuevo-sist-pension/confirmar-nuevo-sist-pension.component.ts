import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Afp} from '../../../../../../models/Afp';
import Constantes from '../../../../../../models/Constantes';
import { AfpService } from '../../../../services/afp/afp.service';
import { Empresa } from '../../../../../../models/Empresa';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmar-nuevo-sist-pension',
  templateUrl: './confirmar-nuevo-sist-pension.component.html',
  styles: []
})
export class ConfirmarNuevoSistPensionComponent implements OnInit {

  @Input() input_afp;

  constructor(
    public activemodal : NgbActiveModal,
    public afpService : AfpService,
    public router: Router
  ) { }

  public afp : any = new Afp();
  empresa: Empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

  ngOnInit() {
    this.afp = this.input_afp;
  }
  close(){
    this.activemodal.dismiss('Cancelado');
  }

  crud(){
    switch(this.afp.accion){
      case Constantes.ACTUALIZAR :  this.actualizarAfp();
      break;
      case Constantes.ELIMINAR : this.eliminarAfp();
      break;
      default : this.registrarAfp();
    }
  }

  registrarAfp(){
    var tmp_fp = {
      "afp": this.afp,
      "empresa": this.empresa
    }
    this.afpService.registrarAfp(tmp_fp).subscribe((resp:any) =>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.refrescar(this.router.url);
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
        },
        (err) =>{
          Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
      this.activemodal.dismiss();
  }

  actualizarAfp(){
    var tmp_fp = {
      "afp": this.afp,
      "empresa": this.empresa
    }
    this.afpService.actualizarAfp(tmp_fp).subscribe(resp => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    });
  }

  eliminarAfp(){
    this.afpService.eliminarAfp(this.afp).subscribe(resp => {
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    });
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

}
