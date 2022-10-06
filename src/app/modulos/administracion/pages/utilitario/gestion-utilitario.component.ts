import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';

@Component({
  selector: 'app-gestion-utilitario',
  templateUrl: './gestion-utilitario.component.html',
  styles: []
})
export class GestionUtilitarioComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  descargarTodo(){
    const dirArchivo = "comprimido";
    this.usuarioService.descargarTodo().subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], {type:'application/zip'});
        saveAs(file, dirArchivo);
        Swal.fire(Constantes.SUCCESS,"Descarga completada",'success');
        } else {
          Swal.fire(Constantes.ERROR,"Error al descargar Contrato",'error');
        }
    })
  }

}
