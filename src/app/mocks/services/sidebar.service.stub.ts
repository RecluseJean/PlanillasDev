import { of } from "rxjs";
of(this.purposes);
import ConstantesDatosPrueba from '../ConstantesMockito';

export class SidebarServiceStub{
    modulos  = ConstantesDatosPrueba.ResponseWrapperModuloAdmin;
    cargarPaginasPerfil(){
        return of(this.modulos)
    }
}