import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sctr } from '../../../../../../models/Sctr';
import { SctrService } from '../../../../services/sctr/sctr.service';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-confirmar-nueva-sctr',
    templateUrl: './confirmar-nueva-sctr.component.html',
    styles: []
  })
  export class ConfirmarNuevaSctrComponent implements OnInit{
    @Input() input_sctr;

    constructor(
        public activemodal : NgbActiveModal, 
        private SctrService: SctrService, 
        public router : Router
    ){}

    sctr: any = new Sctr();


    ngOnInit(){
        this.sctr = this.input_sctr;
    }

    close(){
        this.activemodal.dismiss('Cancelado');
    }
    
    crud(){ 
        switch(this.sctr.accion){
          case Constantes.ACTUALIZAR :  this.actualizarSctr();
          break;
          case Constantes.ELIMINAR : this.eliminarSctr();
          break;
          default : this.registrarSctr();
        }
      }
    
      eliminarSctr() { 
        this.SctrService.eliminarSctr(this.sctr).subscribe((resp:any) =>{
          if(resp.estado==1){
            Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
            this.refrescar(this.router.url);
          }else{
            Swal.fire(Constantes.ERROR,resp.msg , 'error');
          }
          this.activemodal.dismiss();
        })
      }
    
      actualizarSctr() {
        this.SctrService.actualizarSctr(this.sctr).subscribe((resp:any) =>{
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
    
      public registrarSctr() {

          this.SctrService.insertarSctr(this.sctr).subscribe((resp:any) => {
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
    
        public refrescar(url){
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate([url]));
        }



  }