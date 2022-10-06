import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConceptoPlanilla } from '../../../../../../models/ConceptoPlanilla';
import { CuentaContable } from '../../../../../../models/CuentaContable';
import { Empresa } from '../../../../../../models/Empresa';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarConceptoCuentaComponent } from '../confirmar-concepto-cuenta/confirmar-concepto-cuenta.component';
import Swal from 'sweetalert2';
import { ConceptoCuentaService } from '../../../../services/concepto-cuenta/concepto-cuenta.service';
import { ConceptoPlame } from '../../../../../../models/ConceptoPlame';

@Component({
  selector: 'app-nuevo-concepto-cuenta',
  templateUrl: './nuevo-concepto-cuenta.component.html',
  styles: []
})
export class NuevoConceptoCuentaComponent implements OnInit, OnDestroy {

  @Input() input_concue;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public conceptoCuentaSercive: ConceptoCuentaService
  ) { }

  empresa: Empresa = new Empresa();
  conceptoPlanilla: any = new ConceptoPlanilla();
  cuentaContable: any = new CuentaContable();
  //conceptoPlame: any = new ConceptoPlame();
  mostrar: boolean = true;
  accion: string = "";
  lscuenta: Array<any> = [];
  lsplame: any[]= [];
  idHaberProvision: number;
  idDebeProvision: number;
  idHaberPago: number;
  idDebePago: number;
  conceptoPlame: number = null;

  objConcepPlame: any = null;
  tecla: any;
  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.listarCuentaContable();
    this.listarConceptoPlame();
    this.accion = this.input_concue.accion;

    if (this.accion == "RCU" || this.accion == "ACU") {
      this.mostrar = false;
    }

    if (this.accion == "ACO") {
      this.conceptoPlanilla = this.input_concue;
      this.idHaberProvision = this.conceptoPlanilla.cuentaHaberProvision != null ? this.conceptoPlanilla.cuentaHaberProvision.iidCuentaContable : null;
      this.idDebeProvision = this.conceptoPlanilla.cuentaDebeProvision != null ? this.conceptoPlanilla.cuentaDebeProvision.iidCuentaContable : null;
      this.idHaberPago = this.conceptoPlanilla.cuentaHaberPago != null ? this.conceptoPlanilla.cuentaHaberPago.iidCuentaContable : null;
      this.idDebePago = this.conceptoPlanilla.cuentaDebePago != null ? this.conceptoPlanilla.cuentaDebePago.iidCuentaContable : null;
      this.conceptoPlame = this.conceptoPlanilla.conceptoPlame !=null ? this.conceptoPlanilla.conceptoPlame.idConceptoPlame : null;
    } else if (this.accion == "ACU") {
      this.cuentaContable = this.input_concue;
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarCuentaContable() {
    this.conceptoCuentaSercive.listarCuentaContable(this.empresa).subscribe((resp: any) => {
      var ls: Array<CuentaContable> = [];
      resp.aaData.forEach(cuenta => {
        cuenta.codigoDescripcion = cuenta.icodigoCuenta + " - " + cuenta.sdescripcion
        ls.push(cuenta);
      });
      this.lscuenta = ls;
    })
  }

  listarConceptoPlame() {
    this.conceptoCuentaSercive.listarConceptoPlame().subscribe((resp: any) => {
      var ls: Array<ConceptoPlame> = [];
      resp.aaData.forEach(concepto => {
        concepto.conceptoDescripcion = concepto.codigo + " - " + concepto.descripcion
        ls.push(concepto);
      });
      this.lsplame = ls;
    })
  }

  escogerCO() {
    if (this.accion == "RCO") {
      this.registrarConceptoPlanilla();
    } else {
      this.actualizarConceptoPlanilla();
    }
  }

  registrarConceptoPlanilla() {
    var cuentaHaberProvision: any;
    var cuentaDebeProvision: any;
    var cuentaHaberPago: any;
    var cuentaDebePago: any;

    if (this.idHaberProvision != undefined) {
      cuentaHaberProvision = {
        "iidCuentaContable": this.idHaberProvision
      }
    } else { cuentaHaberProvision = null; }

    if (this.idDebeProvision != undefined) {
      cuentaDebeProvision = {
        "iidCuentaContable": this.idDebeProvision
      }
    } else { cuentaDebeProvision = null; }

    if (this.idHaberPago != undefined) {
      cuentaHaberPago = {
        "iidCuentaContable": this.idHaberPago
      }
    } else { cuentaHaberPago = null; }

    if (this.idDebePago != undefined) {
      cuentaDebePago = {
        "iidCuentaContable": this.idDebePago
      }
    } else { cuentaDebePago = null; }

    var concPlanilla = {
      "sdescripcion": this.conceptoPlanilla.sdescripcion,
      "cuentaHaberProvision": cuentaHaberProvision,
      "cuentaDebeProvision": cuentaDebeProvision,
      "cuentaHaberPago": cuentaHaberPago,
      "cuentaDebePago": cuentaDebePago
    }

    var empresaDTO = {
      "empresa": this.empresa,
      "conceptoPlanilla": concPlanilla,
      "accion": "RCO"
    }
    this.openModalConfirmar(empresaDTO);
  }

  actualizarConceptoPlanilla() {
    var cuentaHaberProvision: any;
    var cuentaDebeProvision: any;
    var cuentaHaberPago: any;
    var cuentaDebePago: any;
    var conceptoPlame: any;

    if (this.idHaberProvision != undefined) {
      cuentaHaberProvision = {
        "iidCuentaContable": this.idHaberProvision
      }
    } else { cuentaHaberProvision = null; }

    if (this.idDebeProvision != undefined) {
      cuentaDebeProvision = {
        "iidCuentaContable": this.idDebeProvision
      }
    } else { cuentaDebeProvision = null; }

    if (this.idHaberPago != undefined) {
      cuentaHaberPago = {
        "iidCuentaContable": this.idHaberPago
      }
    } else { cuentaHaberPago = null; }

    if (this.idDebePago != undefined) {
      cuentaDebePago = {
        "iidCuentaContable": this.idDebePago
      }
    } else { cuentaDebePago = null; }

    if (this.conceptoPlame != undefined) {
      conceptoPlame = {
        "idConceptoPlame": this.conceptoPlame
      }
    } else { conceptoPlame = null; }

    var concPlanilla = {
      "iidConceptoPlanilla": this.conceptoPlanilla.iidConceptoPlanilla,
      "sdescripcion": this.conceptoPlanilla.sdescripcion,
      "cuentaHaberProvision": cuentaHaberProvision,
      "cuentaDebeProvision": cuentaDebeProvision,
      "cuentaHaberPago": cuentaHaberPago,
      "cuentaDebePago": cuentaDebePago,
      "scolumnaBD": this.conceptoPlanilla.scolumnaBD,
      "empresa": this.empresa,
      "accion": this.conceptoPlanilla.accion,
      'conceptoPlame': conceptoPlame
    }
    this.openModalConfirmar(concPlanilla);
  }

  escogerCU() {
    if (this.accion == "RCU") {
      this.registrarCuentaContable();
    } else {
      this.openModalConfirmar(this.cuentaContable);
    }
  }

  registrarCuentaContable() {
    var cuenta = {
      "empresa": this.empresa,
      "cuentaContable": this.cuentaContable,
      "accion": "RCU"
    }
    this.openModalConfirmar(cuenta);
  }

  public openModalConfirmar(obj) {
    this.modalRef = this.modalService.open(ConfirmarConceptoCuentaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_concue = obj;
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  verificarNumero(valor) {
    this.tecla = this.obtenerCodigoAsc(valor);
    // Patron de entrada, en este caso solo acepta numeros y letras
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(this.tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({title:"Valor inválido, ingrese solo números del 0 al 9",timer:1500,showConfirmButton:false});
      return false;
    }
  }

  obtenerCodigoAsc(valor): any {
    return (document.all) ? valor.keyCode : valor.which;
  }

}
