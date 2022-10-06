import { Pagination } from '../modulos/Pagination.model';

export class Mes extends Pagination{
  public	idPdoMes:Number;
  public	descripcion:String;
  public	abrev:String;
  public  diasFeriadoCalend:Number;
  public cantidadDias: Number;
  public txtDiasFeriados: String;
}
