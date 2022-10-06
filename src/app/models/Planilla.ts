import { Pagination } from '../modulos/Pagination.model';
import { Año } from './Año';
import { Mes } from './Mes';

export class Planilla extends Pagination{
  public	faltas_justi:Number;
  public	faltas_injusti:Number;
  public  dias_vacaciones:Number;
  public  dias_ferdo:Number;
  public  dias_computables:Number;
  public  ferdo_laborad:Number;
  public  ho_extra25:Number;
  public  ho_extra35:Number;
  public  faltantes:Number;
  public  adelanto:Number;
  public  prestamos:Number;
  public  comisiones:Number;
  public  vacaciones_vend:Number;
  public  tardanzas: Number;
  public  pdo_ano:Año;
  public  pdo_mes:Mes;
}
