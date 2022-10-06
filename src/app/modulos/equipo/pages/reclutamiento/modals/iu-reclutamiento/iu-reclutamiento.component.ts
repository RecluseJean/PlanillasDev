import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarpostulanteComponent } from '../confirmarpostulante/confirmarpostulante.component';
import { Postulante } from '../../../../../../models/postulante';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { inputs } from '@syncfusion/ej2-angular-calendars/src/calendar/calendar.component';
import { Reclutamiento } from '../../../../../../models/Reclutamiento';
import { Router } from '@angular/router';
import { PostulanteService } from '../../../../services/postulante/postulante.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-iu-reclutamiento',
  templateUrl: './iu-reclutamiento.component.html',
  styles: []
})
export class IuReclutamientoComponent implements OnInit, OnDestroy {

  @Input() input_solicitud;
  @Input() input_postulante_final;
  @Input() input_reclutamiento;
  @Input() input_post;

  tipoComp: Number = null;

  lsTipoDoc: any[] = [];
  lsNivelEdu: any[] = [];
  lsOcupacion: any[] = [];
  lsUnidadTiempo: any [] = Constantes.unidadDeTiempo;

  tipoDoc: Number = null;
  ocupacion: Number = null;
  nivedu: Number = null;
  mayorEdad: any;
  interval: any;
  contador: number = 0;

  objOcupacion: any = null;
  objTipoDoc: any = null;
  objNivelEdu: any = null;
  objPostulante_final: any = null;
  objReclutamiento: any = null;

  accion: any = null;
  modalRef: NgbModalRef

  textoDeInput: number = null;

