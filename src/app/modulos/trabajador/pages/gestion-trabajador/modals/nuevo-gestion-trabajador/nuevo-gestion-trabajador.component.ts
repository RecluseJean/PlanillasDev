import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoGestionTrabajadorConfirmarComponent } from '../nuevo-gestion-trabajador-confirmar/nuevo-gestion-trabajador-confirmar.component';
import { Trabajador } from '../../../../../../models/Trabajador';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../../../models/Empresa';
import { Contrato } from '../../../../../../models/Contrato';
import { Router } from '@angular/router';
import { HorarioService } from '../../../../../configuracion/services/horarios/horarios.service';
import { DepartamentoEmpresa } from '../../../../../../models/DepartamentoEmpresa';


@Component({
  selector: 'app-nuevo-gestion-trabajador',
  templateUrl: './nuevo-gestion-trabajador.component.html',
  styles: []
})
export class NuevoGestionTrabajadorComponent implements OnInit, OnDestroy {

  @Input() input_trabajador_final;
  @Input() input_tipo_comprobante;
  @Input() input_trab;

  constructor(
    public trabajadorService: TrabajadorService,
    public horarioService: HorarioService,
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router
  ) { }

  validarselect: Boolean = false;
  validartd: Boolean = false;
  validarec: Boolean = false;
  validardepa: Boolean = false;
  validarprov: Boolean = false;
  validardist: Boolean = false;
  validartpcl: Boolean = false;
  validarsitu: Boolean = false;
  validartppago: Boolean = false;
  validarbanc: Boolean = false;

  esconder: Boolean = false;
  departamentoEmpresa: DepartamentoEmpresa = new DepartamentoEmpresa();
  tecla: any;
  lsTrabajador: any[] = [];
  lsTipoDoc: any[] = [];//
  lsPais: any[] = [];
  lsEstadoCiv: any[] = [];//
  lsDepartamento: any[] = [];//
  lsProvincia: any[] = [];//
  lsDistrito: any[] = [];//
  lsTipoZona: any[] = [];//
  lsNivelEdu: any[] = [];//
  lsOcupacion: any[] = [];//
  lsHorario: any[] = [];//
  lsAfp: any[] = [];//
  lsEps: any[] = [];//
  lsRegSalud: any[] = [];//
  lsSituacion: any[] = [];//
  lsRegLaboral: any[] = [];//
  lsTipoContrato: any[] = [];//
  lsCentroCosto: any[] = [];//
  lsAreaDepEmp: any[] = [];//
  lsPuesto: any[] = [];//
  lsTipoPago: any[] = [];
  lsBanco: any[] = [];//
  lsSctr: any[] = [];//
  lsSexo: any[] = Constantes.SEXO;//
  lsTipoCuenta: any[] = Constantes.tipoCuenta;
  lsTipoMoneda: any[] = Constantes.tipoModena;
  flgRuc=false;

  empresa: Empresa = new Empresa();
  trabajador: Trabajador = new Trabajador();
  epsSaludcheck = null;
  contrato: Contrato = new Contrato();
  accion: any = null;

