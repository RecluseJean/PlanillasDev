import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { Usuario } from '../../../../../../models/usuario.model';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
    selector: 'app-nuevo-password-confirmar',
    templateUrl: './nuevo-password-confirmar.component.html',
    styles: []
})
export class NuevoPasswordConfirmarComponent implements OnInit {
    @Input() input_usuario;
    //@Input() input_old_pass;

    objUsuario_final: any;
    user_test: Usuario = new Usuario();
    //antiguoCorrecto: boolean = false;


    constructor(
        public activemodal: NgbActiveModal,
        private router: Router,
        public usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.objUsuario_final = this.input_usuario;
        //this.validarAntiguo();
    }

    close() {
        this.activemodal.close('Cancelado');
    }


    /* validarAntiguo() {
        this.user_test.password = this.input_old_pass;
        this.user_test.username = this.input_usuario.username;
        this.usuarioService.login(this.user_test).subscribe((resp) => {
            this.antiguoCorrecto = true;
        },
        (err) => {
            this.antiguoCorrecto = false;
        })
    } */

    public refrescar(url) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([url]));
    }

    actualizarContrasena() {
        /* if (this.antiguoCorrecto) { */
            this.usuarioService.actualizarUsuario(this.objUsuario_final).subscribe((resp: any) => {
                if (resp.estado == 1) {
                    Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
                    this.refrescar(this.router.url);
                }
                else {
                    Swal.fire(Constantes.ERROR, resp.msg, 'error');
                    this.refrescar(this.router.url);
                }
            })
            this.activemodal.dismiss();
        /* } else {
            Swal.fire(Constantes.ERROR, 'Contraseña incorrecta', 'error');
            this.activemodal.close();
        } */

    }

}