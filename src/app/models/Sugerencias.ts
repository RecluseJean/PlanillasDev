import { Pagination } from "../modulos/Pagination.model";


export class Sugerencias extends Pagination {

    public idSugerencia: number;
    public nombres: String;
    public apellidos: String;
    public asunto: String;
    public descripcion: String;
    public fecPub: Date;
    public iidAreaDepartamentoEmpresa: number;
    public accion: string;
    
}