import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NuevoSistPensionComponent } from './modals/nuevo-sist-pension/nuevo-sist-pension.component';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevoSistPensionComponent } from './modals/confirmar-nuevo-sist-pension/confirmar-nuevo-sist-pension.component';
import { AfpService } from '../../services/afp/afp.service';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { LIMIT } from '../../../../config/config';


@Component({
  selector: 'app-datos-afp-onp',
  templateUrl: './datos-afp-onp.component.html',
  styles: []
})
export class DatosAfpOnpComponent implements OnInit, OnDestroy {
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  modalRef: NgbModalRef;
  pA: number = 1;
  numItem = Constantes.numeroItem;

  constructor(
    private modalService: NgbModal,
    public afpService: AfpService,
    public router: Router
  ) { }

  displayedColumns: string[] = [
    'descripcion',
    'apoOblFndPen',
    'primaSeguro',
    'comSobFlu',
    'comSobFluMix',
    'comAnuSobSal',
    'editar'
  ];
  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;
  public lsAfps: any[] = [];
  data=null;
  empresa: Empresa = new Empresa();

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (tmp != null) {
      this.empresa.idEmpresa = tmp.idEmpresa;
      this.listarAfps();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  public listarAfps() {
    this.afpService.listarAfp(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsAfps = resp.aaData;
        this.data=new MatTableDataSource<Object>(this.lsAfps);
        this.data.paginator = this.paginator;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }

    });
  }
  applyFilter(event: Event) {debugger

    // this.lsProyeccion.map((x)=>{
    //   x.categoria=x.puesto.scategoria;
    //   x.nom_proyeccion=x.puesto.snombre;
    //   x.nom_area=x.puesto.areaDepartamentoEmpresa.snombre;
      
    // });
    // this.data=new MatTableDataSource<Object>(this.lsProyeccion);
		const filterValue = (event.target as HTMLInputElement).value;
		this.data.filter = filterValue.trim().toLowerCase();
	
		if (this.data.paginator) {
		  this.data.paginator.firstPage();
		}
	  }
  public actualizarAfp(afp) {
    var afp_tmp = Object.assign({}, afp);
    afp_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(afp_tmp);
  }

  public eliminarAfp(afp) {
    var afp_tmp = Object.assign({}, afp);
    afp_tmp.accion = Constantes.ELIMINAR;
    this.openModal(afp_tmp);
  }
  public nuevoSistPension() {
    let indice = null;
    this.openModal(indice);
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  public openModal(indice) {

    if (indice == null || indice.accion != "D") {
      this.modalRef = this.modalService.open(NuevoSistPensionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        }
      );
      this.modalRef.componentInstance.input_afp = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(ConfirmarNuevoSistPensionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_afp = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }

  }

}
