import { Pagination } from '../modulos/Pagination.model';

export class Contrato extends Pagination{
public  idContrato?: Number;
public  regAlterAcuAtp?: Number;
public  discap?: Number;
public  jorMax?: Number;
public  horNoc?: Number;
public  fecInicio: Date;
public fecFin?: Date;
public fechaFirma?: Date;
public  sueldoBase: Number;
public  valorHora?: Number;
public  tipoCuenta?: Number;
public  tipoMoneda?: Number;
public  nroCta?: String;
public  nroCci?:String;
public  movilidad?:Number;
public  otrIgr5ta?: Number;
public  sindical?: Number;
public  epsServPropSalud?: Number;
public  quintaExo?: Number;
public  cuentaCTS : String;
public tipoComprob: number;
public accion: string;
}
