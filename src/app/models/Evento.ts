import { Pagination } from "../modulos/Pagination.model";


export class Evento extends Pagination {

    public idEvento: number;
    public asunto: String;
    public descripcion: String;
    public horIniDia: Date;
    public horFinDia: Date;
    public iidAreaDepartamentoEmpresa: number;
    public accion: string;
    
}