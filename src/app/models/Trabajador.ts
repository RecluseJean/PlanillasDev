import { Pagination } from '../modulos/Pagination.model';

export class Trabajador extends Pagination {
  public idTrabajador: number;
  public nombres: string;
  public apePater: string;
  public apeMater: string;
  public nroDoc: string;
  public fecNac: Date;
  public sexo: string;
  public correo: string;
  public nroCel: string;
  public direccion: string;
  public nomZona: string;
  public referencia: string;
  public nroHij: Number;
  public fecRegPens: Date;
  public nroCuspp: string;
  public fecIngrSalud: Date;
  public nroEssalud: string;
  public essaludVida: Number;
  public afilAseguPens: Number;
  public epsServProp: Number;
  public comiMixta: Number;
  public foto: string;
  public accion: string;
  public estado: boolean;
  public ruc: string;
}
