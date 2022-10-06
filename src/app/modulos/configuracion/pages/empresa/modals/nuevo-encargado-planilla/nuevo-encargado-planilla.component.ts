import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { Empresa } from '../../../../../../models/Empresa';
import { EncargadoPlanilla } from '../../../../../../models/Encargado-Planilla';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { TrabajadorService } from '../../../../../trabajador/services/trabajador/trabajador.service';

@Component({
  selector: 'app-nuevo-encargado-planilla',
  templateUrl: './nuevo-encargado-planilla.component.html',
  styleUrls: []
})
export class NuevoEncargadoPlanillaComponent implements OnInit {

  @Input() input_empresa;

  empresa: Empresa = new Empresa();
  // encargadoPlan: EncargadoPlanilla = new EncargadoPlanilla();
  lsTrabajador: any[] = [];
  idTrabajador:number;

  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService,
    public trabajadorService: TrabajadorService,
  ) { }

  ngOnInit() {
    this.empresa = this.input_empresa;
    this.listarTrabajadores();
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarTrabajadores() {
    this.trabajadorService.listarTrabajador(this.empresa).subscribe((resp: any) => {
      this.lsTrabajador = resp.aaData;
      this.lsTrabajador.forEach(trabajador => {
        trabajador.nombres = trabajador.apePater + " " + trabajador.apeMater + " " + trabajador.nombres
      });
    })
  }

  registrarEncargadoPlan() {
    var tmp = {
      "empresa": this.empresa,
      "trabajador": {
        "idTrabajador":this.idTrabajador
      }
    }
    this.empresaService.registrarEncargadoPlan(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.activemodal.dismiss();
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
  }

  // verificarNumero(valor) {
  //   var tecla = (document.all) ? valor.keyCode : valor.which;
  //   if (tecla == 8) {
  //     return true;
  //   } else {
  //     // Patron de entrada, en este caso solo acepta numeros y letras
  //     var patron = /[0-9]/;
  //     var tecla_final = String.fromCharCode(tecla);

  //     if (!patron.test(tecla_final)) {
  //       Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
  //       return false;
  //     } else {  //limites
  //       if (this.cantidadDigitos(this.encargadoPlan.nroDni) == 8) {
  //         Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     }
  //   }
  // }

  // cantidadDigitos(valor): number {
  //   var cont = 0;
  //   while (valor >= 1) {
  //     valor = valor / 10;
  //     cont++;
  //   }
  //   return cont;
  // }

}
