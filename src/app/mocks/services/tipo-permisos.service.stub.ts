import { of } from "rxjs";
of(this.purposes);
import ConstantesDatosPrueba from '../ConstantesMockito';

export class TipoPermisoServiceStub {
    
    listaPermisos = ConstantesDatosPrueba.ResponseWrapperListaTipoPermisos;
    regisPermiso = ConstantesDatosPrueba.ResponseWrapperRegTipoPermiso;
    actPermiso = ConstantesDatosPrueba.ResponseWrapperActTipoPermiso;

    listarPermisosPorEmpresa(empresa) {
        return of(this.listaPermisos)
    }

    registrarPermiso(dto) {
        return of(this.regisPermiso)
    }

    actualizarPermiso(dto) {
        return of(this.actPermiso)
    }

    eliminarPermiso(id) {
        return of(true)
    }
}