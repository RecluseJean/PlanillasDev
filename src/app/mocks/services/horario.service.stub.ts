import { of } from "rxjs";
of(this.purposes);
import ConstantesDatosPrueba from '../ConstantesMockito';

export class HorarioServiceStub{
    
    lsListHorario = ConstantesDatosPrueba.ResponseWrapperListaHorario;
    lsRegHorario =ConstantesDatosPrueba.ResponseWrapperRegistrarHorario;
    lsActHorario = ConstantesDatosPrueba.ResponseWrapperActualizarHorario;

    listarHorariosPorEmpresa(empresa){
        return of(this.lsListHorario)
    }

    registrarHorario(horario){
        return of(this.lsRegHorario)
    }

    actualizarHorario(horario){
        return of(this.lsActHorario)
    } 
}