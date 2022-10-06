import { Pagination } from '../modulos/Pagination.model';

export class Pagina extends Pagination {

  idPagina: number;
  descripcion: string;
  url: string;
  parametros: string;
  icono: string;
  estado: number;
  orden: number;
  asignado:boolean;

  public accion: String;
}
