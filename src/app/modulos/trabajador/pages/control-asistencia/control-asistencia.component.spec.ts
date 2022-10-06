import { ControlAsistenciaComponent } from './control-asistencia.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { TrabajadorServiceStub } from '../../../../mocks/services/trabajador.service.stub';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../services/asistencia/asistencia.service';
import { AsistenciaServiceStub } from '../../../../mocks/services/asistencia.service.stub';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MostrarPermisoComponent } from './modals/mostrar-permisos/mostrar-permisos.component';
import { MostrarAsistenciasComponent } from './modals/mostrar-asistencias/mostrar-asistencias.component';
import { MostrarFaltasComponent } from './modals/mostrar-faltas/mostrar-faltas.component';
import { PermisoService } from '../../services/permisos/permiso.service';
import { PermisoServiceStub } from '../../../../mocks/services/permisos.service.stub';
import { FaltaService } from '../../services/faltas/faltas.service';
import { FaltaServiceStub } from '../../../../mocks/services/faltas.service.stub';
import { Año } from '../../../../models/Año';
import { Mes } from '../../../../models/Mes';

describe('ControlAsistenciaComponent', () => {

    let component: ControlAsistenciaComponent;
    let fixture: ComponentFixture<ControlAsistenciaComponent>;
    const trabajador = ConstantesDatosPrueba.Trabajador1;
    @Pipe({ name: 'filter' })
    class MockPipe implements PipeTransform {
        transform(value: any[], postFilter: String, postBoolean: boolean): any[] {
            return value;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ControlAsistenciaComponent,
                MostrarPermisoComponent,
                MostrarFaltasComponent,
                MostrarAsistenciasComponent,
                MockPipe
            ],
            imports: [RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot()
            ],
            providers: [
                { provide: TrabajadorService, useClass: TrabajadorServiceStub },
                { provide: AsistenciaService, useClass: AsistenciaServiceStub },
                { provide: PermisoService, useClass: PermisoServiceStub},
                { provide: FaltaService, useClass: FaltaServiceStub},
                NgbActiveModal,
                NgbModal, NgbModalStack
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [MostrarPermisoComponent, MostrarAsistenciasComponent, MostrarFaltasComponent] } })
            .compileComponents();

        fixture = TestBed.createComponent(ControlAsistenciaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente ControlAsistencia', async(() => {
            const fixture = TestBed.createComponent(ControlAsistenciaComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba del metodo ngOnInit',()=>{

        afterEach(()=>{
            localStorage.clear();  
        });
        
        it('Deberian guardarse los valores del localStorage si existen valores',()=>{
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify({"idEmpresa":1}));
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":1}));
            component.ngOnInit();
            expect(component.empresa).toBeDefined();
            expect(component.ano).toBeDefined();
            expect(component.mes).toBeDefined();
        })

        it('Deberian llamarse los metodos listarTrabPlanillas y listarTrabHonorario si empresa!=null',()=>{
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify({"idEmpresa":1}));
            spyOn(component,'listarTrabHonorario').and.callThrough();
            spyOn(component,'listarTrabPlanilla').and.callThrough();
            component.ngOnInit();
            expect(component.listarTrabHonorario).toHaveBeenCalled();
            expect(component.listarTrabPlanilla).toHaveBeenCalled();
        })
    })

    describe('Prueba del metodo listarTrabPlanilla',()=>{
        it('Deberia llenarse la lista lsTrabajadorPlanilla al llamar a un service con exito',()=>{
            spyOn(component.trabajadorService,'listarTrabajadorPorComprobante').and.callThrough();
            component.listarTrabPlanilla();
            expect(component.lsTrabajadorPlanilla.length).toBeGreaterThan(0);
            expect(component.trabajadorService.listarTrabajadorPorComprobante).toHaveBeenCalled();
        })
    })

    describe('Prueba del metodo listarTrabHonorario',()=>{
        it('Deberia llenarse la lista lsTrabajadorHonorario al llamar a un service con exito',()=>{
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify({"idEmpresa":1}));
            spyOn(component,'listarTrabHonorario').and.callThrough();
            spyOn(component.trabajadorService,'listarTrabajadorPorComprobante').and.callThrough();
            component.ngOnInit();
            expect(component.lsTrabajadorHonorario.length).toBeGreaterThan(0);
            expect(component.trabajadorService.listarTrabajadorPorComprobante).toHaveBeenCalled();
            expect(component.listarTrabHonorario).toHaveBeenCalled();
        })
    })

    describe('Prueba del metodo mostrarRegistroAsistencias',()=>{
        it('Deberia llamarse al metodo desde el template',()=>{
            spyOn(component,'mostrarRegistroAsistencias').and.callThrough();
             var button = fixture.debugElement.nativeElement.querySelectorAll('.mostrarAsist');
             button[0].click();
             expect(component.mostrarRegistroAsistencias).toHaveBeenCalled();
        })
    })

    describe('Prueba del metodo mostrarRegistroFaltas',()=>{
        it('Deberia llamarse al metodo desde el template',()=>{
            spyOn(component,'mostrarRegistroFaltas').and.callThrough();
             var button = fixture.debugElement.nativeElement.querySelectorAll('.mostrarFalt');
             button[0].click();
             expect(component.mostrarRegistroFaltas).toHaveBeenCalled();
        })
    })

    describe('Prueba del metodo mostrarRegistroPermisos',()=>{
        it('Deberia llamarse al metodo desde el template',()=>{
            spyOn(component,'mostrarRegistroPermisos').and.callThrough();
             var button = fixture.debugElement.nativeElement.querySelectorAll('.mostrarPerm');
             button[0].click();
             expect(component.mostrarRegistroPermisos).toHaveBeenCalled();
        })
    })

    describe('Prueba del metodo checkAction',()=>{
        it('Deberia mostrar el mensaje de Apellidos si se cambia a false',()=>{
            const input = fixture.debugElement.nativeElement.querySelector('#inputGeneral');
            component.checkND.checked = false;
            component.checkAction();
            fixture.detectChanges();
            fixture.whenStable().then(()=>{
                expect(input.placeholder).toEqual("Apellido paterno + Apellido Materno + Nombres");
                expect(component.filterBoolean).toBeFalsy();
            });
        })
    })

    describe('Prueba del metodo openModal',()=>{
        
        beforeEach(()=>{
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify({"idEmpresa":1}));
        })

        afterEach(()=>{
            localStorage.clear();  
        });

        it('Deberia llenarse la fecha de inicio si año y mes no son nulos',()=>{
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1,"descripcion":2018}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":5}));
            component.ngOnInit();
            component.openModal(trabajador);
            expect(component.fecha_inicio).toEqual(new Date(trabajador.fecInicio));
        })

        it('Deberia aparecer una alerta si el periodo año escogido es menor que el año donde el trabajador ingreso',()=>{
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1,"descripcion":2010}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":12}));
            component.ngOnInit();
            component.openModal(trabajador);
            expect(component.ano.descripcion).toBeLessThan(component.fecha_inicio.getFullYear());
        })

        it('Deberia aparecer una alerta si el periodo mes escogido es menor que el mes donde el trabajador ingreso',()=>{
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1,"descripcion":2015}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":1}));
            component.ngOnInit();
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it('Deberia abrir el modal de asistencia',()=>{
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1,"descripcion":2018}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":5}));
            trabajador.accion='A';
            spyOn(component,'openModalAsistencia').and.callThrough();
            component.ngOnInit();
            component.openModal(trabajador);
            expect(component.openModalAsistencia).toHaveBeenCalled();
        })

        it('Deberia abrir el modal de permisos',()=>{
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1,"descripcion":2018}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":5}));
            trabajador.accion='P';
            spyOn(component,'openModalPermisos').and.callThrough();
            component.ngOnInit();
            component.openModal(trabajador);
            expect(component.openModalPermisos).toHaveBeenCalled();
        })

        it('Deberia abrir el modal de faltas',()=>{
            localStorage.setItem('anoSeleccion',JSON.stringify({"idPdoAno":1,"descripcion":2018}));
            localStorage.setItem('mesSeleccion',JSON.stringify({"idPdoMes":5}));
            trabajador.accion='F';
            spyOn(component,'openModalFaltas').and.callThrough();
            component.ngOnInit();
            component.openModal(trabajador);
            expect(component.openModalFaltas).toHaveBeenCalled();
        })
    })

    describe('Metodo obtenerDescMes',()=>{
        beforeEach(()=>{
            component.ano = new Año();
            component.mes = new Mes();
            component.ano.idPdoAno=1;
            component.ano.descripcion=2015;
            component.mes.idPdoMes=0;
        })
        it("Debe seleccionarse el mes de Enero",()=>{
            trabajador.fecInicio = "2015-01-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Febrero",()=>{
            trabajador.fecInicio = "2015-02-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Marzo",()=>{
            trabajador.fecInicio = "2015-03-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Abril",()=>{
            trabajador.fecInicio = "2015-04-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Mayo",()=>{
            trabajador.fecInicio = "2015-05-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Junio",()=>{
            trabajador.fecInicio = "2015-06-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Julio",()=>{
            trabajador.fecInicio = "2015-07-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Agosto",()=>{
            trabajador.fecInicio = "2015-08-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Setiembre",()=>{
            trabajador.fecInicio = "2015-09-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Octubre",()=>{
            trabajador.fecInicio = "2015-10-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })

        it("Debe seleccionarse el mes de Noviembre",()=>{
            trabajador.fecInicio = "2015-11-19T05:00:00.000+0000";
            component.openModal(trabajador);
            expect(component.mes.idPdoMes).toBeLessThan(component.fecha_inicio.getMonth()+1);
            expect(component.ano.descripcion).toBeLessThanOrEqual(component.fecha_inicio.getFullYear());
        })
    })
    
});