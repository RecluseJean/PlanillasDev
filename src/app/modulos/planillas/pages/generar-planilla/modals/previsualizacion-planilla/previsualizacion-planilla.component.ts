import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parametros } from '../../../../../../models/parametros.models';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Empresa } from '../../../../../../models/Empresa';
import { interval } from 'rxjs';


@Component({
  selector: 'app-previsualizacion-planilla',
  templateUrl: './previsualizacion-planilla.component.html',
  styles: []
})
export class PrevisualizacionPlanillaComponent implements OnInit {

  @Input() input_planilla_historica;
  @Input() input_lsphDsctRemu;

  constructor(
    public activemodal: NgbActiveModal,
    public PlanillasService: PlanillasService,
    public router: Router
  ) { }

  planilla_historica: any;
  tardanza: Parametros = new Parametros();
  tipo_tardanza: Parametros = new Parametros();
  labelTardanza: String;
  labelTipoTardanza: String;
  lsphDsctRemu: any[] = [];
  lsphDsct: any[] = [];
  lsphRemu: any[] = [];
  interval: any;
  contador: number = 0;

  lsvpIngresos: any []=[];
  lsvpDescuentos: any []=[];
  empresa: Empresa = new Empresa();

  ngOnInit() {

    this.planilla_historica = this.input_planilla_historica;
    this.lsphDsctRemu = this.input_lsphDsctRemu;
    this.separarLista();
    this.calcularValores();
    this.tardanza = this.input_planilla_historica.valorTipoTard;
    this.tipo_tardanza = this.input_planilla_historica.valorClaseTipoTard;
    switch (this.tardanza) {
      case "1": this.labelTardanza = "(dias)"; this.labelTipoTardanza = "POR DIAS"; break;
      case "2": this.labelTardanza = "(minutos)";
        switch (this.tipo_tardanza) {
          case "1": this.labelTipoTardanza = "MINUTOS EXACTOS"; break;
          case "2": this.labelTipoTardanza = "RANGO COMPLETO"; break;
          default: this.labelTipoTardanza = null;
        }; break;
      default: this.labelTardanza = null; this.labelTipoTardanza = null;
    }
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.listarDescuentosVP();
    this.listarIngresosVP();
    this.iniciarTemporizador();
   
  }


  separarLista() {
    this.lsphDsctRemu.forEach(element => {
      if (element.descuentos != null) {
        this.lsphDsct.push(element);
      } else {
        this.lsphRemu.push(element);
      }
    });
  }

  listarIngresosVP() { //debugger
    //var empresa = this.input_planilla_historica.contrato.trabajador.empresa.idEmpresa;
    this.PlanillasService.listarIngresosVP(this.planilla_historica).subscribe((resp: any) => {
      this.lsvpIngresos = resp.aaData;
    })
  }