  tecla: any;
  nroDocError = true;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    public router: Router
  ) { }

    postulante: any = new Postulante();
    reclutamiento:any = new Reclutamiento();
  //postulante: any = new Postulante();



  ngOnInit() {
    this.definirRangoFecha();
    this.iniciarListasDatos();
    //this.iniciarDropdowns();
    this.reclutamiento=this.input_reclutamiento;
    /* if(this.input_solicitud!=null){
      this.objPostulante_final=this.input_postulante_final;
    } */
    this.iniciarTemporizador();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  iniciarDropdowns() {

    this.postulante=this.objPostulante_final.postulante;
    this.tipoDoc= this.objPostulante_final.postulante.tipoDoc.idTipoDoc;
    this.obtenerTipoDoc() ;
    this.nivedu= this.objPostulante_final.postulante.nivelEdu.idNivelEdu;
    this.obtenerNivelEducativo();
    this.ocupacion= this.objPostulante_final.postulante.ocupacion.idOcupacion;
    this.obtenerOcupacion();
  }

  iniciarListasDatos() {
    this.postulanteService.listarTipoDoc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.postulanteService.listarNivelEdu().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEdu = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.postulanteService.listarOcupacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsOcupacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

  }

  obtenerTipoDoc() {
    this.postulanteService.listarTipoDoc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerNivelEducativo() {
    this.postulanteService.listarNivelEdu().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEdu = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerOcupacion() {
    this.postulanteService.listarOcupacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsOcupacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerCodigoAsc(valor): any {
    return (document.all) ? valor.keyCode : valor.which;
  }

  verificarString(valor) {
    this.tecla = this.obtenerCodigoAsc(valor);
    if (this.tecla == 8 || this.tecla == 32) {
      return true;
    } else {
      var patron = /[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ]/;
      var tecla_final = String.fromCharCode(this.tecla);
      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Valor inválido, no ingrese caracteres especiales", timer: 2000, showConfirmButton: false });
        return false;
      } else {
        return true;
      }
    }
  }

  definirRangoFecha() {
    let fechaHoy = new Date();
    var ano = (fechaHoy.getFullYear() - 18);
    var mes = fechaHoy.getMonth() + 1;
    fechaHoy.getUTCDate()
    this.mayorEdad = `${ano}-${mes}-${fechaHoy.getUTCDate()}`;
  }

  verificarNumero(valor, campo) {
    this.tecla = this.obtenerCodigoAsc(valor);
    if (this.tecla == 8) {
      return true;
    } else {
      // Patron de entrada, en este caso solo acepta numeros y letras
      var patron = /[0-9]/;
      var tecla_final = String.fromCharCode(this.tecla);

      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Valor inválido, ingrese solo números del 0 al 9", timer: 2000, showConfirmButton: false });
        return false;
      } else {  //limites
        switch (campo) {
          case 'dni': if (this.cantidadDigitos(this.postulante.nroDocumento) == 8) {
            Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'ruc': if (this.cantidadDigitos(this.postulante.nroDocumento) == 11) {
            Swal.fire({ title: "El RUC no puede exceder de 11 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'cel': if (this.cantidadDigitos(this.postulante.telefono) == 9) {debugger
            Swal.fire({ title: "El numero celular no puede exceder de 9 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
        }
      }
    }
  }

  armarObjeto(){debugger
    this.postulante.nombres= this.postulante.nombres.replace(/\s*$/, "");
    this.postulante.ape_materno= this.postulante.ape_materno.replace(/\s*$/, "");
    this.postulante.ape_paterno= this.postulante.ape_paterno.replace(/\s*$/, "");
    this.objTipoDoc= { "idTipoDoc": this.tipoDoc };
    this.objNivelEdu = { "idNivelEdu": this.nivedu };
    this.objOcupacion = { "idOcupacion": this.ocupacion };
    this.objReclutamiento = this.input_reclutamiento.reclutamiento;
    this.objPostulante_final={
      "postulante":this.postulante,
      "tipoDoc": this.objTipoDoc,
      "nivelEdu": this.objNivelEdu,
      "ocupacion": this.objOcupacion,
      "reclutamiento": this.objReclutamiento
    }
    //this.objPostulante_final.accion = this.accion;
  }

  confirmarNuevoPostulante() {
    let indice = null;
    this.openModal(indice);
  }

  /*cargarPostulante(postulante_a) { //debugger
    var postulante_tmp = Object.assign({}, postulante_a);
    postulante_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(postulante_tmp);
  } */

  buscarPostulantexDNI(){ debugger
    //var valor = document.getElementById("inputNroDNI").value;
    this.postulante.nroDocumento = this.textoDeInput;

    var posdto = {
      postulante:this.postulante
    }
    this.postulanteService.buscarPostulante(posdto).subscribe((resp:any) =>{
      if(resp.estado==1){
        this.postulante = resp.defaultObj;
        this.tipoDoc = this.postulante.tipoDoc.idTipoDoc;
        this.ocupacion = this.postulante.ocupacion.idOcupacion;
        this.nivedu = this.postulante.nivelEdu.idNivelEdu;
        //this.actualizarPostulante(resp.defaultObj)
        Swal.fire(Constantes.SUCCESS,resp.msg , 'success');
        //this.refrescar(this.router.url);
      }else if (resp.estado==0){
        Swal.fire(Constantes.INFO,resp.msg , 'info');
        //this.activemodal.dismiss();
      }else {
        Swal.fire(Constantes.ERROR,resp.msg , 'error');
        this.activemodal.dismiss();
      }
      //this.activemodal.dismiss();
    })
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

  /* actualizarPostulante(postulante_u) { debugger
    var postulante_tmp = Object.assign({}, postulante_u);
    postulante_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(postulante_tmp);
  } */

  public openModal(indice) {debugger
      this.armarObjeto();
      if (indice == null || indice.accion == "U") {
      this.modalRef = this.modalService.open(ConfirmarpostulanteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalConfirmar'
        }
      );
      this.modalRef.componentInstance.input_postulante_final = this.objPostulante_final;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.close();
      });
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado')
  }

  cantidadDigitos(valor): number {
    var cont = 0;
    while (valor >= 1) {
      valor = valor / 10;
      cont++;
    }
    return cont;
  }

  //inicio ruben
  validarData(){debugger
    var cant_dig = this.cantidadDigitos(this.postulante.nroDocumento);
    if (cant_dig < 8 && this.postulante.nroDocumento != "") {
      Swal.fire({ title: "DNI debe contener 8 digitos", timer: 2000, showConfirmButton: false });
    } else if (cant_dig === 8) {
      this.existeNroDoc();
    }; 
  }

  existeNroDoc(){debugger
    if (this.input_post == null) {
      this.verificarExisteNroDoc();
    } else {
      if (this.input_post.nroDocumento == this.postulante.nroDocumento) {
        this.nroDocError = false;
      } else {
        this.verificarExisteNroDoc();

      }
    }
  }

  verificarExisteNroDoc() {debugger
    var clean:string = null;
    this.postulanteService.existeNroDocumento(this.postulante.nroDocumento).subscribe((resp: any) => {debugger
      if (resp) {
        this.nroDocError = resp;
        Swal.fire({ title: "Este número de documento ya ha sigo asignado a otro trabajador", timer: 2000, showConfirmButton: false });
        this.postulante.nroDocumento = clean;
      } else {
        this.nroDocError = resp;
      }
    });
  }

  iniciarTemporizador(){
    document.onmousedown = () => {
        this.contador = 0;
      };
  
      this.interval = setInterval(() => {
        this.contador++;
        if (this.contador == Constantes.tiempoSegundos) {
          clearInterval(this.interval)
          this.close();
        }
      }, 1000)
}



}
