import { Component, Input, OnInit } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mostrar-prestamo',
  templateUrl: './mostrar-prestamo.component.html',
  styleUrls: []
})
export class MostrarPrestamoComponent implements OnInit {

  @Input() input_trabajador;

  trabajador: Trabajador = new Trabajador();
  lsPrestamo: any[] = [];
  lsCuotas: any[] = [];
  expanded: boolean;
  selecArch:File;
  valor

  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService,
    public router: Router ) { }

  ngOnInit() {
    this.trabajador = this.input_trabajador;
    this.listarPrestamo()
  }

  listarPrestamo() {
    this.planillasService.listarPrestamo(this.trabajador).subscribe((resp: any) => {
      this.lsPrestamo = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarNroCuotas(prestamo) {
    this.planillasService.listarCuotasPrestamo(prestamo).subscribe((resp: any) => {
      this.lsCuotas = resp.aaData;
      prestamo.lscuotas=this.lsCuotas;
    })
  }


  subirArchivo(archivo,adeSue){
    // this.selecArch = archivo.target.files[0];
    // this.cargarArchivo(adeSue)
}

cargarArchivo(adeSue){
  const idAdeSueldo=adeSue.idAdelantoSueldo
  this.planillasService.subirArchivoAdelantoSueldo(this.selecArch,idAdeSueldo).subscribe((resp:any)=>{
    if (resp.estado == 1) {
      Swal.fire(Constantes.SUCCESS,resp.msg,'success');
      this.listarPrestamo();
      } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
  })
}

bajarArchivo(adeSueldo){
  // var adelantoSueldoDTO = {
  //   "trabajador": this.trabajador,
  //   "adelantoSueldo": adeSueldo,
  // }
  // this.planillasService.bajarArchivoAdelantoSueldo(adelantoSueldoDTO).subscribe((resp:any)=>{
  //   debugger
  //     var reporte: any = resp;
  //     var file = new Blob([reporte], { type: 'application/pdf' });
  //     var nombres: String = this.trabajador.nombres;
  //     var nombres_sinesp = nombres.trim();
  //     var apat: String = this.trabajador.apePater;
  //     var apat_sinesp = apat.trim();
  //     var apmat: String = this.trabajador.apeMater;
  //     var apmat_sinesp = apmat.trim();

  //     saveAs(file, `${nombres_sinesp}_${apat_sinesp}_${apmat_sinesp}.pdf`);
  //     //this.refrescar(this.router.url);
  //     this.close();

  //   },
  //     (error) => { Swal.fire(Constantes.ERROR, 'Ocurrio un error al descargar el archivo', 'error') });
}

}
