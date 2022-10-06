import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Empresa } from '../../../../../../models/Empresa';
import { Parametros } from '../../../../../../models/parametros.models'
import Swal from 'sweetalert2';
import { ParametroService } from '../../../../services/parametro/parametro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-nuevo-parametro',
  templateUrl: './confirmar-nuevo-parametro.component.html',
  styles: []
})
export class ConfirmarNuevoParametroComponent implements OnInit {

  @Input() input_parametro;

  constructor(
    public activemodal : NgbActiveModal,
    public parametroService: ParametroService,
    public router: Router
  ) { }
  
  parametro: any = new Parametros();
  empresa: Empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

  ngOnInit() {
    this.parametro = this.input_parametro;
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  crud(){ 
    switch(this.input_parametro.accion){
      case Constantes.ACTUALIZAR :  this.actualizarPar();
      break;
      case Constantes.ELIMINAR : this.eliminarPar();
      break;
      default : this.registrarPar();
    }
  }
  
  actualizarPar() {
    var tmp_par = {
      "parametro": this.parametro,
      "empresa": this.empresa
    }
    this.parametroService.actualizarParametro(tmp_par).subscribe((resp:any) =>{
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
  eliminarPar() {
  }
  registrarPar() {
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

}
