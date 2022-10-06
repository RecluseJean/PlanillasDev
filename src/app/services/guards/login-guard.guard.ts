import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  estadologin: boolean = true;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate() {
    this._usuarioService.estaLogueado().subscribe(
      result => {
        this.estadologin = true;
      },
      error => {
        if (error.status != 200) {
          this._usuarioService.logout();
          this.estadologin=false;
          this.router.navigate(['/login']);
        }
      }
    );
    return this.estadologin;
  }
}
