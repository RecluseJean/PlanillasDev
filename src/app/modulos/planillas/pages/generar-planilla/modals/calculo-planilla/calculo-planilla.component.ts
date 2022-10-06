import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarCalculoPlanillaComponent } from '../confirmar-calculo-planilla/confirmar-calculo-planilla.component';
import { Planilla } from '../../../../../../models/Planilla';
import { Empresa } from '../../../../../../models/Empresa';
import { Mes } from '../../../../../../models/Mes';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Año } from '../../../../../../models/Año';
import { stringify } from 'querystring';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';

@Component({
  selector: 'app-calculo-planilla',
  templateUrl: './calculo-planilla.component.html',
  styles: ['']
})
export class CalculoPlanillaComponent implements OnInit {

  @Input() input_trabajador;
  @Input() input_tipoPlan;

  constructor(
    public activemodal : NgbActiveModal,
    public planillasService : PlanillasService,
    private modalService: NgbModal
  ) { }

  tipoPlan: TipoPlanilla = new TipoPlanilla();
  pdo_ano: Año = new Año();
  planilla_final:any;
  trabajador: any;
  planilla: Planilla=new Planilla();
  empresa : Empresa = new Empresa();
  falta_injust=0;
  dias_ferdo: any;
  aux_dias_ferdo: any;
  ferdo_labrdo=0;
  dias_vacaciones=0;
  dias_computables = 0;
  vacaciones_vend = 0;
  tipo_tardanza: any;
  tipo_rango: any;
  desc_tardanza: String;
  id_tipo_tardanza : String;
  id_tipo_rango : String;

