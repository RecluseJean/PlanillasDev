import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { Pagina } from '../../../../../../models/Pagina';
import { Router } from '@angular/router';
import { ConfirmarGestionPaginasComponent } from '../confirmar-gestion-paginas/confirmar-gestion-paginas.component';

@Component({
  selector: 'app-editar-gestion-paginas',
  templateUrl: './editar-gestion-paginas.component.html',
  styles: []
})
export class EditarGestionPaginasComponent implements OnInit, OnDestroy {

  @Input() input_perfil;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public _usuarioService: UsuarioService
  ) { }

  modalRef:NgbModalRef;

  lsPaginas: any[] = []
  perfil: any;

  ngOnInit() {
    this.perfil = this.input_perfil;
    this.listarModulo();
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  listarModulo() {
    this._usuarioService.cargarPaginasPerfil(this.perfil).subscribe((resp: any) => {
      var lsPag: any[] = [];
      for (const modulo of resp.aaData) {
        for (const pagina of modulo.lspagina) {
          // pagina.asignado = false
          lsPag.push(pagina);
        }
      }
      this.listarPaginas(lsPag);
    })
  }

  listarPaginas(lsPag) {
    this._usuarioService.listarPagina().subscribe((resp: any) => {
      this.lsPaginas = resp.aaData;

      setTimeout(() => {
        for (let i = 0; i < this.lsPaginas.length; i++) {
          var checkND: any = document.getElementById('input' + i);
          checkND.checked = false;
          this.lsPaginas[i].asignado = false;
          for (const p of lsPag) {
            if (p.idPagina == this.lsPaginas[i].idPagina) {
              this.lsPaginas[i].asignado = true;
              checkND.checked = true;
              break
            }
          }
        }
      }, 100);
    })
  }

  cambiarAsignado(index) {
    var checkND: any = document.getElementById('input' + index);
    var estado: boolean = checkND.checked;
    this.lsPaginas[index].asignado = estado;
  }

  guardarGestion() {

    for (let i = 0; i < this.lsPaginas.length; i++) {
      if (this.lsPaginas[i].asignado == true) {
        this.lsPaginas[i].url = "A"
      } else {
        this.lsPaginas[i].url = "D"
      }
    }

    var moduloDTO = {
      "lsPagina": this.lsPaginas,
      "perfil": this.perfil
    }

    this.openModalConfirmar(moduloDTO)
  }

  public openModalConfirmar(moduloDTO) {
    this.modalRef = this.modalService.open(ConfirmarGestionPaginasComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_moduloDTO=moduloDTO;
    this.modalRef.result.then((result) => {
   }, (reason) => {
     this.activemodal.close();
   });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
