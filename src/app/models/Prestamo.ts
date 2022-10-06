import { Pagination } from '../modulos/Pagination.model';

export class Prestamo extends Pagination {

  idPrestamo: number;
  nombreArchivo: string;
  montoTotal: number;
  nroCuotas: number;
  fechaSolicitud: Date;
  fechaAbono: Date;

  public accion: string;
  public estado: number;

}
