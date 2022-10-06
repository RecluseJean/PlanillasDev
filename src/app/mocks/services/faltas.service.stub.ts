import { of } from "rxjs";
of(this.purposes);
import ConstantesDatosPrueba from '../ConstantesMockito';

export class FaltaServiceStub {

    listarFaltasPorTrabajador(resp) {
        var crudFalta = ConstantesDatosPrueba.CRUDFaltas;
        crudFalta.msg = "Faltas listadas correctamente";
        crudFalta.estado = resp;
        return of(crudFalta);
    }

    registrarFalta(resp) {
        var crudFalta = ConstantesDatosPrueba.CRUDFaltas;
        crudFalta.msg = "Falta registrada correctamente";
        crudFalta.estado = resp;
        return of(crudFalta);
    }

    actualizarFalta(resp) {
        var crudFalta = ConstantesDatosPrueba.CRUDFaltas;
        crudFalta.msg = "Falta actualizada correctamente";
        crudFalta.estado = resp;
        return of(crudFalta);
    }

    buscarFecha(resp) {
        return of({"defaultObj":resp})
    }

    eliminarFalta(resp){
        return of({"defaultObj":resp})
    }
}
