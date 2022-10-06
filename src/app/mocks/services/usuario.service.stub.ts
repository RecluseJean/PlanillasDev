import {of} from 'rxjs';
import ConstantesDatosPrueba from '../ConstantesMockito';
import { Router } from '@angular/router';


export class UsuarioServiceStub{

     router:Router;

    checkToken(){
        var datos_usu= ConstantesDatosPrueba.checkTokenUsuario;
        return of(datos_usu);
    }

    obtenerUsuarioActual(){
        var tmp_user = ConstantesDatosPrueba.usuarioPrueba1;
        this.checkToken().subscribe((resp)=>{
            localStorage.setItem('usuario',JSON.stringify(tmp_user));
        })
    }    

    login(){
        var tmp_token = ConstantesDatosPrueba.info_token_login;
        return of(tmp_token);
    }

    listarUsuarios(){
        var tmp_lista_usu = ConstantesDatosPrueba.ResponseWrapperListaUsuarios;
        return of(tmp_lista_usu)
    }

    registrarUsuario(estado){
        var tmp_crt_usu = ConstantesDatosPrueba.ResponseWrapperCUSuario;
        tmp_crt_usu.estado = estado;
        return of(tmp_crt_usu)
    }

    actualizarUsuario(estado){
        var tmp_upd_usu = ConstantesDatosPrueba.ResponseWrapperCUSuario;
        tmp_upd_usu.estado = estado;
        return of(tmp_upd_usu)
    }

    eliminarUsuario(){
        var tmp_del_usu = ConstantesDatosPrueba.ResponseWrapperCUSuario;
        return of(tmp_del_usu)
    }

    logout(){
        localStorage.clear();
    }
}