import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { HorarioService } from '../../services/horarios/horarios.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { Horario } from '../../../../models/Horario';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoHorarioComponent } from './modals/nuevo-horario/nuevo-horario.component';
import { NuevoHorarioConfirmarComponent } from './modals/nuevo-horario-confirmar/nuevo-horario-confirmar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LIMIT } from '../../../../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['horarios.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HorariosComponent implements OnInit, OnDestroy {
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('paginatorlsHorarios', {static: true}) paginatorlsHorarios: MatPaginator;
  empresa: Empresa = new Empresa();
  lsHorarios = null;
  lsHorariosFilter: any[] = [];
  horario: Horario = new Horario();
 /*  pA: number = 1;
  numItem = Constantes.numeroItem; */
  displayedColumns: string[] = [
    'descripcion',
    'horIniDia',
    'horFinDia',
    'horAlmuerIni',
    'horAlmuerFin',
    // 'totalDias',
    'estado',
    'editar',
    'eliminar'
  ];



  modalRef: NgbModalRef;

  cerrar: boolean = false;


  expandedElement: Object | null;

  constructor(
    public horarioService: HorarioService,
    public modalService: NgbModal,
    public router: Router

  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    if (this.empresa != null) {
      this.listarHorariosPorEmpresa();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null && this.cerrar == false) {
      this.modalRef.close();
    }
  }


  public listarHorariosPorEmpresa() {
    this.horarioService.listarHorariosPorEmpresa(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsHorariosFilter = resp.aaData;
        this.lsHorarios = new MatTableDataSource<any>(this.lsHorariosFilter);
        //this.lsHorarios.paginator = this.paginator;
        this.lsHorarios.paginator = this.paginatorlsHorarios;
      }else{
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
    /*   (error) => {
        Swal.fire(Constantes.ERROR, error.error, 'error');
      }) */
  }

  nuevoHorario() {
    let indice = null;
    this.openModal(indice);
  }

  public actualizarHorario(horario) {
    var tmp = Object.assign({}, horario);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarHorario(horario) {
    var tmp = Object.assign({}, horario);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  public openModal(indice) {

    if (indice == null || indice.accion == "U") {
      const modalRef = this.modalService.open(NuevoHorarioComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      modalRef.componentInstance.input_horario_final = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      const modalRef = this.modalService.open(NuevoHorarioConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      modalRef.componentInstance.input_horario_final = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsHorarios.filter = filterValue.trim().toLowerCase();
  }

}
