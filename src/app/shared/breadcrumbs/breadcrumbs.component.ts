import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { filter, map } from 'rxjs/operators';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';
  icono: string = '';
  token: any;
  config: any;
  mostrar = true;

  constructor(
    public router: Router,
    public title: Title,
    public meta: Meta,
    public usuarioService: UsuarioService
  ) { this.iniciarConstructor(); }

  getDataRoute(): Observable<Data> {
    return this.router.events.pipe(filter(evento => evento instanceof ActivationEnd),
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data));
  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('InfoToken'));
    this.config = {
      'demand': false,
      'leftTime': this.token.expires_in,
      'template': '$!h!:$!m!:$!s!',
      'notify': [30]
    }
  }

  iniciarConstructor() {
    this.getDataRoute().subscribe(data => {
      this.label = data.titulo;
      this.icono = data.icono;
      this.title.setTitle(this.label);
      let metaTag: MetaDefinition = {
        name: 'description',
        content: this.label
      };
      this.meta.updateTag(metaTag);
      if (this.label == "Informacion Trabajador") {
        this.mostrar = false;
      } else {
        this.mostrar = true;
      }
    });
  }

  onFinished() {
    if (this.token != null) {
      Swal.fire('Sessión caducada', 'Por favor autentifiquese nuevamente ', 'error');
      this.usuarioService.logout();
    }
  }

  onNotify(event) {
    Swal.fire('Notificacion: ', 'Su sesión expirará dentro de 30 segundos', 'info')
  }


}
