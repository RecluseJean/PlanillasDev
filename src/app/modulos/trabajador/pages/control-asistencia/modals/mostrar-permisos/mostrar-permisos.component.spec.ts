import { MostrarPermisoComponent } from './mostrar-permisos.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { NuevoPermisoComponent } from '../nuevo-permiso/nuevo-permiso.component';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import { PermisoServiceStub } from '../../../../../../mocks/services/permisos.service.stub';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { TiposPermisoService } from '../../../../../configuracion/services/permisos/permisos.service';
import { TipoPermisoServiceStub } from '../../../../../../mocks/services/tipo-permisos.service.stub';

describe('MostrarPermisoComponent', () => {

    let component: MostrarPermisoComponent;
    let fixture: ComponentFixture<MostrarPermisoComponent>;
    const trabajador = ConstantesDatosPrueba.Trabajador1;
    const año = ConstantesDatosPrueba.añoPrueba1;
    const mes = ConstantesDatosPrueba.MesPrueba1;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MostrarPermisoComponent,
                NuevoPermisoComponent,
                ConfirmarEliminarComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot(),
            ],
            providers: [
                { provide: PermisoService, useClass: PermisoServiceStub },
                { provide: TiposPermisoService, useClass: TipoPermisoServiceStub },
                AsistenciaService,
                FaltaService,
                NgbActiveModal,
                NgbModal,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NuevoPermisoComponent, ConfirmarEliminarComponent] } })
            .compileComponents();

        fixture = TestBed.createComponent(MostrarPermisoComponent);
        component = fixture.componentInstance;
        component.input_trabajador = trabajador;
        component.input_ano = año;
        component.input_mes = mes;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente MostrarPermiso', async(() => {
            const fixture = TestBed.createComponent(MostrarPermisoComponent);
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

        it('Deberia llamarse al metodo  listarPermisos cuando se inicia', () => {
            spyOn(component, 'listarPermisos').and.callThrough();
            component.ngOnInit();
            expect(component.listarPermisos).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo listarPermisos', () => {
        it('Deberia llenarse el arreglo si el estado es 1', () => {
            spyOn(component.permisoService, 'listarPermisosPorTrabajador').and.callThrough();
            component.objTrabajadorContrato.trabajador = 1;
            component.listarPermisos();
            expect(component.lsTrabPermisos.length).toBeGreaterThan(0);
        })
    })

    describe('Prueba nueva asistencia', () => {
        it('Deberia llamar al metodo desde el template', () => {
            spyOn(component, 'nuevoPermiso').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#nuevo');
            button.click();
            expect(component.nuevoPermiso).toHaveBeenCalled();
        })

        it('Deberia llamar al metodo openModal', () => {
            spyOn(component, 'openModal').and.callThrough();
            component.objTrabajadorContrato = trabajador;
            var tmp = Object.assign({}, component.objTrabajadorContrato.trabajador);
            tmp.accion = 'R'
            component.nuevoPermiso();
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

    describe('Prueba metodo actualizarPermiso', () => {

        it('Deberia llamarse el metodo desde el template', () => {
            spyOn(component, 'actualizarPermiso').and.callThrough();
            const i = fixture.debugElement.nativeElement.querySelector('#actPermiso');
            i.click();
            expect(component.actualizarPermiso).toHaveBeenCalled();
        })

        it('Deberia llamarse al metodo openModal', () => {
            spyOn(component, 'openModal').and.callThrough()
            component.objTrabajadorContrato = trabajador;
            component.actualizarPermiso(ConstantesDatosPrueba.permiso);
            expect(component.openModal).toHaveBeenCalledWith(trabajador, ConstantesDatosPrueba.permiso);
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

    describe('Prueba metodo eliminarPermiso', () => {

        it('Deberia llamarse el metodo desde el template', () => {
            spyOn(component, 'eliminarPermiso').and.callThrough();
            const i = fixture.debugElement.nativeElement.querySelector('#elmPermiso');
            i.click();
            expect(component.eliminarPermiso).toHaveBeenCalled();
        })

        it('Deberia abrirse el modal', () => {
            spyOn(component.modalService, 'open').and.callThrough();
            component.eliminarPermiso(ConstantesDatosPrueba.asistencia);
            expect(component.modalRef).toBeDefined();
        })

        it('Deberia cerrarse el modal con close cuando se obtenga un result', () => {
            spyOn(component.activemodal, 'close').and.callThrough();
            component.eliminarPermiso(ConstantesDatosPrueba.asistencia);
            component.modalRef.close();
            fixture.whenStable().then(() => {
                expect(component.activemodal.close).toHaveBeenCalled();
            })
        })
    })
})