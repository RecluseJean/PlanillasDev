import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Trabajador } from '../../../../../../models/Trabajador';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-gestion-suspencion',
  templateUrl: './gestion-suspencion.component.html',
  styles: []
})
export class GestionSuspencionComponent implements OnInit {

  @Input() input_trabajador;

  constructor(
    public activemodal : NgbActiveModal,
    public planillasService: PlanillasService,
  ) { }

  trabajador: any = new Trabajador();
  selecArch: File;

  ngOnInit() {
    this.trabajador = this.input_trabajador;
  }

  subirSuspencion(archivo){
    this.selecArch = archivo.target.files[0];

    this.planillasService.subirArchivo(this.selecArch,  this.trabajador.idTrabajador).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    })
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  descargarSuspencion (){
    this.planillasService.descargarSuspencion(this.trabajador).subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], { type: 'application/pdf' });
        saveAs(file, "SUSP-" + this.trabajador.nroDoc);
        Swal.fire(Constantes.SUCCESS, "RHE descargado correctamente", 'success');
      } else { Swal.fire(Constantes.ERROR, "Error al descargar RHE", 'error'); }
    })
  }

}
