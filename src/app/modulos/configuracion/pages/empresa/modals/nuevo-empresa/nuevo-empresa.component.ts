import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarNuevoEmpresaComponent } from '../confirmar-nuevo-empresa/confirmar-nuevo-empresa.component';
import { Empresa } from '../../../../../../models/Empresa';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Parametros } from '../../../../../../models/parametros.models';
import { URL_SERVICIOSBACK } from '../../../../../../config/config';


@Component({
  selector: 'app-nuevo-empresa',
  templateUrl: './nuevo-empresa.component.html',
  styles: []
})
export class NuevoEmpresaComponent implements OnInit, OnDestroy {

  @Input() input_empresa;

  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService,
    private modalService: NgbModal
  ) { }

  empresa: any = new Empresa();
  // tipoEmpresa: number = null;
  regTributario: number = null;
  objTipoEmpresa: any = null;
  objRegTributario: any = null;
  objEmpresa_final: any = null;
  lsTipoEmp: any[] = [];
  lsRegTrib: any[] = [];
  lsSectorEmp: any[] = Constantes.sectorEmpresa;
  idSectorEmp: number;

  public imagePath;
  imgURL: any;
  public fotoSeleccionada: File;
  rucError = true;
  modalRef: NgbModalRef;

  ngOnInit() {
    // this.listarTiposEmpresa();
    this.listarRegTributario();
    if (this.input_empresa != null) {
      this.empresa = Object.assign({}, this.input_empresa);
      this.idSectorEmp = this.empresa.sector;
      // this.tipoEmpresa = this.input_empresa.tipoEmp.idTipoEmp;
      this.regTributario = this.input_empresa.regTrib.idRegTrib;
      if (this.empresa.logo != null) {
        this.imgURL = URL_SERVICIOSBACK + 'empresa/uploadImage/img/' + this.empresa.logo
      } else {
        this.imgURL = "../../../../../../../assets/images/logo-default.png";
      }
    } else {
      this.imgURL = "../../../../../../../assets/images/logo-default.png";
    }

    this.existeRuc()
  }

  subirFoto(event) {
    var reader = new FileReader();
    this.fotoSeleccionada = event.target.files[0];
    this.imagePath = event.target.files;
    reader.readAsDataURL(this.fotoSeleccionada);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  // listarTiposEmpresa(){
  //   this.empresaService.listarTipoEmpresa().subscribe((resp:any) => {
  //     if(resp.estado==1){this.lsTipoEmp=resp.aaData;
  //     }else{Swal.fire(Constantes.ERROR,resp.msg , 'error');}},
  //     (err)=>{Swal.fire(Constantes.ERROR,err.status+" "+err.error.error , 'error');});
  // }

  listarRegTributario() {
    this.empresaService.listarRegTributario().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRegTrib = resp.aaData;
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  armarObjeto() {
    this.empresa.sector = this.idSectorEmp;
    // this.objTipoEmpresa={"idTipoEmp":this.tipoEmpresa,"descripcion":"noNulo"};
    this.objRegTributario = { "idRegTrib": this.regTributario, "descripcion": "noNulo" };
    this.objEmpresa_final = {
      "empresa": this.empresa,
      // "tipoEmpresa": this.objTipoEmpresa,
      "regTributario": this.objRegTributario
    }
  }

  cargarImgDefault() {
    if (this.empresa.logo != null && this.empresa.logo.length > 10) {
      this.imgURL = URL_SERVICIOSBACK + 'empresa/uploadImage/img/' + this.empresa.logo
    } else {
      this.imgURL = "../../../../../../../assets/images/logo-default.png";
    }
    this.fotoSeleccionada = null;
  }

  confirmarNuevoEmpresa() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.armarObjeto();

    this.modalRef = this.modalService.open(ConfirmarNuevoEmpresaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_empresa = this.objEmpresa_final;
    this.modalRef.componentInstance.input_logo = this.fotoSeleccionada;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  verificarRuc(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    // if (tecla == 8) {
    //   return true;
    // }else{
    // Patron de entrada, en este caso solo acepta numeros y letras
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);

    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Solo se permiten numeros del 0 al 9", timer: 1500, showConfirmButton: false });
      return false;
    } else
      if (this.cantidadDigitos(this.empresa.ruc) == 11) {
        Swal.fire({ title: "El RUC no debe tener mas de 11 digitos", timer: 1500, showConfirmButton: false });
        return false;
      } else { return true; }
  }

  validarRuc() {debugger
    var cant_dig = this.cantidadDigitos(this.empresa.ruc);
    if (cant_dig < 11 && this.empresa.ruc != "") {
      Swal.fire({ title: "El RUC debe tener 11 digitos", timer: 1000, showConfirmButton: false });
    } else if (cant_dig === 11) {
      this.existeRuc();
    };
  }

  existeRuc() {debugger
    if (this.input_empresa == null) {
      this.verificarExisteRuc();
    } else {
      if (this.input_empresa.ruc == this.empresa.ruc) {
        this.rucError = false;
      } else {
        this.verificarExisteRuc();
      }
    }
  }

  verificarExisteRuc() {debugger
    this.empresaService.existeRuc(this.empresa.ruc).subscribe((resp: any) => {
      if (resp) {
        this.rucError = resp;
        Swal.fire({ title: "Este RUC ya ha sigo asignado a otra empresa", timer: 2000, showConfirmButton: false });
      } else {
        this.rucError = resp;
      }
    });
  }

  cantidadDigitos(valor): number {
    var cont = 0;
    while (valor >= 1) {
      valor = valor / 10;
      cont++;
    }
    return cont;
  }

}
