import { Pagination } from '../modulos/Pagination.model';

export class Eps extends Pagination{
    public idEps: number;
    public descripcion: string;
    public aporte: number;
    public accion: string;
    public estado: number;
}
