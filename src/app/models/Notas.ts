import { Pagination } from "../modulos/Pagination.model";

export class Notas extends Pagination {

    public idNota: number;
    public asunto: String;
    public descripcion: String;
    public fecPub: Date;
    public horIniDia: Date;
    public horFinDia: Date;
    public iidAreaDepartamentoEmpresa: number;
    public accion: string;


}