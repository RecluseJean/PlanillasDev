import { Component, OnInit, Input } from '@angular/core';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import { ConfirmarNuevoTipoPlanillaComponent } from '../confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { ConfirmarPerfilesPlanillaComponent } from '../confirmar-perfiles-planilla/confirmar-perfiles-planilla.component';

@Component({
  selector: 'app-perfiles-planilla',
  templateUrl: './perfiles-planilla.component.html',
  styles: []
})
export class PerfilesPlanillaComponent implements OnInit {

  @Input()input_tipPlan;
  tipoPlanilla: TipoPlanilla;
  lsTipoPlanillaPerfiles: any[] = [];
  modalRef: NgbModalRef;
  titulo: String = "";

  constructor(
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public tipoPlanillaService: TipoPlanillaService

  ) { }

  ngOnInit() {
    if (this.input_tipPlan != null) {
      this.tipoPlanilla = this.input_tipPlan;
      this.titulo = this.tipoPlanilla.descripcion;
      this.listarPerfilesPorTipoPlanilla();
    }
  }

  listarPerfilesPorTipoPlanilla() {
    this.tipoPlanillaService.listarPerfilesPorTipoPlanilla(this.tipoPlanilla).subscribe((resp: any) => {
      if(resp.estado==1){
        this.lsTipoPlanillaPerfiles = resp.aaData;
      }
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  ver(perfil){
    var posicion = this.lsTipoPlanillaPerfiles.indexOf(perfil);
    if(perfil.estado == 0){
      perfil.estado = 1;
      this.lsTipoPlanillaPerfiles[posicion]=perfil;
    } else {
      perfil.estado = 0;
      this.lsTipoPlanillaPerfiles[posicion]=perfil;
    }
  }

  confirmar() {
    this.modalRef = this.modalService.open(ConfirmarPerfilesPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.componentInstance.input_lsTipoPlanillaPerfil = this.lsTipoPlanillaPerfiles;
    this.modalRef.result.then((result) => {
      this.activemodal.close();
    }, (reason) => {
    });
  }


}
