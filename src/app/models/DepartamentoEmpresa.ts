import { Pagination } from "../modulos/Pagination.model";
import { Trabajador } from './Trabajador';

export class DepartamentoEmpresa extends Pagination {

    public iidDepartamentoEmpresa: number;
    public snombre: String;
    public accion: string;
    public iestado: number;
    public gerente: Trabajador = new Trabajador();
}
