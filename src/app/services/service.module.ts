import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { UsuarioService } from '../modulos/administracion/services/usuarios/usuario.service';

import {
  SidebarService,
  HeaderService,
  LoginGuardGuard,
  SettingsService,
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    HeaderService,
    UsuarioService,
    LoginGuardGuard,
    SettingsService,
    ModalService
  ],
  declarations: []
})
export class ServiceModule { }
