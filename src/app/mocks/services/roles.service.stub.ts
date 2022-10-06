import { of } from 'rxjs';
import ConstantesDatosPrueba from '../ConstantesMockito';

export class RolServiceStub{
    listarPerfiles(){
        var tmp_perfiles = ConstantesDatosPrueba.ResponseWrapperListaPerfil;
        return of(tmp_perfiles);
    }
}
