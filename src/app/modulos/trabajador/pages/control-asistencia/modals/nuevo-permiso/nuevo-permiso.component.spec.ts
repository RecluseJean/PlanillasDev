import { NuevoPermisoComponent } from './nuevo-permiso.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import { PermisoServiceStub } from '../../../../../../mocks/services/permisos.service.stub';
import { TiposPermisoService } from '../../../../../configuracion/services/permisos/permisos.service';
import { TipoPermisoServiceStub } from '../../../../../../mocks/services/tipo-permisos.service.stub';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable } from 'rxjs/Observable';


describe('NuevoPermisoComponent', () => {

    let component: NuevoPermisoComponent;
    let fixture: ComponentFixture<NuevoPermisoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NuevoPermisoComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot(),
                DatePickerModule,
                NgSelectModule
            ],
            providers: [
                { provide: PermisoService, useClass: PermisoServiceStub },
                { provide: TiposPermisoService, useClass: TipoPermisoServiceStub },
                NgbActiveModal
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).compileComponents();

        fixture = TestBed.createComponent(NuevoPermisoComponent);
        component = fixture.componentInstance;
        component.input_trabajador = ConstantesDatosPrueba.TrabajadorSinContrato;

        localStorage.setItem('anoSeleccion', JSON.stringify(ConstantesDatosPrueba.añoPrueba1));
        localStorage.setItem('mesSeleccion', JSON.stringify(ConstantesDatosPrueba.MesPrueba1));
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente NuevoPermiso', async(() => {
            const fixture = TestBed.createComponent(NuevoPermisoComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba del metodo ngOnInit', () => {
        it('Deberia guardarse la fecha actual si input_permiso es nulo', () => {
            component.ngOnInit();
            expect(component.permiso.fechaIni).toBeDefined();
        })

        it('Deberia iniciar todo el obj permiso si input_permiso no es nulo', () => {
            component.input_permiso = ConstantesDatosPrueba.permiso;
            component.ngOnInit();
            expect(component.permiso.idPermiso).toEqual(ConstantesDatosPrueba.permiso.idPermiso);
        })
    })

    describe('Prueba metodo close', () => {
        it('Deberia llamarse el metodo close desde el template', () => {
            spyOn(component, 'close').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            button.click();
            expect(component.close).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo crud', () => {
        it('Deberia llamarse el metodo crud desde el template', () => {
            spyOn(component, 'crud').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#confirmar');
            button.click();
            expect(component.crud).toHaveBeenCalled();
        })

        it('Deberia llamarse a metodo actualizar si input_permiso no es nulo', () => {
            component.input_permiso = ConstantesDatosPrueba.permiso;
            spyOn(component, 'actualizarPermiso').and.callThrough();
            component.crud();
            expect(component.actualizarPermiso).toHaveBeenCalled();
        })


        it('Deberia llamarse a metodo buscarFechasiExiste si input_permiso es nulo y accion=R', () => {
            component.input_permiso = null;
            component.input_trabajador.accion = 'R';
            spyOn(component, 'buscarFechaSiExiste').and.callThrough();
            component.crud();
            expect(component.buscarFechaSiExiste).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo BuscarfechaSiExiste', () => {
        it('Deberia mostrar un mensaje de alerta si ya hay una fecha para ese permiso registrada', () => {
            spyOn(component.permisoService, 'buscarFecha').and.callThrough();
            spyOn(component, 'asignarObjetos').and.returnValue(true);
            component.buscarFechaSiExiste();
            expect(component.permisoService.buscarFecha).toHaveBeenCalledWith(true);
        })
        it('Deberia llamar al metodo registrarPermiso si no hay permisos registrados en la fecha',()=>{
            spyOn(component.permisoService, 'buscarFecha').and.callThrough();
            spyOn(component, 'asignarObjetos').and.returnValue(false);
            spyOn(component,'registrarPermiso').and.callThrough();
            component.buscarFechaSiExiste();
            expect(component.permisoService.buscarFecha).toHaveBeenCalledWith(false);
            expect(component.registrarPermiso).toHaveBeenCalled();

        })
    })

    describe('Prueba metodo listar Tipos de permiso', () => {
        it('Deberia llenarse el arreglo lsTipoPermiso', () => {
            spyOn(component.tipoPermisoService, 'listarPermisosPorEmpresa').and.callThrough();
            component.listarTiposPermiso();
            expect(component.lsTipoPermiso.length).toBeGreaterThan(0);

        })
    })

    describe('Prueba metodo actualizarPermiso', () => {
        it('Se llama al metodo refrescar si da un resultado correcto', () => {
            spyOn(component.permisoService, 'actualizarPermiso').and.callThrough();
            spyOn(component,'asignarObjetos').and.returnValue(1);
            spyOn(component, 'refrescar').and.callThrough();
            component.actualizarPermiso();
            fixture.whenStable().then(() => {
                expect(component.permisoService.actualizarPermiso).toHaveBeenCalled();
                expect(component.refrescar).toHaveBeenCalled();
            })
        })

        it('Deberia aparecer una alerta si el estado de la respuesta no es 1',()=>{
            spyOn(component.permisoService, 'actualizarPermiso').and.callThrough();
            spyOn(component,'asignarObjetos').and.returnValue(2);
            spyOn(component.activemodal, 'dismiss').and.callThrough();
            component.actualizarPermiso();
            fixture.whenStable().then(() => {
                expect(component.permisoService.actualizarPermiso).toHaveBeenCalled();
                expect(component.activemodal.dismiss).toHaveBeenCalled();
            })
        })
    })

    describe('Prueba metodo registrarPermiso', () => {
        it('Se llama al metodo close si da un resultado correcto', () => {
            spyOn(component.permisoService, 'registrarPermiso').and.callThrough();
            spyOn(component.activemodal, 'close').and.callThrough();
            component.registrarPermiso({});
            fixture.whenStable().then(() => {
                expect(component.permisoService.registrarPermiso).toHaveBeenCalled();
                expect(component.activemodal.close).toHaveBeenCalled();
            })
        })

        it('Se muestra una alerta si da error en el subscribe', () => {
            spyOn(component.permisoService,'registrarPermiso').and.returnValue(Observable.throw('Error'))
            spyOn(component.activemodal,'dismiss').and.callThrough();
            component.registrarPermiso({});
            expect(component.activemodal.dismiss).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo llenarDropdown',()=>{
        it("deberia setearse el tipo de permiso de la lista de tipos",()=>{
            component.lsTipoPermiso = ConstantesDatosPrueba.ResponseWrapperListaTipoPermisos.aaData;
            component.idTipoPermiso = 1;
            component.llenarDropdown();
            expect(component.tipoPermiso).toEqual(component.lsTipoPermiso[0]);
        })
    })

});