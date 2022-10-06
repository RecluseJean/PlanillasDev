import { Component, OnInit, Input } from '@angular/core';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { Empresa } from '../../../../../../models/Empresa';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Equipo } from '../../../../../../models/Equipo';
import { ConfirmarNuevoTrabEquipComponent } from './confirmar-nuevo-trab-equip/confirmar-nuevo-trab-equip.component';

@Component({
  selector: 'app-nuevo-trabajador-equipo',
  templateUrl: './nuevo-trabajador-equipo.component.html',
  styles: []
})
export class NuevoTrabajadorEquipoComponent implements OnInit {

  @Input() input_equipo;

  constructor(
    public activemodal: NgbActiveModal,
    public trabajadorService: TrabajadorService,
    private modalService: NgbModal,
  ) { }

  modalRef: NgbModalRef
  equipo:  any = new Equipo();
  //public trabajador: any = new Trabajador();
  public empresa: Empresa = new Empresa();
  lsTrabajadorEmpresa: any [] = [];

  //objTrabajador: any = null;
  //objEquipo: any = null;
  //objTrabEquipo_final: any = null;

  trabajador: Number = null;
  lsTrabajadoresEquip: any[] = [];
  desabilitarAgregar: boolean = true;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.trabajador= this.input_equipo.trabajador;
    this.listarTrabajadoresxEmpresa();
    //console.log(this.listarTrabajadoresxEmpresa);
  }

  listarTrabajadoresxEmpresa() { 
    this.trabajadorService.listarTrabajador(this.empresa).subscribe((resp: any) => {
      this.lsTrabajadorEmpresa = resp.aaData;
    })
  }

  /* armarObjeto(){
    this.objTrabajador= { "idTrabajador": this.trabajador };
    this.objEquipo= { "idEquipo" : this.input_equipo.idEquipo};
    this.objTrabEquipo_final={
      "trabajador": this.objTrabajador,
      "equipo": this.objEquipo
    }
  } */

  confirmarAgregarTrabEquip() {
    let indice = null;
    this.openModal(indice);
  }

  validarAgregador(event){ //debugger
    for (let i = 0; i < this.lsTrabajadorEmpresa.length; i++) {
      if (this.lsTrabajadorEmpresa[i].estado == true){
        this.desabilitarAgregar = false;
        break;
      } else {
        if(this.desabilitarAgregar == false){
          this.desabilitarAgregar = true;
        }
      }
    }
  }

  public openModal(indice) { //debugger
    //this.armarObjeto();
    for (let i = 0; i < this.lsTrabajadorEmpresa.length; i++) {
      if (this.lsTrabajadorEmpresa[i].estado == true) {
        this.lsTrabajadoresEquip.push(this.lsTrabajadorEmpresa[i])
      }
    }
      if (indice == null) {
      this.modalRef = this.modalService.open(ConfirmarNuevoTrabEquipComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      //this.modalRef.componentInstance.input_trabajador_final = this.objTrabEquipo_final;
      this.modalRef.componentInstance.input_lsTrabEquip = this.lsTrabajadoresEquip;
      this.modalRef.componentInstance.input_equipo = this.input_equipo;
        console.log('equipo',this.input_equipo);
      this.modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.close();
      });
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
