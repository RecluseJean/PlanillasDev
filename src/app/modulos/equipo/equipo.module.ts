import { NgModule } from '@angular/core';
import { EQUIPO_ROUTES } from './equipo.routes';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { TreeTableModule } from 'ng-treetable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { GestionEquipoService } from './services/gestion-equipo/gestion-equipo.service';
import { GestionEquipoComponent } from './pages/gestion-equipo/gestion-equipo.component';
import { NuevaSolicitudComponent } from './pages/gestion-equipo/modals/nueva-solicitud/nueva-solicitud.component';
import { ConfirmarNuevaSolicitudComponent } from './pages/gestion-equipo/modals/confirmar-nueva-solicitud/confirmar-nueva-solicitud.component';
import { ReclutamientoService } from './services/reclutamiento/reclutamiento.service';
import { ConfirmarpostulanteComponent } from './pages/reclutamiento/modals/confirmarpostulante/confirmarpostulante.component';
import { IuReclutamientoComponent } from './pages/reclutamiento/modals/iu-reclutamiento/iu-reclutamiento.component';
import { ConfirmarCvPostulanteComponent } from './pages/reclutamiento/modals/visualizar-reclutamiento-postulante/confirmar-cv-postulante/confirmar-cv-postulante/confirmar-cv-postulante.component';
import { VisualizarReclutamientoPostulanteComponent } from './pages/reclutamiento/modals/visualizar-reclutamiento-postulante/visualizar-reclutamiento-postulante.component';
import { ReclutamientoComponent } from './pages/reclutamiento/reclutamiento.component';
import { PostulanteService } from './services/postulante/postulante.service';
import { MaterialModule } from '../../material.module';
import { DetallePostulanteComponent } from './pages/reclutamiento/modals/detalle-postulante/detalle-postulante.component';
import { ConfirmarEliminarSolicitudComponent } from './pages/gestion-equipo/modals/confirmar-eliminar-solicitud/confirmar-eliminar-solicitud.component';
import { NuevaSolicitudEmpresaComponent } from './pages/gestion-equipo/modals/nueva-solicitud-empresa/nueva-solicitud-empresa.component';
import { NuevoEquipoComponent } from './pages/gestion-equipo/modals/nuevo-equipo/nuevo-equipo.component';
import { ConfirmarEquipoComponent } from './pages/gestion-equipo/modals/nuevo-equipo/confirmar-equipo/confirmar-equipo.component';
import { ConfirmarNuevoTrabEquipComponent } from './pages/gestion-equipo/modals/nuevo-trabajador-equipo/confirmar-nuevo-trab-equip/confirmar-nuevo-trab-equip.component';
import { NuevoTrabajadorEquipoComponent } from './pages/gestion-equipo/modals/nuevo-trabajador-equipo/nuevo-trabajador-equipo.component';
import { VisualizarEquipoTrabajadorComponent } from './pages/gestion-equipo/modals/visualizar-equipo-trabajador/visualizar-equipo-trabajador.component';
import { VisualizarSolicitudEmpresaComponent } from './pages/gestion-equipo/modals/visualizar-solicitud-empresa/visualizar-solicitud-empresa.component';
import { EquipoService } from './services/equipo/equipo.service';
import { SolicitudService } from './services/solicitud/solicitud.service';

@NgModule({
  imports: [
    CommonModule,
    EQUIPO_ROUTES,
    SharedModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    PipesModule,
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    BsDatepickerModule,
    DatePickerModule,
    TimePickerModule,
    MaterialModule
  ],
  declarations: [
    GestionEquipoComponent,
    NuevaSolicitudComponent,
    ConfirmarNuevaSolicitudComponent,
    ReclutamientoComponent,
    IuReclutamientoComponent,
    ConfirmarpostulanteComponent,
    VisualizarReclutamientoPostulanteComponent,
    ConfirmarCvPostulanteComponent,
    DetallePostulanteComponent,
    ConfirmarEliminarSolicitudComponent,
    NuevaSolicitudEmpresaComponent,
    NuevoEquipoComponent,
    ConfirmarEquipoComponent,
    ConfirmarNuevoTrabEquipComponent,
    NuevoTrabajadorEquipoComponent,
    VisualizarEquipoTrabajadorComponent,
    VisualizarSolicitudEmpresaComponent,




  ],
  entryComponents: [
    NuevaSolicitudComponent,
    ConfirmarNuevaSolicitudComponent,
    ReclutamientoComponent,
    IuReclutamientoComponent,
    ConfirmarpostulanteComponent,
    VisualizarReclutamientoPostulanteComponent,
    ConfirmarCvPostulanteComponent,
    DetallePostulanteComponent,
    ConfirmarEliminarSolicitudComponent,
    NuevaSolicitudEmpresaComponent,
    NuevoEquipoComponent,
    ConfirmarEquipoComponent,
    ConfirmarNuevoTrabEquipComponent,
    NuevoTrabajadorEquipoComponent,
    VisualizarEquipoTrabajadorComponent,
    VisualizarSolicitudEmpresaComponent,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
    UsuarioService,
    GestionEquipoService,
    ReclutamientoService,
    PostulanteService,
    EquipoService,
    SolicitudService,
  ],
})
export class EquipoModule { }
