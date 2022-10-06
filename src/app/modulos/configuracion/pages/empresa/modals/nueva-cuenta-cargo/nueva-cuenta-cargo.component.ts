import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import { Empresa } from '../../../../../../models/Empresa';
import { CuentaCargo } from '../../../../../../models/Cuenta-Cargo';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-cuenta-cargo',
  templateUrl: './nueva-cuenta-cargo.component.html',
  styles: []
})
export class NuevaCuentaCargoComponent implements OnInit {

  @Input() input_empresa;
  @Input() input_cuentaCargo;

  empresa: Empresa = new Empresa();
  cuentaCargo: any = new CuentaCargo();
  lsBanco: any[] = [];
  lsTipoCuenta: any[] = Constantes.tipoCuentaEmp;
  lsTipoMoneda: any[] = Constantes.tipoModena;
  idBanco: number;
  idTipoCuenta: number;
  idTipoMoneda: number;


  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService,
  ) { }

  ngOnInit() {
    this.empresa = this.input_empresa;
    this.listarBanco();
    if(this.input_cuentaCargo != null){
      this.cuentaCargo = this.input_cuentaCargo
      this.idBanco= this.cuentaCargo.banco.idBanco
    }
  }

  listarBanco(){
    this.empresaService.listarBanco().subscribe((resp:any)=>{
      this.lsBanco = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
  crud(){
    if(this.cuentaCargo.accion == "U"){
      this.modifificarCuentaCargo();
    } else {
      this.registrarCuentaCargo();
    }
  }
  registrarCuentaCargo(){
    var tmp={
      "cuentaCargo":this.cuentaCargo,
      "banco":{
        "idBanco":this.idBanco
      },
      "empresa":this.empresa
    }
    this.empresaService.registrarCuentaCargo(tmp).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
        },
        (err) =>{
          Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
      this.activemodal.dismiss();
  }


  modifificarCuentaCargo(){
    this.cuentaCargo.banco.idBanco = this.idBanco;
    this.empresaService.modificarCuentaCargo(this.cuentaCargo).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
        },
        (err) =>{
          Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
      this.activemodal.dismiss();
  }

  verificarNumero(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
      return false;
    }
  }
}
