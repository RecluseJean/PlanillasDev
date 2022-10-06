import { Pagination } from '../modulos/Pagination.model';

export class	Afp extends Pagination{
  public idAfp : number;
  public descripcion : String;
  public comSobFlu : number;
  public comSobFluMix : number;
  public comAnuSobSal : number;
  public primaSeguro : number;
  public apoOblFndPen : number;
  public accion: String;
  public estado: number;

}
