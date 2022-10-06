import { MostrarFaltasComponent } from './mostrar-faltas.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { NuevaFaltaComponent } from '../nueva-falta/nueva-falta.component';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { FaltaServiceStub } from '../../../../../../mocks/services/faltas.service.stub';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';

describe('MostrarFaltaComponent', () => {

    let component: MostrarFaltasComponent;
    let fixture: ComponentFixture<MostrarFaltasComponent>;
    const trabajador = ConstantesDatosPrueba.Trabajador1;
    const año = ConstantesDatosPrueba.añoPrueba1;
    const mes = ConstantesDatosPrueba.MesPrueba1;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MostrarFaltasComponent,
                NuevaFaltaComponent,
                ConfirmarEliminarComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot(),

            ],
            providers: [
                { provide: FaltaService, useClass: FaltaServiceStub },
                AsistenciaService,
                PermisoService,
                NgbActiveModal,
                NgbModal,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NuevaFaltaComponent, ConfirmarEliminarComponent] } })
            .compileComponents();

        fixture = TestBed.createComponent(MostrarFaltasComponent);
        component = fixture.componentInstance;
        component.input_trabajador = trabajador;
        component.input_ano = año;
        component.input_mes = mes;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente MostrarFalta', async(() => {
            const fixture = TestBed.createComponent(MostrarFaltasComponent);
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

        it('Deberia llamarse al metodo  listarFaltas cuando se inicia', () => {
            spyOn(component, 'listarFaltas').and.callThrough();
            component.ngOnInit();
            expect(component.listarFaltas).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo listarFaltas', () => {
        it('Deberia llenarse el arreglo si el estado es 1', () => {
            spyOn(component.faltaService, 'listarFaltasPorTrabajador').and.callThrough();
            component.objTrabajadorContrato.trabajador = 1;
            component.listarFaltas();
            expect(component.lsTrabFaltas.length).toBeGreaterThan(0);
        })
    })

    describe('Prueba nueva asistencia', () => {
        it('Deberia llamar al metodo desde el template', () => {
            spyOn(component, 'nuevaFalta').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#nuevo');
            button.click();
            expect(component.nuevaFalta).toHaveBeenCalled();
        })

        it('Deberia llamar al metodo openModal', () => {
            spyOn(component, 'openModal').and.callThrough();
            component.objTrabajadorContrato = trabajador;
            var tmp = Object.assign({}, component.objTrabajadorContrato.trabajador);
            tmp.accion = 'R'
            component.nuevaFalta();
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

    describe('Prueba metodo actualizarFalta', () => {

        it('Deberia llamarse el metodo desde el template', () => {
            spyOn(component, 'actualizarFalta').and.callThrough();
            const i = fixture.debugElement.nativeElement.querySelector('#actFalta');
            i.click();
            expect(component.actualizarFalta).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo openModal', () => {
            spyOn(component, 'openModal').and.callThrough()
            component.objTrabajadorContrato = trabajador;
            component.actualizarFalta(ConstantesDatosPrueba.falta);
            expect(component.openModal).toHaveBeenCalledWith(null, ConstantesDatosPrueba.falta);
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

    describe('Prueba metodo eliminarFalta', () => {

        it('Deberia llamarse el metodo desde el template', () => {
            spyOn(component, 'eliminarFalta').and.callThrough();
            const i = fixture.debugElement.nativeElement.querySelector('#elmFalta');
            i.click();
            expect(component.eliminarFalta).toHaveBeenCalled();
        })

        it('Deberia abrirse el modal', () => {
            spyOn(component.modalService, 'open').and.callThrough();
            component.eliminarFalta(ConstantesDatosPrueba.asistencia);
            expect(component.modalRef).toBeDefined();
        })

        it('Deberia cerrarse el modal con close cuando se obtenga un result', () => {
            spyOn(component.activemodal, 'close').and.callThrough();
            component.eliminarFalta(ConstantesDatosPrueba.asistencia);
            component.modalRef.close();
            fixture.whenStable().then(() => {
                expect(component.activemodal.close).toHaveBeenCalled();
            })
        })
    })
})