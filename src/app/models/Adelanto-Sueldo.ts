import { Pagination } from "../modulos/Pagination.model";

export class AdelantoSueldo extends Pagination{

    public idAdelantoSueldo: number;
    public montoTotal: number;
    public nroCuotas: number;
    public fechaSol: Date;
    public fechaAdelanto: Date;
    public tipo: number;
    public nombreArchivo: String;
    public motivo: String;

    public accion?: String;
    public estado?: number;
}
