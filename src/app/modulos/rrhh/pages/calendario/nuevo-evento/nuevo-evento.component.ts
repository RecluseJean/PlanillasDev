import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Evento } from '../../../../../models/Evento';
import { Empresa } from '../../../../../models/Empresa';
import { CalendarioComponent } from '../calendario.component';
import { CalendarioService } from '../../../services/calendario/calendario.service';
import { NuevoEventoConfirmarComponent } from '../nuevo-evento-confirmar/nuevo-evento-confirmar.component';





@Component({
    selector: 'app-nuevo-evento',
    templateUrl: 'nuevo-evento.component.html',
    styles: []
  })
  export class NuevoEventoComponent implements OnInit{

    empresa: Empresa = new Empresa();
    modalRef: NgbModalRef;

    @Input() input_horario_final;

    constructor(
        public activemodal: NgbActiveModal,
        public router: Router,
        public modalService: NgbModal,
        public calendarioService: CalendarioService
    ) { }

    ngOnInit() {

        var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
        this.empresa.idEmpresa = tmp.idEmpresa;
        this.listarDepartamentoEmpresa()
        this.listarEventoPorEmpresa();
      }


    evento: Evento = new Evento();
    lsDepartamentoEmpresa:any [] = [];
    iidAreaDepartamentoEmpresa: number;


    ngOnDestroy() {
        if (this.modalRef != null) {
            this.modalRef.close();
        }
    }

    close() {
        this.activemodal.close('Cancelado');
    }

    confirmarNuevoEvento(){
      var eveDto = this.asignarObjetos();
      const modalRef = this.modalService.open(NuevoEventoConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      modalRef.componentInstance.input_actividad = eveDto;
  //    modalRef.componentInstance.input_horario_final = this.horario_final;
      modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.close();
      });
    }

    asignarObjetos() {debugger
      var tmp ={
        "evento": this.evento,
        "areadepartamentoempresa":{
          "iidAreaDepartamentoEmpresa": this.iidAreaDepartamentoEmpresa
        },
        "empresa":{
        "idEmpresa": this.empresa.idEmpresa
        }
        
    }
    return tmp;
    }

    listarDepartamentoEmpresa() {
        this.calendarioService.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {debugger
          this.lsDepartamentoEmpresa = resp.aaData;
          
          console.log('lsDepartamentoEmpresa',resp.aaData);
        })
      }
    
      listarEventoPorEmpresa() {
        this.calendarioService.listarEventoPorEmp(this.empresa).subscribe((resp: any) => {debugger
          this.lsDepartamentoEmpresa = resp.aaData;
          
          console.log('lsDepartamentoEmpresa',resp.aaData);
        })
      }

  }