import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sctr } from '../../../../../../models/Sctr';
import { ConfirmarNuevaSctrComponent } from '../confirmar-nueva-sctr/confirmar-nueva-sctr.component';


@Component({
    selector: 'app-nueva-sctr',
    templateUrl: './nueva-sctr.component.html',
    styles: []
  })
  export class NuevaSctrComponent implements OnInit{
      
    @Input() input_sctr;
    
    constructor(
        public activeModal : NgbActiveModal,
        private modalService: NgbModal,
    ){}

    sctr : any = new Sctr();

    lsTipo:Array<any>= [];
    desc_tipo: String;
    
    ngOnInit(){
        if(this.input_sctr!=null){
            this.sctr = this.input_sctr;
        }
        this.lsTipo = [{
          'idTipo': 1,
          'descripcion': "SALUD"
        },{
          'idTipo': 2,
          'descripcion':"PENSION"
        }];
    }

    close(){
        this.activeModal.dismiss('Cancelado');
      }

    confirmarNuevoSctr(){
        this.openModalConfirmar();
    }

    public openModalConfirmar() {
        const modalRef = this.modalService.open(ConfirmarNuevaSctrComponent,
          {
            backdrop: 'static',
            keyboard: false,
            size: 'sm'
          }
        );
        modalRef.componentInstance.input_sctr= this.sctr;
        modalRef.result.then((result) => {
       }, (reason) => {
          this.activeModal.close();
       });
      }

  }
