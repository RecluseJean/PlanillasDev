import { of } from "rxjs";
import ConstantesDatosPrueba from '../ConstantesMockito';

export class AsistenciaServiceStub{
    
    
    listarAsistenciasPorTrabajador(estado,ano,mes) {
        var tmp = ConstantesDatosPrueba.CRUDAsistencias;
        tmp.estado = estado;
        return of(tmp);
    }

    registrarAsistencia(estado) {
        var tmp = ConstantesDatosPrueba.CRUDAsistencias;
        tmp.estado = estado;
        return of(tmp);
    }

    actualizarAsistencia(estado) {
        var tmp = ConstantesDatosPrueba.CRUDAsistencias;
        tmp.estado = estado;
        return of(tmp)
    }

    buscarFecha(boolean){
        return of({'defaultObj':boolean})
    }

    eliminarAsistencia(boolean){
        return of({'defaultObj':boolean})
    }
}