  tipoDoc: number = null;//
  tipoComprob: number = null;
  pais: number = null;
  estCiv: number = null;//
  departamento: number = null;//
  provincia: number = null;//
  distrito: number = null;//
  tpozona: number = null;//
  nivedu: number = null;//
  ocupacion: number = null;//
  situacion: number = null;//
  regsalud: number = null;//
  sctrsaludTipo: number = null;
  epsPension: number = null;
  epsRegsalud: number = null;//
  epsSalud: number = null;
  eps_afp: number = null;
  afp: number = null;//
  reglabo: number = null;//
  tipocontrato: number = null;//
  centrocosto: number = null;//
  horario: number = null;//
  id_areaDepEmp: number = null;//
  id_puesto: number = null;//
  tipopago: number = null;
  banco: number = null;//
  tipoCuenta: number = null;
  tipoMoneda: number = null;
  bancocts: number = null;//
  sctrsalud: number = null;//
  sctrpension: number = null;
  sctrPensionEps: number = Constantes.SCTRPENSIONEPS;
  regSaludEps: number = Constantes.REGSALUDEPS;
  sctrSaludEps: number = Constantes.SCTRSALUDEPS;
  tipoPagoDeposito: number = Constantes.IDTIPOPAGODEP;
  flag_depa: boolean = true;
  flag_dist: boolean = true;
  flag_tpo_doc: boolean = true;
  objHorario: any = null;
  objTipoDoc: any = null;
  objPais: any = null;
  objEstadoCivil: any = null;
  objDepartamento: any = null;
  objProvincia: any = null;
  objDistrito: any = null;
  objTpoZona: any = null;
  objNivelEdu: any = null;
  objOcupacion: any = null;
  objAfp: any = null;
  objEpsRegSalud: any = null;
  objEpsSalud: any = null;
  objEpsPension: any = null;
  objRegSalud: any = null;
  objSituacion: any = null;
  objRegLaboral: any = null;
  objTpoContrato: any = null;
  objCentroCosto: any = null;
  objAreaDepEmp: any = null;
  objPuesto: any = null;
  objTpoPago: any = null;
  objBancoSueldo: any = null;
  objBancoCTS: any = null;
  objSCTRPension: any = null;
  objSCTRSalud: any = null;
  objTrabajador_final: any = null;
  objContrato: any = null;
  val_pasaporte: number = Constantes.IDPASAPORTE;
  valRuc: number = Constantes.IDRUC;
  modalRef: NgbModalRef

  textoDeInput: string = null;
  mayorEdad: any;
  minFecFin: any;
  fecFinDis = true;
  nroDocError = true;

  ngOnInit() {
    this.definirRangoFecha();
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.tipoComprob = this.input_tipo_comprobante;
    this.iniciarListasDatos();
    this.setearPorDefecto();
    this.iniciarChecks();
    if (this.input_trabajador_final != null) {
      this.accion = this.input_trabajador_final.accion;
      this.objTrabajador_final = this.input_trabajador_final;
      this.iniciarDropdowns();
    }
  }

