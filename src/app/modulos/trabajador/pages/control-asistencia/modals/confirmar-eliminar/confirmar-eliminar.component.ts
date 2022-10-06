import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-eliminar',
  templateUrl: './confirmar-eliminar.component.html',
  styles:[]
})
export class ConfirmarEliminarComponent implements OnInit {
  
  @Input() input_accion;
  objGestion: any;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public asistenciaService: AsistenciaService,
    public faltaService: FaltaService,
    public permisoService: PermisoService
  ) { }

  ngOnInit() {
    this.objGestion = this.input_accion;
  }

  crud(){debugger
    switch(this.objGestion.accion){
      case 'A' : this.eliminarAsistencia() ;
      break;
      case 'F' : this.eliminarFalta();
      break;
      default : this.eliminarPermiso();
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  eliminarAsistencia(){
    this.asistenciaService.eliminarAsistencia(this.objGestion.idAsistencia).subscribe((resp:any)=>{
      if(resp.defaultObj){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.close();
      }else{
        Swal.fire(Constantes.ERROR,resp.msg,'error');
        this.activemodal.dismiss();
      }
    })
  }

  eliminarFalta(){
    this.faltaService.eliminarFalta(this.objGestion.idFalta).subscribe((resp:any)=>{
      if(resp.defaultObj){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.close();
      }else{
        Swal.fire(Constantes.ERROR,resp.msg,'error');
        this.activemodal.dismiss();
      }
    })
  }

  eliminarPermiso(){debugger
    this.permisoService.eliminarPermiso(this.objGestion.idPermiso).subscribe((resp:any)=>{debugger
      if(resp.defaultObj){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.close();
      }else{
        Swal.fire(Constantes.ERROR,resp.msg,'error');
        this.activemodal.dismiss();
      }
    })
  }

}
