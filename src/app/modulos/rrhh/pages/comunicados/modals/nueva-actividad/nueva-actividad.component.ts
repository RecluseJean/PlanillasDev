import { Component, OnInit, Input } from '@angular/core';
import { Horario } from '../../../../../../models/Horario';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComunicadosService } from '../../../../services/comunicados/comunicados.service';
import { NuevaActividadConfirmarComponent } from '../nueva-actividad-confirmar/nueva-actividad-confirmar.component';
import { Actividades } from '../../../../../../models/Actividades';
import { Empresa } from '../../../../../../models/Empresa';





@Component({
  selector: 'app-nueva-actividad',
  templateUrl: 'nueva-actividad.component.html',
  styles: []
})
export class NuevaActividadComponent implements OnInit {

  @Input() input_horario_final;
  @Input() input_areaDepartamentoEmpresa;


  constructor(
    public router: Router,
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public comunicadoService: ComunicadosService,
  ) { }


  actividades: Actividades = new Actividades();
  empresa: Empresa = new Empresa();
  horario_final: any;
  lsEstado: any = [];
  deshabilitar = true;
  tecla: any;
  ocupacion: Number = null;
  iidDepartamentoEmpresa: number;
  iidAreaDepartamentoEmpresa: number;
  areaDepartamentoEmpresa: number = null;
  lsDepartamentoEmpresa:any [] = [];
  

  ngOnInit() {

    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    this.empresa.idEmpresa = tmp.idEmpresa;
    this.listarDepartamentoEmpresa()
    this.listarActividadesPorEmpresa();
  }








  close() {
    this.activemodal.dismiss('Cancelado');
 
  }

  asignarObjetos() {debugger
    var tmp ={
      "actividades": this.actividades,
      "areadepartamentoempresa":{
        "iidAreaDepartamentoEmpresa": this.iidAreaDepartamentoEmpresa
      },
      "empresa":{
      "idEmpresa": this.empresa.idEmpresa
      }
      
  }
  return tmp;
  }

  confirmarNuevaActividad() {debugger
    var actDto = this.asignarObjetos();
    const modalRef = this.modalService.open(NuevaActividadConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_actividad = actDto;
//    modalRef.componentInstance.input_horario_final = this.horario_final;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  verificarString(valor) {
    this.tecla = this.obtenerCodigoAsc(valor);
    if (this.tecla == 8 || this.tecla == 32) {
      return true;
    } else {
      var patron = /[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ]/;
      var tecla_final = String.fromCharCode(this.tecla);
      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Valor inválido, no ingrese caracteres especiales", timer: 2000, showConfirmButton: false });
        return false;
      } else {
        return true;
      }
    }
  }

  obtenerCodigoAsc(valor): any {
    return (document.all) ? valor.keyCode : valor.which;
  }

  listarDepartamentoEmpresa() {
    this.comunicadoService.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {debugger
      this.lsDepartamentoEmpresa = resp.aaData;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    })
  }

  listarActividadesPorEmpresa() {
    this.comunicadoService.listarActividadesPorEmp(this.empresa).subscribe((resp: any) => {debugger
      this.lsDepartamentoEmpresa = resp.aaData;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    })
  }

}
