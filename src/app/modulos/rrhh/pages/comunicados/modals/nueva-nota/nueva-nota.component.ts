import { Component, OnInit, Input } from '@angular/core';
import { Horario } from '../../../../../../models/Horario';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComunicadosService } from '../../../../services/comunicados/comunicados.service';
import { NuevaNotaConfirmarComponent } from '../nueva-nota-confirmar/nueva-nota-confirmar.component';
import { Notas } from '../../../../../../models/Notas';
import { Empresa } from '../../../../../../models/Empresa';



@Component({
  selector: 'app-nueva-nota',
  templateUrl: 'nueva-nota.component.html',
  styles: []
})
export class NuevaNotaComponent implements OnInit {

  @Input() input_horario_final;
  horario: Horario = new Horario();
  notas: Notas = new Notas();
  empresa: Empresa = new Empresa();
  horario_final: any;
  lsEstado: any = [];
  deshabilitar = true;

  lsDepartamentoEmpresa:any [] = [];


  iidAreaDepartamentoEmpresa: number;

  constructor(
    public router: Router,
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public comunicadoService: ComunicadosService
  ) { }

  ngOnInit() {    
    
  var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
  this.empresa.idEmpresa = tmp.idEmpresa;
  this.listarDepartamentoEmpresa()
  this.listarNotasPorEmpresa(); 

  }



  listarDepartamentoEmpresa() {
    this.comunicadoService.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {debugger
      this.lsDepartamentoEmpresa = resp.aaData;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    })
  }

   listarNotasPorEmpresa() {
    this.comunicadoService.listarNotasPorEmp(this.empresa).subscribe((resp: any) => {debugger
      this.lsDepartamentoEmpresa = resp.aaData;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    })
  } 


  cargarDatos() {
    this.lsEstado = Constantes.ESTADO;
    this.horario.dias = Constantes.DiasSemana;
    if (this.input_horario_final == null) {
      this.horario.accion = Constantes.REGISTRAR;
    } else {
      this.horario.accion = Constantes.ACTUALIZAR;
    }
  }





  close() {
    this.activemodal.dismiss('Cancelado');
    //this.refrescar(this.router.url);
  }

  asignarObjetos() {debugger
    var tmp ={
      "notas": this.notas,
      "areadepartamentoempresa":{
        "iidAreaDepartamentoEmpresa": this.iidAreaDepartamentoEmpresa
      },
      "empresa":{
      "idEmpresa": this.empresa.idEmpresa
      }
      
  }
  return tmp;
  }

  confirmarNuevaNota() {
    var noDto = this.asignarObjetos();
    const modalRef = this.modalService.open(NuevaNotaConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_notas = noDto;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }
}
