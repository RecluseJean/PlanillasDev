import { Component, OnInit, Input } from '@angular/core';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Solicitud } from '../../../../../../models/Solicitud';
import { ConfirmarEliminarSolicitudComponent } from '../confirmar-eliminar-solicitud/confirmar-eliminar-solicitud.component';
import { Empresa } from '../../../../../../models/Empresa';
import { Trabajador } from '../../../../../../models/Trabajador';

@Component({
  selector: 'app-visualizar-solicitud-empresa',
  templateUrl: './visualizar-solicitud-empresa.component.html',
  styles: []
})
export class VisualizarSolicitudEmpresaComponent implements OnInit {

  @Input() input_solicitud;

  constructor(
    public solicitudService: SolicitudService,
    public activemodal: NgbActiveModal,
    public router: Router,
    private modalService: NgbModal
  ) { }

  modalRef: NgbModalRef;
  public solicitud: any = new Solicitud(); 
  infoToken: any;

  ngOnInit() {
    this.solicitud = this.input_solicitud;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  aprobarSolicitud(solicitud){
    var tmp = Object.assign({}, solicitud);
    tmp.accion = Constantes.SOLICITUDAPROBADA 
    this.openModal(tmp);
  }

  rechazarSolicitud(solicitud){
    var tmp=Object.assign({},solicitud);
    tmp.accion=Constantes.SOLICITUDRECHAZADA    
    this.openModal(tmp);
  }

  openModal(solicitud) {
    if (solicitud.accion == "SA" || solicitud.accion == "SR") {
      this.modalRef = this.modalService.open(ConfirmarEliminarSolicitudComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'sm'
        })
      this.modalRef.componentInstance.input_solicitudDto = solicitud;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });     
    } 
  } 

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }


}
