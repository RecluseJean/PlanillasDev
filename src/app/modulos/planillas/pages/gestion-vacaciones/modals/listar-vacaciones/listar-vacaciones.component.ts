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
  listaDeTrabj: any;

  constructor(public activemodal: NgbActiveModal,
              public trabajadorService: TrabajadorService,
              public serviceVacaciones: VacacionesService,
              public router: Router,
              public _headerService: HeaderService) { }

  ngOnInit() {
    this.idTrab = this.input_trabajador.idTrabajador;
    this.datosTrabajador = this.input_trabajador.apePater + " " + this.input_trabajador.apeMater + ", " + this.input_trabajador.nombres;
    console.log(this.datosTrabajador);
    this.listarVacas();
  }

  listarVacas() {
    this.serviceVacaciones.listarVacasTomadPorTrabajador(this.idTrab).subscribe((resp: any) => {
      this.listaDeTrabj = resp.aaData.sort((a:any, b:any) => new Date(b.fechaIni).getTime() - new Date(a.fechaIni).getTime());
      console.log(this.listaDeTrabj)

    })

  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
