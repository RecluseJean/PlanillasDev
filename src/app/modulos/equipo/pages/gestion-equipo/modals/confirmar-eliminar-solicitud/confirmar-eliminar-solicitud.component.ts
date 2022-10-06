import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Solicitud } from '../../../../../../models/Solicitud';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-eliminar-solicitud',
  templateUrl: './confirmar-eliminar-solicitud.component.html',
  styles: []
})
export class ConfirmarEliminarSolicitudComponent implements OnInit {

  @Input() input_solicitudDto;

  constructor(
    public solicitudService: SolicitudService,
    public activemodal: NgbActiveModal,
    public router: Router
  ) { }

  solicitudDto: any;
  //solicitudRevision: number = Constantes.solicitudRevision;

  public solicitud:any = new Solicitud(); 

  ngOnInit() {
    this.solicitud = this.input_solicitudDto;
    
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  crud(){
    switch(this.solicitud.accion){
      
      case Constantes.CANCELARSOLICITUD : this.cancelarSolicitud();
      break;
      case Constantes.SOLICITUDREVISION: this.revisionSolicitud();
      break;
      case Constantes.SOLICITUDAPROBADA: this.aprobarSolicitud();
      break;
      case Constantes.SOLICITUDRECHAZADA: this.rechazarSolicitud();
      break;
    }
  }
  cancelarSolicitud() {
    this.solicitudService.cancelarSolicitud(this.solicitud).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  revisionSolicitud() {
    this.solicitudService.cambiarEstadoRevision(this.solicitud).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  aprobarSolicitud() {
    this.solicitudService.cambiarEstadoAprobado(this.solicitud).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  rechazarSolicitud() {
    this.solicitudService.cambiarEstadoRechazado(this.solicitud).subscribe((resp:any) =>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        this.refrescar(this.router.url);
      }else{
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
      }
      this.activemodal.dismiss();
    })
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

  

}

