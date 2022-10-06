import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { DerechoHabiente } from '../../../../../../models/Derecho-Habiente';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-derecho-habiente',
  templateUrl: './confirmar-derecho-habiente.component.html',
  styles: []
})
export class ConfirmarDerechoHabienteComponent implements OnInit {

  @Input() input_derHab;
  @Input() input_trabajador

  trabajador:Trabajador = new Trabajador();
  derechoHabiente: DerechoHabiente = new DerechoHabiente();
  lsDerHabReg: any[] = [];

  constructor(
    public activemodal : NgbActiveModal,
    public trabajadorService:TrabajadorService,
    public router: Router,
  ) { }

  ngOnInit() {
    if(this.input_trabajador!=null && this.input_derHab != null){
        this.trabajador = this.input_trabajador;
        this.derechoHabiente = this.input_derHab;
    }
  
  }

  seleccionarOpcion(){
    if(this.derechoHabiente.accion == "R"){
      this.registrarDH();
    } else{
      this.darBajaDH();
    }
  }

  
  darBajaDH() {
    this.trabajadorService.darBajaDH(this.derechoHabiente).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
    this.listarDereHabActivo();

  }

  listarDereHabActivo() {
    this.trabajadorService.listarDerHabActivo(this.trabajador).subscribe((resp: any) => {
      this.lsDerHabReg = resp.aaData;
      //this.lsDerHabAct = new MatTableDataSource<any>(this.lsDerHabReg);
    })
  }

  registrarDH(){ 
    var tmp = {
      "trabajador": this.trabajador,
      "derechoHabientes":this.derechoHabiente,
    }
    this.trabajadorService.registrarDH(tmp).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
        },
        (err) =>{
          Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
      this.activemodal.dismiss();
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

}
