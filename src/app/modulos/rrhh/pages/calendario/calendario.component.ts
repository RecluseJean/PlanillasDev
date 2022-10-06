import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import { CalendarioService } from '../../services/calendario/calendario.service';
import * as moment from 'moment'
import { NuevoEventoComponent } from './nuevo-evento/nuevo-evento.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})
export class CalendarioComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router,
    public calendarioService: CalendarioService,

   
  ) { }
  
  public empresa: Empresa = new Empresa();
  monthSelect: any[];
  public listAreaDepEmp: Array<any> = [];
  dateSelect: any;
  dateValue: any;
  modalRef: NgbModalRef;

  data=null;

  displayedColumns: string[] = [
    'asun',
    'puesto',
    'horIniDia',
    'horFinDia',
    'editar', 
    'eliminar'
  ];


  ngOnInit() {

    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    void this.getDaysFromDate(5, 2021);
    if(this.dateSelect!=null){
      this.listarEventoPorEmpresa();
    }
    
  }

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  changeMonth(flag) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


  }

  getDaysFromDate(month, year) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = endDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  nuevoEvento() {
    let indice = "A";
    this.openModal(indice);
  }

  public openModal(indice) {

    switch (indice) {
      case 'A': this.modalRef = this.modalService.open(NuevoEventoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.componentInstance.input_trabajador_final = indice;
        break;

    }
  }


  listarEventoPorEmpresa() {debugger
    var empresa = {
      "idEmpresa": this.empresa.idEmpresa
    }
    this.calendarioService.listarEventoPorEmp(empresa).subscribe((resp: any) => {debugger
      this.listAreaDepEmp = resp.aaData;
      this.data=new MatTableDataSource<Object>(this.listAreaDepEmp);
      this.data.paginator = this.paginator;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    });
    return this.listAreaDepEmp;
  }

  public actualizarDepartamentoEmpresa(departamentoEmpresa_u) {

  }

  eliminarDepartamentoEmpresa(departamentoEmpresa_d) {

  }


}
