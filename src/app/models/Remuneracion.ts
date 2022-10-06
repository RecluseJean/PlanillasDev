import { Pagination } from '../modulos/Pagination.model';

export class Remuneracion extends Pagination{
    public idRemuneraciones: number;
    public descripcion: String;
    public tipoRemuneracion: number;
    public montoFijo: number;
    public formula: String;
    public afectoDsct: number;

    public accion: string;
    public estado: number;
}
