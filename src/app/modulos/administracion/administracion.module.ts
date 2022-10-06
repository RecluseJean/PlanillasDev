import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ADMINISTRACION_ROUTES } from './administracion.routes';
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { GestionUsuariosComponent } from './pages/usuarios/gestion-usuario.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms';

import { NuevoUsuarioComponent } from './pages/usuarios/modals/nuevo-usuario/nuevo-usuario.component';
import { UsuarioService } from './services/usuarios/usuario.service';
import { NuevoUsuarioConfirmarComponent } from './pages/usuarios/modals/nuevo-usuario-confirmar/nuevo-usuario-confirmar.component';
import { RolService } from './services/roles/roles.service';
import { NuevoPasswordComponent } from './pages/usuarios/modals/nuevo-password/nuevo-password.component';
import { NuevoPasswordConfirmarComponent } from './pages/usuarios/modals/nuevo-password-confirmar/nuevo-password-confirmar.component';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GlobalInterceptor } from '../../global.interceptor';
import { GestionPaginasComponent } from './pages/paginas/gestion-paginas.component';
import { EditarGestionPaginasComponent } from './pages/paginas/modals/editar-gestion-paginas/editar-gestion-paginas.component';
import { ConfirmarGestionPaginasComponent } from './pages/paginas/modals/confirmar-gestion-paginas/confirmar-gestion-paginas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GestionUtilitarioComponent } from './pages/utilitario/gestion-utilitario.component';
import { MaterialModule } from '../../material.module';

@NgModule({
    imports:[
        CommonModule,
        ADMINISTRACION_ROUTES,
        SharedModule,
        NgbModule,
        FormsModule,
        NgSelectModule,
        TimePickerModule,
        NgxPaginationModule,
        MaterialModule
    ],
    declarations:[
        GestionUsuariosComponent,
        NuevoUsuarioComponent,
        NuevoUsuarioConfirmarComponent,
        NuevoPasswordComponent,
        NuevoPasswordConfirmarComponent,
        GestionUtilitarioComponent,
        GestionPaginasComponent,
        EditarGestionPaginasComponent,
        ConfirmarGestionPaginasComponent,
    ],
    entryComponents:[
        NuevoUsuarioComponent,
        NuevoUsuarioConfirmarComponent,
        NuevoPasswordComponent,
        NuevoPasswordConfirmarComponent,
        EditarGestionPaginasComponent,
        ConfirmarGestionPaginasComponent
    ],
    providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalInterceptor,
            multi: true,
          },
          DatePipe,
          UsuarioService,
          RolService
    ]
})
export class AdministracionModule{ }
