import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { ConceptoCuentaService } from '../../../../services/concepto-cuenta/concepto-cuenta.service';

@Component({
  selector: 'app-confirmar-vista-plame',
  templateUrl: './confirmar-vista-plame.component.html',
  styles: []
})
export class ConfirmarVistaPlameComponent implements OnInit {

  @Input() input_empresaDTO;

  constructor(
    public activemodal: NgbActiveModal,
    public conceptoCuentaService: ConceptoCuentaService,
    public router: Router,
  ) { }


  empresaDTO : any;

  ngOnInit() {

    this.empresaDTO = this.input_empresaDTO;
  }

  guardarConfigVPlame(){
    this.conceptoCuentaService.guardarConfigVPlame(this.empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, 'Cambios guardados correctamente', 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, 'Error al guardar cambios', 'error');
      }
      this.activemodal.dismiss();
    })
  }


  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.close();
  }

}
