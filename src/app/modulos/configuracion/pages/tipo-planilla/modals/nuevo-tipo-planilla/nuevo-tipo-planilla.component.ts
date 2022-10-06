import { Component, OnInit, Input } from '@angular/core';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarNuevoTipoPlanillaComponent } from '../confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-tipo-planilla',
  templateUrl: './nuevo-tipo-planilla.component.html',
  styles: []
})
export class NuevoTipoPlanillaComponent implements OnInit {

  @Input() input_tipPlan;

  modalRef: NgbModalRef;
  tipoPlanilla = new TipoPlanilla();
  lsTipoCategoria = Constantes.tipoCategoria;
  lsPerfiles: any[] = [];
  categoriaPlanilla: number;
  msg: string;
  displayedColumns: string[] = [
    'nombre',
    'ver_perfil'
  ];

  constructor(
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public tipoPlanillaService: TipoPlanillaService
  ) { }

  ngOnInit() {
    if (this.input_tipPlan != null) {
      this.tipoPlanilla = this.input_tipPlan;
      this.categoriaPlanilla = this.input_tipPlan.categoriaPlanilla;
    } else {
      this.listarPerfiles();
    }
  }

  listarPerfiles() {
    this.tipoPlanillaService.listarPerfiles().subscribe((resp: any) => {
      this.lsPerfiles = resp.aaData;
      for (let i = 0; i < this.lsPerfiles.length; i++) {
        this.lsPerfiles[i].ambito = 0;
      }
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmar() {
    this.tipoPlanilla.categoriaPlanilla = this.categoriaPlanilla;
    this.modalRef = this.modalService.open(ConfirmarNuevoTipoPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.componentInstance.input_tipPlan = this.tipoPlanilla;
    this.modalRef.componentInstance.input_lsPerfiles = this.lsPerfiles;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  ver(perfil){
    var posicion = this.lsPerfiles.indexOf(perfil);
    if(perfil.ambito == 0){
      perfil.ambito = 1;
      this.lsPerfiles[posicion]=perfil;
    } else {
      perfil.ambito = 0;
      this.lsPerfiles[posicion]=perfil;
    }
  }

  mostrarMsj(event){
    if (this.input_tipPlan != null) {
      if (this.input_tipPlan.categoriaPlanilla != this.categoriaPlanilla){
        this.msg = Constantes.mensajeNuevoTipoPlanillaConf;
        Swal.fire(Constantes.WARNING, this.msg, 'warning');
      }
    }
  }

}
