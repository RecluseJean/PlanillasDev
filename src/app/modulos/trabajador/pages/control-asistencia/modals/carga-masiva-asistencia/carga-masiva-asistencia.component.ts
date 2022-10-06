import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Empresa } from '../../../../../../models/Empresa';

@Component({
  selector: 'app-carga-masiva-asistencia',
  templateUrl: './carga-masiva-asistencia.component.html',
  styles: []
})
export class CargaMasivaAsistenciaComponent implements OnInit {

  constructor(
    public activemodal: NgbActiveModal,
    public asistenciaService: AsistenciaService,
  ) { }

  private selecArch: File;
  empresa: any = new Empresa();

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
  }

  escogerArchivo(asistencia){
    this.selecArch = asistencia.target.files[0];
    var check: any = document.getElementById('huellero');
    if(check.checked){
      this.cargaHuellero();
    } else {
      Swal.fire(Constantes.INFO,"No implementado aún",'info');
    }
  }

  cargaHuellero(){
    this.asistenciaService.cargaMasivaAsistencia(this.selecArch, this.empresa).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        } else {
          Swal.fire(Constantes.ERROR,resp.msg,'error');
        }
    });
    this.activemodal.dismiss();
  }

  close() {
    this.activemodal.close();
  }

}
