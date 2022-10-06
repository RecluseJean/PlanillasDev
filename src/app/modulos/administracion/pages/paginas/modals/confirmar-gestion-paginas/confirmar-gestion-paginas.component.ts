import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-gestion-paginas',
  templateUrl: './confirmar-gestion-paginas.component.html',
  styles: []
})
export class ConfirmarGestionPaginasComponent implements OnInit {

  @Input() input_moduloDTO;

  constructor(
    public activemodal: NgbActiveModal,
    public _usuarioService: UsuarioService,
    public router: Router,
  ) { }

  moduloDTO : any;

  ngOnInit() {
    this.moduloDTO = this.input_moduloDTO;
  }

  guardarGestion(){
    this._usuarioService.guardarGestion(this.moduloDTO).subscribe((resp: any) => {
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
