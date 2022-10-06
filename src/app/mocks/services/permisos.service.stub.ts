import { of } from "rxjs";
import ConstantesDatosPrueba from '../ConstantesMockito';

export class PermisoServiceStub {
    listarPermisosPorTrabajador() {
        return of(ConstantesDatosPrueba.ResponseWrapperCRUDPermiso)
    }

    registrarPermiso(permiso) {
       return of(ConstantesDatosPrueba.ResponseWrapperCRUDPermiso);
    }

    actualizarPermiso(estado) {
        var tmp = ConstantesDatosPrueba.ResponseWrapperCRUDPermiso;
        tmp.estado = estado;
        return of(tmp);
    }

    buscarFecha(bool){
        return of({"defaultObj":bool});
    }

    eliminarPermiso(bool){
        return of({"defaultObj":bool})
    }
}