  listarDescuentosVP() { //debugger
    this.PlanillasService.listarDescuentosVP(this.planilla_historica).subscribe((resp: any) => {
      this.lsvpDescuentos = resp.aaData;
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  calcularValores() {
    var remHorEx25 = parseFloat((this.input_planilla_historica.remHoExt25).toFixed(2));
    this.planilla_historica.remHoExt25 = remHorEx25;

    var remJorNorm = parseFloat((this.input_planilla_historica.remJorNorm).toFixed(2));
    this.planilla_historica.remJorNorm = remJorNorm;

    var remHoExt35 = parseFloat((this.input_planilla_historica.remHoExt35).toFixed(2));
    this.planilla_historica.remHoExt35 = remHoExt35;

    var asigFam = parseFloat((this.input_planilla_historica.asigFam).toFixed(2));
    this.planilla_historica.asigFam = asigFam;

    var remDiaFerdoLabo = parseFloat((this.input_planilla_historica.remDiaFerdoLabo).toFixed(2));
    this.planilla_historica.remDiaFerdoLabo = remDiaFerdoLabo;

    var remDiaVaca = parseFloat((this.input_planilla_historica.remDiaVaca).toFixed(2));
    this.planilla_historica.remDiaVaca = remDiaVaca;

    var remVacaVend = parseFloat((this.input_planilla_historica.remVacaVend).toFixed(2));
    this.planilla_historica.remVacaVend = remVacaVend;

    var remGrati = this.input_planilla_historica.remGrati;
    this.planilla_historica.remGrati = parseFloat(remGrati.toFixed(2));

    var bonif29351 = this.input_planilla_historica.bonif29351;
    this.planilla_historica.bonif29351 = parseFloat(bonif29351.toFixed(2));

    var cts = this.input_planilla_historica.cts;
    this.planilla_historica.cts = parseFloat(cts.toFixed(2));

    var tard = this.input_planilla_historica.dsctTardanza;
    this.planilla_historica.dsctTardanza = parseFloat(tard.toFixed(2));

    var diasInjusti = parseFloat((this.input_planilla_historica.dsctFaltaInjusti).toFixed(2));
    this.planilla_historica.dsctFaltaInjusti = diasInjusti;

    var movilidad = parseFloat((this.input_planilla_historica.movilidad).toFixed(2));
    this.planilla_historica.movilidad = movilidad;

    var dsctFondObl = parseFloat((this.input_planilla_historica.dsctFondObl).toFixed(2));
    this.planilla_historica.dsctFondObl = dsctFondObl;

    var dsctPriSeg = parseFloat((this.input_planilla_historica.dsctPriSeg).toFixed(2));
    this.planilla_historica.dsctPriSeg = dsctPriSeg;

    var dsctComSobFLu = parseFloat((this.input_planilla_historica.dsctComSobFLu).toFixed(2));
    this.planilla_historica.dsctComSobFLu = dsctComSobFLu;

    var dsctComMixSobFlu = parseFloat((this.input_planilla_historica.dsctComMixSobFlu).toFixed(2));
    this.planilla_historica.dsctComMixSobFlu = dsctComMixSobFlu;

    var dsctComMixAnualSal = parseFloat((this.input_planilla_historica.dsctComMixAnualSal).toFixed(2));
    this.planilla_historica.dsctComMixAnualSal = dsctComMixAnualSal;

    var dsctOnp = parseFloat((this.input_planilla_historica.dsctOnp).toFixed(2));
    this.planilla_historica.dsctOnp = dsctOnp;

    var dsct5taCat = parseFloat((this.input_planilla_historica.dsct5taCat).toFixed(2));
    this.planilla_historica.dsct5taCat = dsct5taCat;

    var essaludVida = parseFloat((this.input_planilla_historica.essaludVida).toFixed(2));
    this.planilla_historica.essaludVida = essaludVida;

    var monFalt = parseFloat((this.input_planilla_historica.monFalt).toFixed(2));
    this.planilla_historica.monFalt = monFalt;

    var monAdela = parseFloat((this.input_planilla_historica.monAdela).toFixed(2));
    this.planilla_historica.monAdela = monAdela;

    var monPrest = parseFloat((this.input_planilla_historica.monPrest).toFixed(2));
    this.planilla_historica.monPrest = monPrest;

    var monComi = parseFloat((this.input_planilla_historica.remComisiones).toFixed(2));
    this.planilla_historica.remComisiones = monComi;

    var aporEssalud = parseFloat((this.input_planilla_historica.aporEssalud).toFixed(2));
    this.planilla_historica.aporEssalud = aporEssalud;

    var sctr = parseFloat((this.input_planilla_historica.sctr).toFixed(2));
    this.planilla_historica.sctr = sctr;

    var eps = parseFloat((this.input_planilla_historica.eps).toFixed(2));
    this.planilla_historica.eps = eps;

    var total = parseFloat((this.input_planilla_historica.totIngre).toFixed(2));
    this.planilla_historica.totIngre = total;

    var total_desc = parseFloat((this.input_planilla_historica.totDsct).toFixed(2));
    this.planilla_historica.totDsct = total_desc;

    var total_apor = parseFloat((this.input_planilla_historica.totApor).toFixed(2));
    this.planilla_historica.totApor = total_apor;

    var total_apagar = parseFloat((this.input_planilla_historica.totPagado).toFixed(2));
    this.planilla_historica.totPagado = total_apagar;

  }

  async print() { debugger
    await this.alertCargando();
    const obj = {
      "idPlanillaHistorico": this.planilla_historica.idPlanillaHistorico
    }
    this.PlanillasService.reportes(obj).subscribe((resp: any) => {
      Swal.fire(Constantes.SUCCESS, 'Planilla lista', 'success');
      var reporte: any = resp;
      var file = new Blob([reporte], { type: 'application/pdf' });
      var nombres: String = this.planilla_historica.contrato.trabajador.nombres;
      var nombres_sinesp = nombres.trim();
      var apat: String = this.planilla_historica.contrato.trabajador.apePater;
      var apat_sinesp = apat.trim();
      var apmat: String = this.planilla_historica.contrato.trabajador.apeMater;
      var apmat_sinesp = apmat.trim();
      var desc_ano: String = this.planilla_historica.pdoAno.descripcion;
      var desc_mes: String = this.planilla_historica.pdoMes.descripcion;

      saveAs(file, `${nombres_sinesp}_${apat_sinesp}_${apmat_sinesp}-${desc_mes}-${desc_ano}.pdf`);
      this.refrescar(this.router.url);
      this.close();

    },
      (error) => { Swal.fire(Constantes.ERROR, 'Ocurrio un error al descargar la planilla', 'error') });

  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  async alertCargando() {
    let timerInterval;
    await Swal.fire({
      title: 'Descargando',
      html: 'Espere un momento ...',
      timer: 4000,

      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    })
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

