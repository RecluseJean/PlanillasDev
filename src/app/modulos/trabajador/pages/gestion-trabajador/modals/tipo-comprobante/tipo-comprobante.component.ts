import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoGestionTrabajadorComponent } from '../nuevo-gestion-trabajador/nuevo-gestion-trabajador.component';
import Constantes from '../../../../../../models/Constantes';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-tipo-comprobante',
    templateUrl: './tipo-comprobante.component.html',
    styles: []
})
export class TipoComprobanteComponent implements OnInit, OnDestroy {

    lsTipoComprobante: any[];
    tipoComp: number = 0;
    modalRef: NgbModalRef;
    trabajador: any;
    interval: any;
    contador: number = 0;

    constructor(
        public activemodal: NgbActiveModal,
        public router: Router,
        public modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.listarTiposComprobantes();
        this.trabajador = null;
        this.iniciarTemporizador();
    }

    ngOnDestroy() {
        if (this.modalRef != null) {
            this.modalRef.close();
        }
    }

    listarTiposComprobantes() {
        this.lsTipoComprobante = Constantes.tiposComprobantes;
    }

    close() {
        this.activemodal.close('Cancelado');
    }

    limpiar(event) {
        if (event == null) {
            this.tipoComp = 0;
        }
    }

    nuevoTrabajador() {
        this.modalRef = this.modalService.open(NuevoGestionTrabajadorComponent,
            {
                backdrop: 'static',
                keyboard: false,
                windowClass: 'modalLG'
            })
        this.modalRef.componentInstance.input_trabajador_final = this.trabajador;
        this.modalRef.componentInstance.input_tipo_comprobante = this.tipoComp;
        this.modalRef.result.then((result) => {
            this.activemodal.close();
        }, (reason) => {

        });
    }

    iniciarTemporizador(){
        document.onmousedown = () => {
            this.contador = 0;
          };
      
          this.interval = setInterval(() => {
            this.contador++;
            if (this.contador == Constantes.tiempoSegundos) {
              clearInterval(this.interval)
              this.close();
            }
          }, 1000)
    }

    
}
