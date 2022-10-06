import { MostrarAsistenciasComponent } from './mostrar-asistencias.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { NuevaAsistenciaComponent } from '../nueva-asistencia/nueva-asistencia.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { AsistenciaServiceStub } from '../../../../../../mocks/services/asistencia.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { PermisoService } from '../../../../services/permisos/permiso.service';


describe('MostrarAsistenciaComponent', () => {

    let component: MostrarAsistenciasComponent;
    let fixture: ComponentFixture<MostrarAsistenciasComponent>;
    const trabajador = ConstantesDatosPrueba.Trabajador1;
    const año = ConstantesDatosPrueba.añoPrueba1;
    const mes = ConstantesDatosPrueba.MesPrueba1;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MostrarAsistenciasComponent,
                NuevaAsistenciaComponent,
                ConfirmarEliminarComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot(),

            ],
            providers: [
                { provide: AsistenciaService, useClass: AsistenciaServiceStub },
                FaltaService,
                PermisoService,
                NgbActiveModal,
                NgbModal,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NuevaAsistenciaComponent, ConfirmarEliminarComponent] } })
            .compileComponents();

        fixture = TestBed.createComponent(MostrarAsistenciasComponent);
        component = fixture.componentInstance;
        component.input_trabajador = trabajador;
        component.input_ano = año;
        component.input_mes = mes;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente MostrarAsistencia', async(() => {
            const fixture = TestBed.createComponent(MostrarAsistenciasComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba metodo ngOnInit', () => {
        it('Deberian setearse las variales ano mes y objTrabajador', () => {
            component.ngOnInit();
            expect(component.ano).toBeDefined();
            expect(component.objTrabajadorContrato).toBeDefined();
            expect(component.mes).toBeDefined();
        })

        it('Deberia llamarse al metodo  listarAsistencias cuando se inicia', () => {
            spyOn(component, 'listarAsistencias').and.callThrough();
            component.ngOnInit();
            expect(component.listarAsistencias).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo listarAsistencias', () => {
        it('Deberia llenarse el arreglo si el estado es 1', () => {
            spyOn(component.asistenciaService, 'listarAsistenciasPorTrabajador').and.callThrough();
            component.objTrabajadorContrato.trabajador = 1;
            component.listarAsistencias();
            expect(component.lsTrabAsistencias.length).toBeGreaterThan(0);
        })
    })

    describe('Prueba nueva asistencia', () => {
        it('Deberia llamar al metodo desde el template', () => {
            spyOn(component, 'nuevaAsistencia').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#nuevo');
            button.click();
            expect(component.nuevaAsistencia).toHaveBeenCalled();
        })

        it('Deberia llamar al metodo openModal', () => {
            spyOn(component, 'openModal').and.callThrough();
            component.objTrabajadorContrato = trabajador;
            var tmp = Object.assign({}, component.objTrabajadorContrato.trabajador);
            tmp.accion = 'R'
            component.nuevaAsistencia();
            expect(component.openModal).toHaveBeenCalledWith(tmp, null);
        })
    })

    describe('Prueba metodo close', () => {
        it('Deberia llamarse al metodo desde el template', () => {
            spyOn(component, 'close').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            button.click();
            expect(component.close).toHaveBeenCalled();
        })

        it('Deberia llamarse los metodos dismiss y refrescar', () => {
            spyOn(component, 'refrescar').and.callThrough();
            spyOn(component.activemodal, 'dismiss').and.callThrough();
            component.close();
            expect(component.refrescar).toHaveBeenCalled();
            expect(component.activemodal.dismiss).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo actualizarAsistencia', () => {

        it('Deberia llamarse el metodo desde el template', () => {
            spyOn(component, 'actualizarAsistencia').and.callThrough();
            const i = fixture.debugElement.nativeElement.querySelector('#actAsist');
            i.click();
            expect(component.actualizarAsistencia).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo openModal', () => {
            spyOn(component, 'openModal').and.callThrough()
            component.objTrabajadorContrato = trabajador;
            component.actualizarAsistencia(ConstantesDatosPrueba.asistencia);
            expect(component.openModal).toHaveBeenCalledWith(trabajador.trabajador, ConstantesDatosPrueba.asistencia);
        })
    })

    describe('Prueba metodo OpenModal', () => {

        it('Deberia abrirse el modal', () => {
            spyOn(component.modalService, 'open').and.callThrough();
            component.openModal(trabajador, null);
            expect(component.modalRef).toBeDefined();
        })

        it('Deberia cerrarse el modal con close cuando se obtenga un result', () => {
            spyOn(component.activemodal, 'close').and.callThrough();
            component.openModal(trabajador, null);
            component.modalRef.close();
            fixture.whenStable().then(() => {
                expect(component.activemodal.close).toHaveBeenCalled();
            })
        })
    })

    describe('Prueba metodo EliminarAsistencia', () => {

        it('Deberia llamarse el metodo desde el template', () => {
            spyOn(component, 'eliminarAsistencia').and.callThrough();
            const i = fixture.debugElement.nativeElement.querySelector('#elmAsist');
            i.click();
            expect(component.eliminarAsistencia).toHaveBeenCalled();
        })

        it('Deberia abrirse el modal', () => {
            spyOn(component.modalService, 'open').and.callThrough();
            component.eliminarAsistencia(ConstantesDatosPrueba.asistencia);
            expect(component.modalRef).toBeDefined();
        })

        it('Deberia cerrarse el modal con close cuando se obtenga un result', () => {
            spyOn(component.activemodal, 'close').and.callThrough();
            component.eliminarAsistencia(ConstantesDatosPrueba.asistencia);
            component.modalRef.close();
            fixture.whenStable().then(() => {
                expect(component.activemodal.close).toHaveBeenCalled();
            })
        })
    })
})