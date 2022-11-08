import { NgModule } from '@angular/core';
import { RRHH_ROUTES } from './rrhh.routes';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { TreeTableModule } from 'ng-treetable';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { PuestoAreaEmpresaService } from './services/puesto-area-empresa/puesto-area-empresa.service';
import { PuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/puesto-area-empresa.component';

import { NuevoPuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/modals/nuevo-puesto-area-empresa/nuevo-puesto-area-empresa.component';
import { AreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/area-departamento-empresa.component';
import { ConfirmarNuevaAreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/modals/confirmar-nueva-area-departamento-empresa/confirmar-nueva-area-departamento-empresa.component';

import { AreaDepartamentoEmpresaService } from './services/area-departamento-empresa/area-departamento-empresa.service';
import { DepartamentoEmpresaComponent } from './pages/departamentoEmpresa/departamento-empresa.component';
import { ConfirmarNuevoDepartamentoEmpresaComponent } from './pages/departamentoEmpresa/modals/confirmar-nuevo-departamentoEmpresa/confirmar-nuevo-departamento-empresa.component';
import { NuevoDepartamentoEmpresaComponent } from './pages/departamentoEmpresa/modals/nuevo-departamentoEmpresa/nuevo-departamento-empresa.component';
import { DepartamentoEmpresaService } from './services/departamentoEmpresa/departamento-empresa.service';
import { MaterialModule } from '../../material.module';

import { CalendarioService } from './services/calendario/calendario.service';
import { ComunicadosService } from './services/comunicados/comunicados.service';
import { BuzonSugerenciaComponent } from './pages/buzon-sugerencia/buzon-sugerencia-component';
import { RecursosHumanosComponent } from './rrhh.component';
import { BuzonSugerenciaService } from './services/buzon-sugerencia/buzon-sugerencia.service';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { ComunicadosComponent } from './pages/comunicados/comunicados.component';
import { NuevaAreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/modals/nueva-area-departamento-empresa/nueva-area-departamento-empresa.component';
import { NuevaActividadComponent } from './pages/comunicados/modals/nueva-actividad/nueva-actividad.component';
import { NuevaActividadConfirmarComponent } from './pages/comunicados/modals/nueva-actividad-confirmar/nueva-actividad-confirmar.component';
import { NuevaNotaComponent } from './pages/comunicados/modals/nueva-nota/nueva-nota.component';
import { NuevaNotaConfirmarComponent } from './pages/comunicados/modals/nueva-nota-confirmar/nueva-nota-confirmar.component';
import { NuevoCronogramaComponent } from './pages/comunicados/modals/nuevo-cronograma/nuevo-cronograma.component';
import { NuevoCronogramaConfirmarComponent } from './pages/comunicados/modals/nuevo-cronograma-confirmar/nuevo-cronograma-confirmar.component';
import { NuevaSugerenciaComponent } from './pages/buzon-sugerencia/modals/nueva-sugerencia/nueva-sugerencia.component';
import { NuevaSugerenciaConfirmarComponent } from './pages/buzon-sugerencia/modals/nueva-sugerencia-confirmar/nueva-sugerencia-confirmar.component';
import { ConfirmarNuevoPuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/modals/confirmar-nuevo-puesto-area-empresa/confirmar-nuevo-puesto-area-empresa.component';
import { NuevoEventoComponent } from './pages/calendario/nuevo-evento/nuevo-evento.component';
import { NuevoEventoConfirmarComponent } from './pages/calendario/nuevo-evento-confirmar/nuevo-evento-confirmar.component';
import { OrganigramaService } from './services/organigrama/organigrama.service';
import { OrganigramaComponent } from './pages/organigrama/organigrama.component';


@NgModule({
  imports: [
    CommonModule,
    RRHH_ROUTES,
    SharedModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    PipesModule,
    TreeTableModule,
    //Ng2SmartTableModule,
    NgbModule,
    NgbModalModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    BsDatepickerModule,
    DatePickerModule,
    TimePickerModule,
    MaterialModule,

  ],
  
  declarations: [
      PuestoAreaEmpresaComponent,
      ConfirmarNuevoPuestoAreaEmpresaComponent,
      NuevoPuestoAreaEmpresaComponent,
      AreaDepartamentoEmpresaComponent,
      ConfirmarNuevaAreaDepartamentoEmpresaComponent,
      NuevaAreaDepartamentoEmpresaComponent,
      DepartamentoEmpresaComponent,
      ConfirmarNuevoDepartamentoEmpresaComponent,
      NuevoDepartamentoEmpresaComponent,
      CalendarioComponent,
      NuevoEventoComponent,
      NuevoEventoConfirmarComponent,
      ComunicadosComponent,
      NuevaActividadComponent,
      NuevaActividadConfirmarComponent,
      NuevaNotaComponent,
      NuevaNotaConfirmarComponent,
      NuevoCronogramaComponent,
      NuevoCronogramaConfirmarComponent,
      BuzonSugerenciaComponent,
      NuevaSugerenciaComponent,
      NuevaSugerenciaConfirmarComponent,
      OrganigramaComponent






  ],
  entryComponents: [
    PuestoAreaEmpresaComponent,
    ConfirmarNuevoPuestoAreaEmpresaComponent,
    NuevoPuestoAreaEmpresaComponent,
    AreaDepartamentoEmpresaComponent,
    ConfirmarNuevaAreaDepartamentoEmpresaComponent,
    NuevaAreaDepartamentoEmpresaComponent,
    DepartamentoEmpresaComponent,
    ConfirmarNuevoDepartamentoEmpresaComponent,
    NuevoDepartamentoEmpresaComponent,
    CalendarioComponent,
    ComunicadosComponent,
    NuevaActividadComponent,
    NuevaActividadConfirmarComponent,
    NuevaNotaComponent,
    NuevaNotaConfirmarComponent,
    NuevoCronogramaComponent,
    NuevoEventoComponent,
    NuevoEventoConfirmarComponent,
    NuevoCronogramaConfirmarComponent,
    BuzonSugerenciaComponent,
    NuevaSugerenciaComponent,
    NuevaSugerenciaConfirmarComponent,
    OrganigramaComponent
    



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
    UsuarioService,
    CalendarioService,
    ComunicadosService,
    BuzonSugerenciaService,
    PuestoAreaEmpresaService,
    AreaDepartamentoEmpresaService,
    DepartamentoEmpresaService,
    OrganigramaService,
  ],
})
export class RecursosHumanosModule { }
