import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import Constantes from '../../../../../../models/Constantes';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevaAsistenciaComponent } from '../nueva-asistencia/nueva-asistencia.component';
import { Router } from '@angular/router';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';



@Component({
    selector: 'app-mostrar-asistencias',
    templateUrl: './mostrar-asistencias.component.html',
    styles: []
})
export class MostrarAsistenciasComponent implements OnInit,OnDestroy {

    @Input() input_trabajador;
    @Input() input_ano;
    @Input() input_mes;

    objTrabajadorContrato: any;
    lsTrabAsistencias: any = [];
    ano: Año = new Año();
    mes: Mes = new Mes();
    modalRef: NgbModalRef

    constructor(
        public asistenciaService: AsistenciaService,
        public modalService: NgbModal,
        public activemodal: NgbActiveModal,
    ) { }

    ngOnInit() {
        this.objTrabajadorContrato = this.input_trabajador;
        this.ano = this.input_ano;
        this.mes = this.input_mes;
        this.listarAsistencias();
    }
    
    ngOnDestroy(){
        if(this.modalRef!=null){
            this.modalRef.close();
        }
    }
    listarAsistencias() {
        this.asistenciaService.listarAsistenciasPorTrabajador(this.objTrabajadorContrato.trabajador, this.ano, this.mes).subscribe((resp: any) => {
            if (resp.estado == 1) {
                this.lsTrabAsistencias = resp.aaData;
            }
        })
    }

    nuevaAsistencia() {
        var tmp = Object.assign({}, this.objTrabajadorContrato.trabajador);
        tmp.accion = Constantes.REGISTRAR;
        this.openModal(tmp, null);
    }

    public openModal(trabajador, asistencia) {

        this.modalRef = this.modalService.open(NuevaAsistenciaComponent,
            {
                backdrop: 'static',
                keyboard: false,
                windowClass: 'modalMD'
            })
        this.modalRef.componentInstance.input_trabajador = trabajador;
        this.modalRef.componentInstance.input_asistencia = asistencia;
        this.modalRef.result.then((result) => {
            this.activemodal.close();
        });
    }

    close() {
        this.activemodal.dismiss('Cancelado');
    }

    actualizarAsistencia(asist) {
        this.openModal(this.objTrabajadorContrato.trabajador, asist);
    }

    eliminarAsistencia(asist) {
        var tmp = Object.assign({}, asist);
        tmp.accion = 'A'
        this.modalRef = this.modalService.open(ConfirmarEliminarComponent,
            {
                backdrop: 'static',
                keyboard: false,
                size: 'sm'
            })
        this.modalRef.componentInstance.input_accion = tmp;
        this.modalRef.result.then((result) => {
            this.activemodal.close();
        });
    }
}