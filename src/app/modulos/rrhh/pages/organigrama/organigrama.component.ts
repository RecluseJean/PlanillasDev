import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { ConceptoPlanilla } from '../../../../models/ConceptoPlanilla';
import { CuentaContable } from '../../../../models/CuentaContable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrganigramaService } from '../../services/organigrama/organigrama.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { saveAs } from 'file-saver';
import { Mes } from '../../../../models/Mes';
import { Año } from '../../../../models/Año';
import { transition, state, style, animate, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['style.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrganigramaComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsconcepto', { static: true }) paginatorlsconcepto: MatPaginator;
  @ViewChild('paginatorlscuenta', { static: true }) paginatorlscuenta: MatPaginator;
  @ViewChild('paginatorlsplame', { static: true }) paginatorlsplame: MatPaginator;
  @ViewChild('paginatorlsvistaplame', { static: true }) paginatorlsvistaplame: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  empresa: Empresa = new Empresa();
  mostrar: boolean = true;
  ano: Año = new Año();
  mes: Mes = new Mes();

  lsconcepto = null;
  lsconceptoFilter: any[] = [];
  lscuenta  = null;
  lscuentaFilter: any[] = [];
  lsplameFilter: any[] = [];
  lsvistaplameFilter: any[] = [];
  lsplame  = null;
  lsvistaplame = null;

  lsProyeccion: any[] = [];
  data=null;

  modalRef: NgbModalRef;

  expandedElement: Object | null;
  expanded: boolean = false;


  displayedColumns: string[] = [
    'descripcion'
  ];

  displayedColumns2:string[]=[
    'codigo',
    'descripcion'
  ]

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public organigramaService: OrganigramaService
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    if (this.empresa != null) {
      this.listarProyeccion();

    }
    console.log(this.listarProyeccion());
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }



  openModal(obj) {

  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsconcepto.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lscuenta.filter = filterValue.trim().toLowerCase();
  }

  listarProyeccion() {
    this.organigramaService.listarProyeccionPuesto(this.empresa).subscribe((resp: any) => {
      this.lsProyeccion = resp.aaData;
      this.data = new MatTableDataSource<Object>(this.lsProyeccion);
      this.data.paginator = this.paginator;
      console.log(this.lsProyeccion);
    })
  }
  applyFilter(event: Event) {
    this.lsProyeccion.map((x) => {
      x.categoria = x.puesto.scategoria;
      x.nom_proyeccion = x.puesto.snombre;
      x.nom_area = x.puesto.areaDepartamentoEmpresa.snombre;

    });
    this.data = new MatTableDataSource<Object>(this.lsProyeccion);
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

}
