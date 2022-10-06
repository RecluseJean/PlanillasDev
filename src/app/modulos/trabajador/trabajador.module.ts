import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

//librerias
// import { Ng2TableModule } from 'ng2-table/ng2-table';
//interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TRABAJADOR_ROUTES } from './trabajador.routes';

//componentes del modulo
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { FormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { TreeTableModule } from 'ng-treetable';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select'
import { FilterPipeModule } from 'ngx-filter-pipe';

import { GestionTrabajadorComponent } from './pages/gestion-trabajador/gestion-trabajador.component';
import { NuevoGestionTrabajadorComponent } from './pages/gestion-trabajador/modals/nuevo-gestion-trabajador/nuevo-gestion-trabajador.component';
import { NuevoGestionTrabajadorConfirmarComponent } from './pages/gestion-trabajador/modals/nuevo-gestion-trabajador-confirmar/nuevo-gestion-trabajador-confirmar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TrabajadorService } from './services/trabajador/trabajador.service';
import { TipoComprobanteComponent } from './pages/gestion-trabajador/modals/tipo-comprobante/tipo-comprobante.component';
import { ReporteContratoComponent } from './pages/gestion-trabajador/modals/reporte-contrato/reporte-contrato.component';
import { ControlAsistenciaComponent } from './pages/control-asistencia/control-asistencia.component';
import { AsistenciaService } from './services/asistencia/asistencia.service';
import { NuevaAsistenciaComponent } from './pages/control-asistencia/modals/nueva-asistencia/nueva-asistencia.component';
import { MostrarAsistenciasComponent } from './pages/control-asistencia/modals/mostrar-asistencias/mostrar-asistencias.component';
import { MostrarFaltasComponent } from './pages/control-asistencia/modals/mostrar-faltas/mostrar-faltas.component';
import { FaltaService } from './services/faltas/faltas.service';
import { NuevaFaltaComponent } from './pages/control-asistencia/modals/nueva-falta/nueva-falta.component';
import { MostrarPermisoComponent } from './pages/control-asistencia/modals/mostrar-permisos/mostrar-permisos.component';
import { PermisoService } from './services/permisos/permiso.service';
import { NuevoPermisoComponent } from './pages/control-asistencia/modals/nuevo-permiso/nuevo-permiso.component';
import { TiposPermisoService } from '../configuracion/services/permisos/permisos.service';
import { HorarioService } from '../configuracion/services/horarios/horarios.service';

import { DerechoHabientesComponent } from './pages/derecho-habientes/derecho-habientes.component';
import { DerechoHabientesRelacionadosComponent } from './pages/derecho-habientes/modals/derecho-habientes-relacionados/derecho-habientes-relacionados.component';
import { NuevoDerechoHabienteComponent } from './pages/derecho-habientes/modals/nuevo-derecho-habiente/nuevo-derecho-habiente.component';
import { GestionRemuDsctComponent } from './pages/gestion-trabajador/modals/gestion-remu-dsct/gestion-remu-dsct.component';
import { NuevoRemuDsctComponent } from './pages/gestion-trabajador/modals/nuevo-remu-dsct/nuevo-remu-dsct.component';
import { ConfirmarRemuDsctComponent } from './pages/gestion-trabajador/modals/confirmar-remu-dsct/confirmar-remu-dsct.component';
import { ConfirmarEliminarComponent } from './pages/control-asistencia/modals/confirmar-eliminar/confirmar-eliminar.component';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { ConfirmarDerechoHabienteComponent } from './pages/derecho-habientes/modals/confirmar-derecho-habiente/confirmar-derecho-habiente.component';
import { GestionHuellaDigitalComponent } from './pages/gestion-trabajador/modals/gestion-huella-digital/gestion-huella-digital.component';
import { HuelleroService } from './services/huellero/huellero.service';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { SolicitudService } from './services/solicitud/solicitud.service';
import { CargaMasivaAsistenciaComponent } from './pages/control-asistencia/modals/carga-masiva-asistencia/carga-masiva-asistencia.component';
import { ConfirmarEliminarSolicitudComponent } from './pages/solicitud/modals/confirmar-eliminar-solicitud/confirmar-eliminar-solicitud.component';
import { VisualizarSolicitudEmpresaComponent } from './pages/solicitud/modals/visualizar-solicitud-empresa/visualizar-solicitud-empresa.component';
//import { ReclutamientoComponent } from './pages/reclutamiento/reclutamiento.component';
//import { PostulanteService } from './services/postulante/postulante.service'
//import { IuReclutamientoComponent } from './pages/reclutamiento/modals/iu-reclutamiento/iu-reclutamiento.component';
//import { ConfirmarpostulanteComponent } from './pages/reclutamiento/modals/confirmarpostulante/confirmarpostulante.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfoGestionTrabajadorComponent } from './pages/gestion-trabajador/modals/info-gestion-trabajador/info-gestion-trabajador.component';
import { MaterialModule } from '../../material.module';
//import { ReclutamientoService } from './services/reclutamiento/reclutamiento.service';
//import { VisualizarReclutamientoPostulanteComponent } from './pages/reclutamiento/modals/visualizar-reclutamiento-postulante/visualizar-reclutamiento-postulante.component';
//import { ConfirmarCvPostulanteComponent } from './pages/reclutamiento/modals/visualizar-reclutamiento-postulante/confirmar-cv-postulante/confirmar-cv-postulante/confirmar-cv-postulante.component';
import { NuevoEquipoComponent } from './pages/solicitud/modals/nuevo-equipo/nuevo-equipo.component';
import { EquipoService } from './services/equipo/equipo.service';
import { VisualizarEquipoTrabajadorComponent } from './pages/solicitud/modals/visualizar-equipo-trabajador/visualizar-equipo-trabajador.component';
import { NuevoTrabajadorEquipoComponent } from './pages/solicitud/modals/nuevo-trabajador-equipo/nuevo-trabajador-equipo.component';
import { ConfirmarNuevoTrabEquipComponent } from './pages/solicitud/modals/nuevo-trabajador-equipo/confirmar-nuevo-trab-equip/confirmar-nuevo-trab-equip.component';
import { ConfirmarEquipoComponent } from './pages/solicitud/modals/nuevo-equipo/confirmar-equipo/confirmar-equipo.component';
import { NuevaSolicitudEmpresaComponent } from './pages/solicitud/modals/nueva-solicitud-empresa/nueva-solicitud-empresa.component';
import { ConfirmarNuevaSolicitudComponent } from './pages/solicitud/modals/confirmar-nueva-solicitud/confirmar-nueva-solicitud.component';

@NgModule({
  imports: [
    CommonModule,
    TRABAJADOR_ROUTES,
    SharedModule,
    // Ng2TableModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    // HttpModule,
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
    NgxPaginationModule,
    MaterialModule
  ],
  declarations: [
    GestionTrabajadorComponent,
    NuevoGestionTrabajadorComponent,
    NuevoGestionTrabajadorConfirmarComponent,
    TipoComprobanteComponent,
    ReporteContratoComponent,
    ControlAsistenciaComponent,
    MostrarAsistenciasComponent,
    MostrarFaltasComponent,
    MostrarPermisoComponent,
    NuevaAsistenciaComponent,
    NuevaFaltaComponent,
    NuevoPermisoComponent,
    DerechoHabientesComponent,
    DerechoHabientesRelacionadosComponent,
    NuevoDerechoHabienteComponent,
    GestionRemuDsctComponent,
    NuevoRemuDsctComponent,
    ConfirmarRemuDsctComponent,
    ConfirmarEliminarComponent,
    ConfirmarDerechoHabienteComponent,
    GestionHuellaDigitalComponent,
    InfoGestionTrabajadorComponent,
    SolicitudComponent,
    CargaMasivaAsistenciaComponent,
    ConfirmarEliminarSolicitudComponent,
    VisualizarSolicitudEmpresaComponent,
    /* ReclutamientoComponent,
    IuReclutamientoComponent,
    ConfirmarpostulanteComponent,
    VisualizarReclutamientoPostulanteComponent,
    ConfirmarCvPostulanteComponent, */
    NuevoEquipoComponent,
    ConfirmarEquipoComponent,
    VisualizarEquipoTrabajadorComponent,
    NuevoTrabajadorEquipoComponent,
    ConfirmarNuevoTrabEquipComponent,
    NuevaSolicitudEmpresaComponent,
    ConfirmarNuevaSolicitudComponent
  ],
  entryComponents: [
    NuevoGestionTrabajadorComponent,
    MostrarAsistenciasComponent,
    MostrarFaltasComponent,
    MostrarPermisoComponent,
    NuevoGestionTrabajadorConfirmarComponent,
    TipoComprobanteComponent,
    ReporteContratoComponent,
    NuevaAsistenciaComponent,
    NuevaFaltaComponent,
    NuevoPermisoComponent,
    DerechoHabientesRelacionadosComponent,
    NuevoDerechoHabienteComponent,
    GestionRemuDsctComponent,
    NuevoRemuDsctComponent,
    ConfirmarRemuDsctComponent,
    ConfirmarEliminarComponent,
    ConfirmarDerechoHabienteComponent,
    GestionHuellaDigitalComponent,
    CargaMasivaAsistenciaComponent,
    ConfirmarEliminarSolicitudComponent,
    VisualizarSolicitudEmpresaComponent,
    /* ReclutamientoComponent,
    IuReclutamientoComponent,
    ConfirmarpostulanteComponent,
    VisualizarReclutamientoPostulanteComponent,
    ConfirmarCvPostulanteComponent, */
    NuevoEquipoComponent,
    ConfirmarEquipoComponent,
    VisualizarEquipoTrabajadorComponent,
    NuevoTrabajadorEquipoComponent,
    ConfirmarNuevoTrabEquipComponent,
    NuevaSolicitudEmpresaComponent,
    ConfirmarNuevaSolicitudComponent
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,

      },
      DatePipe,
      UsuarioService,
      TrabajadorService,
      AsistenciaService,
      FaltaService,
      PermisoService,
      TiposPermisoService,
      HorarioService,
      HuelleroService,
      SolicitudService,
      //PostulanteService,
      //ReclutamientoService,
      EquipoService
    ],
})
export class TrabajadorModule { }
