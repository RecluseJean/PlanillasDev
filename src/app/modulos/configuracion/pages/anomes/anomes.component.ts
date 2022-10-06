import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AnoMesService } from '../../services/anomes/anomes.service';
import { NuevoAnoComponent } from './modals/nuevo-ano/nuevo-ano.component';
import { Año } from '../../../../models/Año';
import { NuevoMesComponent } from './modals/nuevo-mes/nuevo-mes.component';
import { SelecDiasferiadoComponent } from './modals/selec-diasferiado/selec-diasferiado/selec-diasferiado.component';
import Constantes from '../../../../models/Constantes';
import { PageEvent, MatTableDataSource } from '@angular/material';
import { LIMIT } from '../../../../config/config';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-anomes',
  templateUrl: './anomes.component.html',
  styles: []
})
export class AnomesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private anomesService: AnoMesService
  ) { }
  displayedColumns: string[] = [
    'descripcion',
    'abrev',
    'diasFeriadoCalend',
    'feriados',
    'editar'
  ];

  
  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;
  lsMeses=null;
  ano:Año = new Año();
  modalRef:NgbModalRef;
  pA:number = 1;
  numItem = Constantes.numeroItem;

  ngOnInit() {
    this.listarMeses()
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  listarMeses(){
    this.anomesService.listarMeses().subscribe((resp:any) => {
      let respMeses: Object[] = [];
      respMeses = resp.aaData;
      this.lsMeses = new MatTableDataSource<Object>(respMeses);
      this.lsMeses.paginator = this.paginator;
      // this.lsMeses = resp.aaData;
    });
  }

  nuevoAno(){
    let indice = null;
    this.openModal(indice);
  }

  seleccionarFeriados(mes){
    this.modalRef = this.modalService.open(SelecDiasferiadoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size:'sm'
      })
      this.modalRef.componentInstance.input_mes = mes;
      this.modalRef.result.then((result)=>{
      }, (reason) => {
      });
  }

  public openModal(indice){
    if(indice!=null){
      this.modalRef = this.modalService.open(NuevoMesComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.componentInstance.input_mes = indice;
        this.modalRef.result.then((result)=>{
        }, (reason) => {
        });
    }else{
      this.modalRef = this.modalService.open(NuevoAnoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.result.then((result)=>{
        }, (reason) => {
        });
    }

  }

  agregarNoLaborable(){
  }

public actualizarMes(mes){
  var act_tmp = Object.assign({}, mes);
  act_tmp.accion = Constantes.ACTUALIZAR;
  this.openModal(act_tmp);
}


  applyFilter(event: Event) {debugger
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsMeses.filter = filterValue.trim().toLowerCase();
  }
}
