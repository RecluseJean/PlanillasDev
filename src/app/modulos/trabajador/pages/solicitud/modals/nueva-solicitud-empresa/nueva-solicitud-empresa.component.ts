import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Trabajador } from '../../../../../../models/Trabajador';
import { ProyeccionPuesto } from '../../../../../../models/ProyeccionPuesto';
import { Solicitud } from '../../../../../../models/Solicitud';
import { SolicitudService } from '../../../../services/solicitud/solicitud.service';
import { ConfirmarNuevaSolicitudComponent } from '../confirmar-nueva-solicitud/confirmar-nueva-solicitud.component';
import { Empresa } from '../../../../../../models/Empresa';

@Component({
  selector: 'app-nueva-solicitud-empresa',
  templateUrl: './nueva-solicitud-empresa.component.html',
  styles: []
})
export class NuevaSolicitudEmpresaComponent implements OnInit {

  @Input() input_solicitud;

  constructor(
    public solicitudService: SolicitudService,
    public activemodal: NgbActiveModal,
    public router: Router,
    private modalService: NgbModal
   ) { }

  modalRef: NgbModalRef;
  public solicitud: any = new Solicitud();
  public puestoProy : any = new ProyeccionPuesto();
  public trabajador : any =new Trabajador();
  public empresa: Empresa = new Empresa();
  lsPuestoProyOrden: Array<any> = [];
  lsPuesto: any[] = [];
  iidPuesto: number;
  token: any;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.solicitud = this.input_solicitud;
    this.trabajador = JSON.parse(localStorage.getItem('InfoToken')).trabajador;
    //console.log(this.trabajador);
    //this.listarPuestoPorOrden();
    if(this.trabajador!=null){debugger
       this.listarPuestoPorOrden();
       this.listarPuesto();
    }else {this.listarPuesto(); }
    
    this.token = JSON.parse(localStorage.getItem("InfoToken"));
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarPuestoPorOrden() {debugger
    this.solicitudService.listarPuestoPorOrden(this.trabajador).subscribe((resp: any) => {
      this.lsPuestoProyOrden = resp.aaData;
    })
  }

  listarPuesto() {debugger
    this.solicitudService.listarPuestoAreaEmp(this.empresa).subscribe((resp: any) => {
      this.lsPuesto = resp.aaData;
      console.log('lsPuestoGen',resp.aaData);
    })
  }

  confirmarNuevaSolicitudRecurso() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    var solicitudDto = this.armarSolicitudDto();
    this.modalRef = this.modalService.open(ConfirmarNuevaSolicitudComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_solicitud = solicitudDto ;
    //this.modalRef.componentInstance.input_proy = this.puestoProy;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  armarSolicitudDto(){
    var solicitudDTO = {
      "solicitud":  this.solicitud,
      "puesto": {
        "iidPuesto": this.iidPuesto
      },
      "usuario": {
        "idUsuario": this.token.id_usuario
      }
      /* "trabajador": {
        "idTrabajador": this.trabajador.idTrabajador
      } */
    } 
    return solicitudDTO;
  }

}
