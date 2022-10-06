import { Pagination } from "../modulos/Pagination.model";


export class Actividades extends Pagination {

    public idActividad: number;
    public asunto: String;
    public descripcion: String;
    public fecPub: Date;
    public horIniDia: Date;
    public horFinDia: Date;
    public iidAreaDepartamentoEmpresa: number;
    public accion: string;
    
}