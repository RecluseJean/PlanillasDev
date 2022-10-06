import { Pagination } from "../modulos/Pagination.model";
import { PuestoAreaEmpresa } from './PuestoAreaEmpresa';

export class ProyeccionPuesto extends Pagination {

    public iidProyeccion: number;
    public iorden: number;

    public accion:String;
    public estado:number;
}