  definirRangoFecha() {
    let fechaHoy = new Date();
    var ano = (fechaHoy.getFullYear() - 18);
    var mes = fechaHoy.getMonth() + 1;
    fechaHoy.getUTCDate()
    this.mayorEdad = `${ano}-${mes}-${fechaHoy.getUTCDate()}`;
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  iniciarChecks() {
    this.trabajador.epsServProp = 0;
    this.trabajador.afilAseguPens = 0;
    this.trabajador.comiMixta = 0;
    this.contrato.regAlterAcuAtp = 0;
    this.trabajador.nroHij = 0;
    this.contrato.discap = 0;
    this.contrato.jorMax = 0;
    this.contrato.horNoc = 0;
    this.contrato.otrIgr5ta = 0;
    this.contrato.sindical = 0;
    this.contrato.quintaExo = 0;
    this.trabajador.essaludVida = 0;
    this.contrato.epsServPropSalud = 0;
    // this.contrato.sueldoBase = 0;
  }

  validarFechaFin(event) {
    if (event != null) {
      var mes = event.getMonth() + 1;
      this.minFecFin = `${event.getFullYear()}-${mes}-${event.getUTCDate()}`;
      this.fecFinDis = false;
    } else {
      this.fecFinDis = true;
    }
    this.contrato.fecFin = null;
  }

  validarFechaNac(event) {
    debugger
    var sd: any = document.getElementById('fechaNacimiento');
    var no = sd.value;
    this.trabajador.fecNac = null;
    // sd = null;
    let fechaHoy = new Date();
    if (fechaHoy.getFullYear() > (event.getFullYear() + 18)) {
      // return true;
    } else if (fechaHoy.getFullYear() == (event.getFullYear() + 18)) {
      if (fechaHoy.getMonth() > event.getMonth()) {
        // return true;
      } else if (fechaHoy.getMonth() == event.getMonth()) {
        if (fechaHoy.getUTCDate() >= event.getUTCDate()) {
          // return true;
        } else {
          Swal.fire({ title: "La persona aún no ha complidado la mayoría de edad necesaria.", timer: 2500, showConfirmButton: false });
          // return false;
        }
      } else {
        Swal.fire({ title: "La persona aún no ha complidado la mayoría de edad necesaria.", timer: 2500, showConfirmButton: false });
        // return false;
      }
    } else {
      Swal.fire({ title: "La persona aún no ha complidado la mayoría de edad necesaria.", timer: 2500, showConfirmButton: false });
      // return false;
    }
  }

  iniciarListasDatos() {
    this.trabajadorService.listarTipoDoc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarPais().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPais = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarEstadoCivil().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstadoCiv = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarDepartamento().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDepartamento = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarTipoZona().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoZona = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarNivelEdu().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEdu = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarOcupacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsOcupacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarAfp(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsAfp = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarEps().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEps = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarRegSalud().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRegSalud = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarSituacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSituacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarRegLaboral().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRegLaboral = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarTipoContrato().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoContrato = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarCentroCosto(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsCentroCosto = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsAreaDepEmp = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarTipoPago().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoPago = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarBanco().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsBanco = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.trabajadorService.listarSctr().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSctr = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    this.horarioService.listarHorariosPorEmpresa(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsHorario = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error') });
  }

  setearPorDefecto() {
    this.estCiv = Constantes.IDESTCIV;
    this.nivedu = Constantes.IDNIVEEDU;
    this.tipopago = Constantes.IDTIPOPAGODEP;
  }

  iniciarDropdowns() {

    this.trabajador = this.objTrabajador_final.trabajador;
    this.contrato.idContrato = this.objTrabajador_final.idContrato;
    this.contrato.tipoComprob = this.objTrabajador_final.tipoComprob;
    this.tipoComprob = this.objTrabajador_final.tipoComprob;
    this.departamento = this.objTrabajador_final.trabajador.departamento.idDepartamento;

    if (this.objTrabajador_final.trabajador.pais != null) {
      this.pais = this.objTrabajador_final.trabajador.pais.idPais;
      this.obtenerPais();
    }

    if (this.objTrabajador_final.fecFin != null) {
      this.contrato.fecFin = this.objTrabajador_final.fecFin;
    }

    this.provincia = this.objTrabajador_final.trabajador.provincia.idProvincia;
    this.obtenerProvincias(this.departamento);
    this.distrito = this.objTrabajador_final.trabajador.distrito.idDistrito;
    this.obtenerDistrito(this.provincia);
    this.tipoDoc = this.objTrabajador_final.trabajador.tipoDoc.idTipoDoc;
    this.obtenerTipoDoc();
    if (this.tipoDoc == 3) {
      this.flag_tpo_doc = false;
    }
    this.estCiv = this.objTrabajador_final.trabajador.estadoCivil.idEstadoCivil;
    this.obtenerEstadoCivil();

    if (this.objTrabajador_final.trabajador.tipoZona != null) {
      this.tpozona = this.objTrabajador_final.trabajador.tipoZona.idTipoZona;
    }
    this.obtenerTipoZona();
    this.nivedu = this.objTrabajador_final.trabajador.nivelEdu.idNivelEdu;
    this.obtenerNivelEducativo();
    if (this.objTrabajador_final.trabajador.ocupacion != null) {
      this.ocupacion = this.objTrabajador_final.trabajador.ocupacion.idOcupacion;
      this.obtenerOcupacion();
    }
    if (this.objTrabajador_final.regimenLaboral != null) {
      this.reglabo = this.objTrabajador_final.regimenLaboral.idRegLaboral;
      this.obtenerRegLaboral();
    }
    this.tipocontrato = this.objTrabajador_final.tipoContrato.idTipContrato;
    this.obtenerTipoContrato();

    if (this.objTrabajador_final.trabajador.horario != null) {
      this.horario = this.objTrabajador_final.trabajador.horario.idHorario;
    }
    this.obtenerHorario();

    this.tipopago = this.objTrabajador_final.tipoPago.idTipoPago;
    this.obtenerTipoPago();
    this.situacion = this.objTrabajador_final.trabajador.situacion.idSituacion;
    this.obtenerSituacion();
    if (this.objTrabajador_final.areaDepEmp != null) {
      this.id_areaDepEmp = this.objTrabajador_final.areaDepEmp.iidAreaDepartamentoEmpresa;
      this.obtenerAreaDepEmp();
    }
    if (this.objTrabajador_final.puesto != null) {
      this.id_puesto = this.objTrabajador_final.puesto.iidPuesto;
      this.obtenerPuesto(this.id_areaDepEmp);
    }
    this.contrato.fecInicio = this.objTrabajador_final.fecInicio;
    this.contrato.sueldoBase = this.objTrabajador_final.sueldoBase;
    this.tipoCuenta = this.objTrabajador_final.tipoCuenta;
    this.tipoMoneda = this.objTrabajador_final.tipoMoneda;
    this.contrato.valorHora = this.objTrabajador_final.valorHora;
    this.contrato.nroCta = this.objTrabajador_final.nroCta;
    this.contrato.nroCci = this.objTrabajador_final.nroCci;
    this.contrato.movilidad = this.objTrabajador_final.movilidad;
    this.contrato.regAlterAcuAtp = this.objTrabajador_final.regAlterAcuAtp;
    this.contrato.discap = this.objTrabajador_final.discap;
    this.contrato.jorMax = this.objTrabajador_final.jorMax;
    this.contrato.horNoc = this.objTrabajador_final.horNoc
    this.contrato.otrIgr5ta = this.objTrabajador_final.otrIgr5ta;
    this.contrato.sindical = this.objTrabajador_final.sindical;
    this.contrato.quintaExo = this.objTrabajador_final.quintaExo;
    this.contrato.cuentaCTS = this.objTrabajador_final.cuentaCTS;
    this.contrato.epsServPropSalud = this.objTrabajador_final.epsServPropSalud;


    if (this.objTrabajador_final.trabajador.afp != null) {
      this.afp = this.objTrabajador_final.trabajador.afp.idAfp;
      this.obtenerRegPension(this.empresa);
    }

    if (this.objTrabajador_final.trabajador.regSalud != null) {
      this.regsalud = this.objTrabajador_final.trabajador.regSalud.idRegSalud;
      this.obtenerRegSalud();
    }
    if (this.objTrabajador_final.centroCosto != null) {
      this.centrocosto = this.objTrabajador_final.centroCosto.idCentroCosto;
      this.obtenerCentroCosto();
    }

    if (this.objTrabajador_final.sctrSalud != null) {
      this.sctrsalud = this.objTrabajador_final.sctrSalud.idSctr;
      this.sctrsaludTipo = this.objTrabajador_final.sctrSalud.tipo;
      if (this.sctrsaludTipo == 1 && this.sctrsalud == 3) {
        this.epsSaludcheck = 1;
      } else
        if (this.sctrsaludTipo == 1 && this.sctrsalud == 2) {

          if (this.contrato.epsServPropSalud == 1) {
            this.epsSaludcheck = 1;
          } else {
            this.epsSaludcheck = 0;
          }
        }
      this.obtenerSctr();
    }

    if (this.objTrabajador_final.sctrPension != null) {
      this.sctrpension = this.objTrabajador_final.sctrPension.idSctr;
      this.obtenerSctr();
    }

    if (this.objTrabajador_final.trabajador.eps != null) {
      this.epsRegsalud = this.objTrabajador_final.trabajador.eps.idEps;//cambiar ya que hay tres tipos de eps
      this.obtenerEps();
    }

    if (this.objTrabajador_final.bancoSueldo != null) {
      this.banco = this.objTrabajador_final.bancoSueldo.idBanco;

      this.obtenerBanco();
    }

    if (this.objTrabajador_final.bancoCts != null) {
      this.bancocts = this.objTrabajador_final.bancoCts.idBanco;
    }

    if (this.objTrabajador_final.epsSalud != null) {
      this.epsSalud = this.objTrabajador_final.epsSalud.idEps;
      this.obtenerEps();
    }

    if (this.objTrabajador_final.epsPension != null) {
      this.epsPension = this.objTrabajador_final.epsPension.idEps;
      this.obtenerEps();
    }


  }

  obtenerProvincias(departamento) {
    var tmp_depa = {
      "idDepartamento": departamento
    };
    this.trabajadorService.listarProvincia(tmp_depa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsProvincia = resp.aaData;
        this.flag_depa = false;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    if (departamento == null) {
      this.provincia = null;
      this.distrito = null;
    }
    if(departamento != null || departamento != undefined){
      this.validardepa = true;
    }
  }

  obtenerDistrito(provincia) {
    var tmp_prov = {
      "idProvincia": provincia
    }
    this.trabajadorService.listarDistrito(tmp_prov).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDistrito = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });

    if (provincia == null) {
      this.distrito = null;
    }
    if(provincia != null || provincia != undefined){
      this.validarprov = true;
    }
  }

  obtenerTipoDoc() {
    this.trabajadorService.listarTipoDoc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerEstadoCivil() {
    this.trabajadorService.listarEstadoCivil().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstadoCiv = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerTipoZona() {
    this.trabajadorService.listarTipoZona().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoZona = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerNivelEducativo() {
    this.trabajadorService.listarNivelEdu().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEdu = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerPais() {
    this.trabajadorService.listarPais().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPais = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerOcupacion() {
    this.trabajadorService.listarOcupacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsOcupacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerRegLaboral() {
    this.trabajadorService.listarRegLaboral().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRegLaboral = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerTipoContrato() {
    this.trabajadorService.listarTipoContrato().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoContrato = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerHorario() {
    this.horarioService.listarHorariosPorEmpresa(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsHorario = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error') });
  }

  obtenerSituacion() {
    this.trabajadorService.listarSituacion().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSituacion = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerCentroCosto() {
    this.trabajadorService.listarCentroCosto(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsCentroCosto = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerAreaDepEmp() {
    this.trabajadorService.listarAreaDepEmp(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsAreaDepEmp = resp.aaData;
      }

    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerPuesto(id_areaDepEmp) {
    if (id_areaDepEmp == null) {
      this.id_puesto = null;
    } else {
      var tmp_areaDepEmp = {
        /*  "idEmpresa": this.empresa.idEmpresa */
        "iidAreaDepartamentoEmpresa": id_areaDepEmp
      }
      this.trabajadorService.listarPuestoXArea(tmp_areaDepEmp).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsPuesto = resp.aaData;
        }
      },
        (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    }
  }

  obtenerRegPension(empresa) {
    this.trabajadorService.listarAfp(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsAfp = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerSctr() {
    this.trabajadorService.listarSctr().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSctr = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerRegSalud() {
    this.trabajadorService.listarRegSalud().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRegSalud = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerBanco() {
    this.trabajadorService.listarBanco().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsBanco = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerTipoPago() {
    this.trabajadorService.listarTipoPago().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoPago = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerEps() {
    this.trabajadorService.listarEps().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEps = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  revisarTipoDoc(tipodoc) {
    if (tipodoc == this.val_pasaporte) {
      this.flag_tpo_doc = false
    }
    else {
      this.flag_tpo_doc = true
      this.pais = null;
    }

    if(this.tipoComprob==2 && this.tipoDoc == this.valRuc){
      this.flgRuc=true;
      this.trabajador.ruc= this.trabajador.nroDoc;
    }else{
      this.flgRuc=false;
      this.trabajador.ruc= null;
    }
if(tipodoc != null || tipodoc != undefined){
  this.validartd = true;
}
  }

  calcularPorHora(event) {
    var por_hora = 0.00;
    por_hora = event / 240;
    this.contrato.valorHora = parseFloat((por_hora).toFixed(2));
  }

  checkEPS(event) {
    if (event) {
      this.contrato.epsServPropSalud = 1;
      this.epsSaludcheck = 1;
    } else {
      this.contrato.epsServPropSalud = 0;
      this.epsSaludcheck = 0;
      this.epsSalud = null;
    }
  }

  checkAfilAseg(event) {
    if (event) { this.trabajador.afilAseguPens = 1; } else { this.trabajador.afilAseguPens = 0; }
  }

  checkAlterAcuAtp(event) {
    if (event) { this.contrato.regAlterAcuAtp = 1; } else { this.contrato.regAlterAcuAtp = 0; }
  }

  checkComiMix(event) {
    if (event) { this.trabajador.comiMixta = 1; } else { this.trabajador.comiMixta = 0; }
  }

  checkDiscap(event) {
    if (event) { this.contrato.discap = 1; } else { this.contrato.discap = 0; }
  }

  checkJorMax(event) {
    if (event) { this.contrato.jorMax = 1; } else { this.contrato.jorMax = 0; }
  }

  checkHorNoc(event) {
    if (event) { this.contrato.horNoc = 1; } else { this.contrato.horNoc = 0; }
  }

  checkOtrIgr5ta(event) {
    if (event) { this.contrato.otrIgr5ta = 1; } else { this.contrato.otrIgr5ta = 0; }
  }

  checkSindical(event) {
    if (event) { this.contrato.sindical = 1; } else { this.contrato.sindical = 0; }
  }

  checkQuintaExo(event) {
    if (event) { this.contrato.quintaExo = 1; } else { this.contrato.quintaExo = 0; }
  }

  checkEssaludVida(event) {
    if (event) { this.trabajador.essaludVida = 1; } else { this.trabajador.essaludVida = 0; }
  }

  limpiarEPSreg(event) {
    if (event) {
      this.epsRegsalud = null;
      this.trabajador.fecIngrSalud = null;
    }
  }

  limpiarEPSpens(event) {
    if (event) {
      this.epsPension = null;
    }
  }
  limpiarRegPen(event) {
    if (event) {
      this.trabajador.comiMixta = 0;
      this.trabajador.fecRegPens = null;
    }
  }

  limpiarTipoPago(event) {
    if (event == null || event != Constantes.IDTIPOPAGODEP) {
      this.banco = null;
      this.contrato.nroCta = null;
      this.contrato.nroCci = null;
    }
    if(this.tipopago != null || this.tipopago != undefined){
      this.validartd = true;
    }
  }

  setearTipo(event) {
    if (event != null) {
      this.lsSctr.forEach((valor, indice) => {
        if (valor.idSctr == this.sctrsalud) {
          this.sctrsaludTipo = valor.tipo;
          if (valor.tipo != 1) {
            this.epsSalud = null;
            this.contrato.epsServPropSalud = 0;
            this.trabajador.afilAseguPens = 0;
          } else
            if (valor.idSctr == 3) {//si  es eps
              this.contrato.epsServPropSalud = 1;
              this.epsSaludcheck = 1;
            } else {
              this.contrato.epsServPropSalud = 0;
              this.epsSaludcheck = 0;
              this.epsSalud = null;
              this.trabajador.afilAseguPens = 0;
            }
        }
      });

    } else {
      this.contrato.epsServPropSalud = 0;
      this.epsSaludcheck = 0;
      this.epsSalud = null;
      this.trabajador.afilAseguPens = 0;
      this.sctrsaludTipo = null;
    }
  }

  darValor() {
    this.tipoDoc = 2;
  }

  asignandoObjetos() {
    this.contrato.tipoComprob = this.tipoComprob;
    this.contrato.tipoCuenta = this.tipoCuenta;
    this.contrato.tipoMoneda = this.tipoMoneda;
    this.trabajador.nombres = this.trabajador.nombres.replace(/\s*$/, "");
    this.trabajador.apeMater = this.trabajador.apeMater.replace(/\s*$/, "");
    this.trabajador.apePater = this.trabajador.apePater.replace(/\s*$/, "");
    this.objTipoDoc = { "idTipoDoc": this.tipoDoc };
    this.objHorario = this.horario != null ? { "idHorario": this.horario } : null;
    this.objEstadoCivil = { "idEstadoCivil": this.estCiv };
    this.objDepartamento = { "idDepartamento": this.departamento };
    this.objProvincia = { "idProvincia": this.provincia };
    this.objDistrito = { "idDistrito": this.distrito };
    this.objSituacion = { "idSituacion": this.situacion };


    if (this.pais != null) { this.objPais = { "idPais": this.pais }; }
    if (this.tpozona != null) { this.objTpoZona = { "idTipoZona": this.tpozona }; }
    if (this.nivedu != null) { this.objNivelEdu = { "idNivelEdu": this.nivedu }; }
    if (this.ocupacion != null) { this.objOcupacion = { "idOcupacion": this.ocupacion }; }
    if (this.afp != null) { this.objAfp = { "idAfp": this.afp }; }
    if (this.regsalud != null) {
      if (this.regsalud == 4) {
        this.trabajador.epsServProp = 1;
      } else {
        this.trabajador.epsServProp = 0;
      }
      this.objRegSalud = { "idRegSalud": this.regsalud };
    } else {
      this.trabajador.epsServProp = 0;
      this.epsRegsalud = null;
    }
    if (this.epsRegsalud != null) { this.objEpsRegSalud = { "idEps": this.epsRegsalud }; }//CAMBIAR YA QUE HAY TRES TIPOS DE EPS
    if (this.epsSalud != null) { this.objEpsSalud = { "idEps": this.epsSalud }; }
    if (this.epsPension != null) { this.objEpsPension = { "idEps": this.epsPension }; }

    if (this.reglabo != null) { this.objRegLaboral = { "idRegLaboral": this.reglabo }; }
    if (this.tipocontrato != null) { this.objTpoContrato = { "idTipContrato": this.tipocontrato }; }
    if (this.centrocosto != null) { this.objCentroCosto = { "idCentroCosto": this.centrocosto }; }
    if (this.id_areaDepEmp != null) { this.objAreaDepEmp = { "iidAreaDepartamentoEmpresa": this.id_areaDepEmp }; }
    if (this.id_puesto != null) { this.objPuesto = { "iidPuesto": this.id_puesto }; }
    if (this.tipopago != null) { this.objTpoPago = { "idTipoPago": this.tipopago }; }
    if (this.banco != null) { this.objBancoSueldo = { "idBanco": this.banco }; }
    if (this.bancocts != null) { this.objBancoCTS = { "idBanco": this.bancocts }; }
    if (this.sctrpension != null) { this.objSCTRPension = { "idSctr": this.sctrpension }; }
    if (this.sctrsalud != null) { this.objSCTRSalud = { "idSctr": this.sctrsalud }; }

    this.objTrabajador_final = {
      "tipoDoc": this.objTipoDoc,
      "pais": this.objPais,
      "estadoCivil": this.objEstadoCivil,
      "departamento": this.objDepartamento,
      "provincia": this.objProvincia,
      "distrito": this.objDistrito,
      "tipoZona": this.objTpoZona,
      "nivelEdu": this.objNivelEdu,
      "ocupacion": this.objOcupacion,
      "empresa": this.empresa,
      "afp": this.objAfp,
      "epsRegSalud": this.objEpsRegSalud,
      "epsSalud": this.objEpsSalud,
      "epsPension": this.objEpsPension,
      "regSalud": this.objRegSalud,
      "situacion": this.objSituacion,
      "regimenLaboral": this.objRegLaboral,
      "tipoContrato": this.objTpoContrato,
      "centroCosto": this.objCentroCosto,
      "areaDepEmp": this.objAreaDepEmp,
      "puesto": this.objPuesto,
      "tipoPago": this.objTpoPago,
      "bancoSueldo": this.objBancoSueldo,
      "bancoCts": this.objBancoCTS,
      "sctrPension": this.objSCTRPension,
      "sctrSalud": this.objSCTRSalud,
      "trabajador": this.trabajador,
      "horario": this.objHorario,
      "contrato": this.contrato
    }
    this.objTrabajador_final.accion = this.accion;
  }

  confirmarNuevoTrabajador() {
    this.openModalConfirmar();
  }

  close() {
    this.activemodal.dismiss('Cancelado');
    //this.refrescar(this.router.url);
  }

  public openModalConfirmar() {
    this.asignandoObjetos();

    this.modalRef = this.modalService.open(NuevoGestionTrabajadorConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_trabajador_final = this.objTrabajador_final;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  validarData(campo) {
    
      switch (campo) {
        case 'dni': var cont = 0; var cant_dig = this.cantidadDigitos(this.trabajador.nroDoc); 
        if (cant_dig < 8 && this.trabajador.nroDoc != null) {
          Swal.fire({ title: "DNI debe contener 8 digitos", timer: 2000, showConfirmButton: false });
          return false;
        }
          break;
        case 'ruc': var cont = 0; var cant_dig = this.cantidadDigitos(this.trabajador.nroDoc);
          if (cant_dig < 11 && this.trabajador.ruc != null) {
            Swal.fire({ title: "RUC debe contener 11 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } break;
        case 'cel': var cont = 0; var cant_dig = this.cantidadDigitos(this.trabajador.nroCel);
          if (cant_dig < 9 && this.trabajador.nroDoc != null) {
            Swal.fire({ title: "Numero de Celular debe contener 9 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } break;
        case 'nhij': if (this.trabajador.nroHij == null) { this.trabajador.nroHij = 0; return false; } break;
  
      }
  }

  validarNroDoc(){debugger
    var cant_dig = this.cantidadDigitos(this.trabajador.nroDoc);
    if (cant_dig < 8 && this.trabajador.nroDoc != "") {
      Swal.fire({ title: "DNI debe contener 8 digitos", timer: 2000, showConfirmButton: false });
    } else if (cant_dig === 8) {
      this.existeNroDoc();
    };
  }

  existeNroDoc(){debugger
    if (this.input_trab == null) {
      this.verificarExisteNroDoc();
    } else {
      if (this.input_trab.nroDoc == this.trabajador.nroDoc) {
        this.nroDocError = false;
      } else {
        this.verificarExisteNroDoc();
      }
    }
  }

  verificarExisteNroDoc() {debugger
    var clean:string = null;
    this.trabajadorService.existeNroDoc(this.trabajador.nroDoc).subscribe((resp: any) => {
      if (resp) {
        this.nroDocError = resp;
        Swal.fire({ title: "Este número de documento ya ha sigo asignado a otro trabajador", timer: 2000, showConfirmButton: false });
        this.trabajador.nroDoc = clean;
      } else {
        this.nroDocError = resp;
      }
    });
  }

  //fin ruben

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

  verificarCorreo(valor) {
    var patron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})/
    if (!patron.test(valor) && this.trabajador.correo != "" && this.trabajador.correo != null) {
      Swal.fire({ title: "Correo inválido, formato de ejemlo: name@dir.do", timer: 2000, showConfirmButton: false });
    }
  }

  obtenerCodigoAsc(valor): any {
    return (document.all) ? valor.keyCode : valor.which;
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
          case 'dni': if (this.cantidadDigitos(this.trabajador.nroDoc) == 8) {
            Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'ruc': if (this.cantidadDigitos(this.trabajador.ruc) == 11) {
            Swal.fire({ title: "El RUC no puede exceder de 11 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'cel': if (this.cantidadDigitos(this.trabajador.nroCel) == 9) {
            Swal.fire({ title: "El numero celular no puede exceder de 9 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'nrocu': if (this.cantidadDigitos(this.trabajador.nroCuspp) == 20) {
            Swal.fire({ title: "El nro CUSPP no puede exceder de 20 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'nroCci': if (this.cantidadDigitos(this.contrato.nroCci) == 20) {
            Swal.fire({ title: "El nro CCI no puede exceder de 20 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
        }
      }
    }
  }

  verificarNumeroDecimal(valor, campo) {
    var patron = /[0-9]+(\.[0-9][0-9]?)?/;
    if (!patron.test(valor)) {
      if (this.contrato.sueldoBase != null) {
        Swal.fire({ title: "Número invalido, ingresa un numero entero o decimal", timer: 2000, showConfirmButton: false });
      }

      switch (campo) {
        case 'sldb': this.contrato.sueldoBase = 0; break;
        case 'mov': this.contrato.movilidad = 0; break;
      }

    }
  }

  cantidadDigitos(valor): number {
    var cont = 0;
    while (valor >= 1) {
      valor = valor / 10;
      cont++;
    }
    return cont;
  }

  select(obj){debugger
  if(obj!=null || obj!=undefined){
  this.validarselect=true;
  }
  }

  selectec(obj){debugger
    if(obj!=null || obj!=undefined){
    this.validarec=true;
    }
    }

    selectdist(obj){
      if(obj!=null || obj!=undefined){
        this.validardist=true;
      }
    }

    selecttpcl(obj){
      if(obj!=null || obj!=undefined){
        this.validartpcl=true;
      }
    }
 
    selectsitu(obj){
      if(obj!=null || obj!=undefined){
        this.validarsitu=true;
      }
    }

    selectbanc(obj){
      if(obj!=null || obj!=undefined){
        this.validarbanc=true;
      }
    }


}