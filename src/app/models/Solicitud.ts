import { Pagination } from '../modulos/Pagination.model';

export class Solicitud extends Pagination{

  iidSolicitud: number;
  dbanda: number;
  smotivos: string;
  iestado: number;
  tfechaInicio: Date;

  public accion: String;
  public estado: number;
}
