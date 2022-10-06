import { Component, OnInit, Input } from '@angular/core';
import { Horario } from '../../../../../../models/Horario';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComunicadosService } from '../../../../services/comunicados/comunicados.service';
import { NuevaSugerenciaConfirmarComponent } from '../nueva-sugerencia-confirmar/nueva-sugerencia-confirmar.component';
import { Empresa } from '../../../../../../models/Empresa';
import { BuzonSugerenciaService } from '../../../../services/buzon-sugerencia/buzon-sugerencia.service';
import { Sugerencias } from '../../../../../../models/Sugerencias';




@Component({
  selector: 'app-nueva-sugerencia',
  templateUrl: 'nueva-sugerencia.component.html',
  styles: []
})
export class NuevaSugerenciaComponent implements OnInit {

  @Input() input_horario_final;

  sugerencias: Sugerencias = new Sugerencias();
  empresa: Empresa = new Empresa();

  mayorEdad: any;
  horario_final: any;

  deshabilitar = true;

  iidAreaDepartamentoEmpresa: number;

  lsDepartamentoEmpresa:any [] = [];


  lsEstado: any = [];

  constructor(
    public router: Router,
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public buzonSugerencias: BuzonSugerenciaService
  ) { }

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    this.empresa.idEmpresa = tmp.idEmpresa;
    this.listarDepartamentoEmpresa()
    this.listarSugerenciasEmpresa();
  }


  close() {
    this.activemodal.dismiss('Cancelado');
    //this.refrescar(this.router.url);
  }



  listarDepartamentoEmpresa() {
    this.buzonSugerencias.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {debugger
      this.lsDepartamentoEmpresa = resp.aaData;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    })
  }

  listarSugerenciasEmpresa() {
    this.buzonSugerencias.listarSugerenciasEmp(this.empresa).subscribe((resp: any) => {debugger
      this.lsDepartamentoEmpresa = resp.aaData;
      
      console.log('lsSugerenciasEmpresa',resp.aaData);
    })
  }

  confirmarNuevaSugerencia() {debugger
    var suDto = this.asignarObjetos();
    const modalRef = this.modalService.open(NuevaSugerenciaConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_sugerencia = suDto;
//    modalRef.componentInstance.input_horario_final = this.horario_final;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  asignarObjetos() {debugger
    var tmp ={
      "sugerencias": this.sugerencias,
      "areadepartamentoempresa":{
        "iidAreaDepartamentoEmpresa": this.iidAreaDepartamentoEmpresa
      },
      "empresa":{
      "idEmpresa": this.empresa.idEmpresa
      }
      
  }
  return tmp;
  }



}
