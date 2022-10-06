import { Component, OnInit, Input } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { PrevArchivoComponent } from '../../../../../../shared/prev-archivo/prev-archivo.component';
import { AdelantoSueldo } from '../../../../../../models/Adelanto-Sueldo';

@Component({
  selector: 'app-mostrar-adelanto-sueldo',
  templateUrl: './mostrar-adelanto-sueldo.component.html',
  styles: []
})
export class MostrarAdelantoSueldoComponent implements OnInit {

  @Input() input_trabajador;

  trabajador: Trabajador = new Trabajador();
  lsAdeSue: any[] = [];
  lsCuotas: any[] = [];
  expanded: boolean;
  selecArch:File;
  modalRef: NgbModalRef;
  valor

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public planillasService: PlanillasService,
    public router: Router ) { }

  ngOnInit() {
    this.trabajador = this.input_trabajador;
    this.listarAdeSue()
  }

  listarAdeSue() {
    this.planillasService.listarAdeSue(this.trabajador).subscribe((resp: any) => {
      this.lsAdeSue = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarNroCuotas(adeSue) {
    this.planillasService.listarCuotas(adeSue).subscribe((resp: any) => {
      this.lsCuotas = resp.aaData;
      adeSue.lscuotas=this.lsCuotas;
    })
  }


  subirArchivo(archivo,adeSue){
    this.selecArch = archivo.target.files[0];
    this.cargarArchivo(adeSue)
}

cargarArchivo(adeSue){
  const idAdeSueldo=adeSue.idAdelantoSueldo
  this.planillasService.subirArchivoAdelantoSueldo(this.selecArch,idAdeSueldo).subscribe((resp:any)=>{
    if (resp.estado == 1) {
      Swal.fire(Constantes.SUCCESS,resp.msg,'success');
      this.listarAdeSue();
      } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
  })
}

bajarArchivo(adeSueldo){
  var adelantoSueldoDTO = {
    "trabajador": this.trabajador,
    "adelantoSueldo": adeSueldo,
  }
  this.planillasService.bajarArchivoAdelantoSueldo(adelantoSueldoDTO).subscribe((resp:any)=>{
    debugger
      var reporte: any = resp;
      var file = new Blob([reporte], { type: 'application/pdf' });
      var nombres: String = this.trabajador.nombres;
      var nombres_sinesp = nombres.trim();
      var apat: String = this.trabajador.apePater;
      var apat_sinesp = apat.trim();
      var apmat: String = this.trabajador.apeMater;
      var apmat_sinesp = apmat.trim();

      saveAs(file, `${nombres_sinesp}_${apat_sinesp}_${apmat_sinesp}.pdf`);
      //this.refrescar(this.router.url);
      this.close();

    },
      (error) => { Swal.fire(Constantes.ERROR, 'Ocurrio un error al descargar el archivo', 'error') });
}

  regisArchivo(archivo) {
    var tmp_archivo = Object.assign({}, archivo);
    tmp_archivo.accion = "ASUE";
    this.openModal(tmp_archivo);
  }

  openModal(indice) {
    if (indice.accion == "ASUE") {
      this.modalRef = this.modalService.open(PrevArchivoComponent, 
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'sm'
        })
      this.modalRef.componentInstance.input_adeSue= indice;
      this.modalRef.componentInstance.input_obj= indice;
      this.modalRef.componentInstance.input_trabajador =  this.trabajador;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

  descargarArchivo(adeSuel: AdelantoSueldo) {
    const dirArchivo = adeSuel.nombreArchivo;
    this.planillasService.descargarArchivoAdeSueldo(adeSuel.idAdelantoSueldo).subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], { type: 'file' });
        saveAs(file, dirArchivo);
        Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
      } else {
        Swal.fire(Constantes.ERROR, "Error al descargar Archivo", 'error');
      }
    });
    // this.activemodal.dismiss();
  }

}
