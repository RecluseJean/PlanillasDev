import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Solicitud } from '../../../../../../models/Solicitud';
import Swal from 'sweetalert2';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { PuestoAreaEmpresa } from '../../../../../../models/PuestoAreaEmpresa';
import { Trabajador } from '../../../../../../models/Trabajador';

@Component({
  selector: 'app-confirmar-nueva-solicitud',
  templateUrl: './confirmar-nueva-solicitud.component.html',
  styles: []
})
export class ConfirmarNuevaSolicitudComponent implements OnInit {

  @Input() input_solicitud;
  
  constructor(
    public solicitudService: SolicitudService,
    public activemodal: NgbActiveModal,
    public router: Router
  ) { }

  public solicitud:any = new Solicitud();  
  public trabajador : any =new Trabajador();
  
  solicitudDto:any;
  
  ngOnInit() {
    this.solicitudDto = this.input_solicitud;
    this.trabajador = JSON.parse(localStorage.getItem('InfoToken')).trabajador;   
    
  }
  

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public registrarSolicitud() {   

    this.solicitudService.registrarSolicitud(this.solicitudDto).subscribe((resp: any) => {
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

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
  

}
