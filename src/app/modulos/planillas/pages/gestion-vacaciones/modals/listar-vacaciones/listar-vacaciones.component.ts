import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HeaderService } from '../../../../../../services/service.index';
import { TrabajadorService } from '../../../../../trabajador/services/trabajador/trabajador.service';
import { VacacionesService } from '../../../../services/vacaciones/vacaciones.service';

@Component({
  selector: 'app-listar-vacaciones',
  templateUrl: './listar-vacaciones.component.html',
  styles: []
})
export class ListarVacacionesComponent implements OnInit {

  @Input() input_trabajador;

  idTrab: number = 0; 
  datosTrabajador: string;
  listaDeVaca:any;

  constructor(public activemodal: NgbActiveModal,
              public trabajadorService: TrabajadorService,
              public serviceVacaciones: VacacionesService,
              public router: Router,
              public _headerService: HeaderService) { }

  ngOnInit() {
    this.idTrab = this.input_trabajador.trabajador.idTrabajador;
    this.datosTrabajador = this.input_trabajador.trabajador.apePater + " " + this.input_trabajador.trabajador.apeMater + ", " + this.input_trabajador.trabajador.nombres;
    this.listarVacas();
  }

  listarVacas() {
    this.serviceVacaciones.listarVacaciones(this.input_trabajador.idVacacion).subscribe((resp: any) => {
      this.listaDeVaca = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
