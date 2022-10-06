import { Pagination } from '../modulos/Pagination.model';

export class Descuento extends Pagination{
    public idDescuentos: number;
    public descripcion: String;
    public tipoDsct: number;
    public montoFijo: number;
    public formula: String;

    public accion: String;
    public estado: number;
}