  pdo_mes : Mes = new Mes();
  ngOnInit() {

    this.pdo_mes = JSON.parse(localStorage.getItem('mesSeleccion'));
    this.pdo_ano = JSON.parse(localStorage.getItem('anoSeleccion'));
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.tipo_tardanza = JSON.parse(localStorage.getItem('tipoDeTardanza'));
    if (this.input_tipoPlan != null) {
      this.tipoPlan = this.input_tipoPlan;
    }
    this.trabajador=this.input_trabajador;
    this.inicializarPlanilla();
    this.dias_ferdo = this.pdo_mes.diasFeriadoCalend;
    this.aux_dias_ferdo = this.pdo_mes.diasFeriadoCalend;
    this.calculoDiasComptbl(this.dias_ferdo,'df');
    this.iniciarDescripcion();

  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  inicializarPlanilla(){
    this.planilla.faltas_justi=0;
    this.planilla.faltas_injusti=0;
    this.planilla.dias_vacaciones=0;
    this.planilla.dias_ferdo=this.pdo_mes.diasFeriadoCalend;
    this.planilla.dias_computables=0;
    this.planilla.ferdo_laborad=0;
    this.planilla.ho_extra25=0.0;
    this.planilla.ho_extra35=0.0;
    this.planilla.faltantes=0.0;
    this.planilla.adelanto=0.0;
    this.planilla.prestamos=0.0;
    this.planilla.vacaciones_vend = 0.0;
    this.planilla.tardanzas = 0.0;
    this.planilla.comisiones = 0.0;
  }

  iniciarDescripcion(){
    switch(this.tipo_tardanza.valor){
      case "1": this.desc_tardanza = "por dias";break;
      case "2": this.tipo_rango = JSON.parse(localStorage.getItem('tipoDeRango'));
                switch(this.tipo_rango.valor){
                  case "1": this.desc_tardanza = "por minutos";break;
                  case "2": this.desc_tardanza = "rango 10 min"; break;
                  default: this.desc_tardanza = "no definido";
                };break;
      default: this.desc_tardanza = "no definido";
    }
  }

  calculoDiasComptbl(event:number,campo){

      switch(campo){
        case 'df' :
          this.dias_computables=Constantes.DIASCOMPTBASE-this.falta_injust-this.dias_ferdo-this.dias_vacaciones;
          this.planilla.dias_computables = this.dias_computables;
          break;
        case 'fi' :
          if(this.planilla.dias_computables < this.falta_injust){
              Swal.fire(Constantes.WARNING,"Ya no quedan mas dias computables",'warning');
              this.falta_injust = 0;
              event = 0;
            }
            this.planilla.dias_computables=Constantes.DIASCOMPTBASE-event-this.ferdo_labrdo-this.dias_vacaciones;
          break;
        case 'fl':
          if(this.planilla.dias_computables < this.ferdo_labrdo){
            Swal.fire(Constantes.WARNING,"Ya no quedan mas dias computables",'warning');
            this.ferdo_labrdo = 0;
            event = 0;
            }
            this.planilla.dias_computables=Constantes.DIASCOMPTBASE-event-this.falta_injust-this.dias_vacaciones;
            this.dias_ferdo = this.aux_dias_ferdo - this.ferdo_labrdo;
            break;
        case 'dv':
            if(this.planilla.dias_computables < this.dias_vacaciones){
              Swal.fire(Constantes.WARNING,"Ya no quedan mas dias computables",'warning');
              this.dias_vacaciones = 0;
              event = 0;
              }
              this.planilla.dias_computables=Constantes.DIASCOMPTBASE-event-this.ferdo_labrdo-this.falta_injust;
              break;
        default: this.planilla.dias_computables=Constantes.DIASCOMPTBASE-this.falta_injust-this.ferdo_labrdo-this.dias_vacaciones;
      }
  }



  armarPlanillaFinal(){
    var tmp_ano=JSON.parse(localStorage.getItem("anoSeleccion"));
    var tmp_mes=JSON.parse(localStorage.getItem("mesSeleccion"));
    var tmp_tardanza = JSON.parse(localStorage.getItem("tipoDeTardanza"));
    var tmp_tiporango;
    switch(tmp_tardanza.valor){
      case "2": tmp_tiporango = JSON.parse(localStorage.getItem("tipoDeRango"));break;
      default :  tmp_tiporango = null;
    }
    this.planilla.pdo_ano=tmp_ano;
    this.planilla.pdo_mes=tmp_mes;
    this.planilla.ferdo_laborad = this.ferdo_labrdo;
    this.planilla.dias_vacaciones = this.dias_vacaciones;
    this.planilla.vacaciones_vend = this.vacaciones_vend;
    this.planilla.faltas_injusti = this.falta_injust;
    this.planilla_final={
      "contrato":this.trabajador,
      "tipoPlanilla":this.tipoPlan,
      "planilla":this.planilla,
      "tardanza":tmp_tardanza,
      "tipoRango":tmp_tiporango,
      "pdoAno":tmp_ano,
      "pdoMes":tmp_mes
    }
  }

  confirmarCalculoPlanilla(){
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.armarPlanillaFinal();
    const modalRef = this.modalService.open(ConfirmarCalculoPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );

    modalRef.componentInstance.input_planilla_final=this.planilla_final;
    modalRef.result.then((result) => {
   }, (reason) => {
    this.activemodal.close();
   });
  }



  validarCalculos(valor,campo){
    var tecla = (document.all) ? valor.keyCode : valor.which;
    if (tecla == 8) {
        return true;
    }else{
     // Patron de entrada, en este caso solo acepta numeros y letras
     var patron = /[0-9]/;
     var tecla_final = String.fromCharCode(tecla);

     if(!patron.test(tecla_final)){
      Swal.fire(Constantes.WARNING, 'Valor inválido, ingrese solo números del 0 al 9','warning');
      switch(campo){
        case 'fl': if(this.ferdo_labrdo==null){this.ferdo_labrdo=0;}
                  this.planilla.dias_computables = Constantes.DIASCOMPTBASE-this.falta_injust-this.dias_vacaciones - this.dias_ferdo; break;
        case 'fi': if(this.falta_injust==null){this.falta_injust = 0;}
                  this.planilla.dias_computables = Constantes.DIASCOMPTBASE-this.dias_vacaciones - this.dias_ferdo; break;
        case 'dv': if(this.dias_vacaciones==null){this.dias_vacaciones = 0;}
                this.planilla.dias_computables = Constantes.DIASCOMPTBASE-this.falta_injust - this.dias_ferdo; break;
      }

      return false;
    }else{
      switch(campo){
        case 'fl':    var num: String = stringify(this.ferdo_labrdo);
                      var resul: number = Number.parseInt(num + valor.key);
                      if(resul>this.dias_ferdo){
                      Swal.fire(Constantes.WARNING,`no puedes exceder los ${this.dias_ferdo} dias feriados`,'warning');
                      return false;
                    }
      }
      }
    }
  }

  onBlurvalidarNumeroDecimal(valor,campo){
    var patron = /[0-9]+(\.[0-9][0-9]?)?/;
    if(!patron.test(valor)){
      if(valor!=null){
        Swal.fire(Constantes.WARNING, 'Número invalido, ingresa un numero entero o decimal','warning');
      }
     switch(campo){
        case 'falt': this.planilla.faltantes =0 ;break;
        case 'adl': this.planilla.adelanto = 0; break;
        case 'vv': this.vacaciones_vend = 0; break;
        case 'pr': this.planilla.prestamos = 0; break;
        case 'com': this.planilla.comisiones = 0; break;
     }
     return false
   }else{return true}
  }

  onBlurValidarNumeroEntero(valor, campo){
    var patron = /[0-9]+/
    if(!patron.test(valor)){
      if(valor!=null){
        Swal.fire(Constantes.WARNING, 'Número invalido, ingresa un numero entero','warning');
      }
     switch(campo){
        case 'hrex25': if(this.planilla.ho_extra25==null){this.planilla.ho_extra25 =0;} break;
        case 'hrex35': if(this.planilla.ho_extra35==null){this.planilla.ho_extra35=0;} break;
        case 'fl': if(this.ferdo_labrdo==null){this.ferdo_labrdo=0;} break;
        case 'fi': if(this.falta_injust==null){this.falta_injust=0;}  break;
        case 'dv': if(this.dias_vacaciones==null){this.dias_vacaciones = 0;} break;
        case 'trd': if(this.planilla.tardanzas==null){this.planilla.tardanzas=0} break;

     }
     return false
   }else{return true}
  }


   cantidadDigitos(valor): number {
    var cont = 0;
    while(valor>=1){
    valor = valor/10;
    cont++;
  }
  return cont;
  }
}

