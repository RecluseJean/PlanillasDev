import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminarComponent } from './confirmar-eliminar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaService } from '../../../../services/asistencia/asistencia.service';
import { AsistenciaServiceStub } from '../../../../../../mocks/services/asistencia.service.stub';
import { PermisoServiceStub } from '../../../../../../mocks/services/permisos.service.stub';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { FaltaServiceStub } from '../../../../../../mocks/services/faltas.service.stub';

describe('ConfirmarEliminarComponent', () => {
  let component: ConfirmarEliminarComponent;
  let fixture: ComponentFixture<ConfirmarEliminarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmarEliminarComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                NgbModule.forRoot(),
            ],
            providers: [
                { provide: PermisoService, useClass: PermisoServiceStub },
                { provide: AsistenciaService, useClass: AsistenciaServiceStub },
                { provide: FaltaService, useClass: FaltaServiceStub},
                NgbActiveModal
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmarEliminarComponent);
        component = fixture.componentInstance;
        component.input_accion = ConstantesDatosPrueba.asistencia;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente ConfirmarEliminar', async(() => {
            const fixture = TestBed.createComponent(ConfirmarEliminarComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba metodo ngOnInit',()=>{
      it('Deberia sobreescribirse la variable objGestion',()=>{
        component.ngOnInit();
        expect(component.objGestion).toEqual(component.input_accion);
      })
    })

    describe('Prueba metodo crud',()=>{
      it('Deberia llamarse al metodo desde el template',()=>{
        spyOn(component,'crud').and.callThrough();
        const button = fixture.debugElement.nativeElement.querySelector('#crud');
        button.click();
        expect(component.crud).toHaveBeenCalled();
      })

      it('Deberia llamarse al metodo eliminarAsistencia si accion es "A"',()=>{
        spyOn(component,'eliminarAsistencia').and.callThrough();
        component.objGestion.accion = 'A';
        component.crud();
        expect(component.eliminarAsistencia).toHaveBeenCalled();
      })

      it('Deberia llamarse al metodo eliminarFalta si accion es "F"',()=>{
        spyOn(component,'eliminarFalta').and.callThrough();
        component.objGestion.accion = 'F';
        component.crud();
        expect(component.eliminarFalta).toHaveBeenCalled();
      })

      it('Deberia llamarse al metodo eliminarPermiso si accion es "P"',()=>{
        spyOn(component,'eliminarPermiso').and.callThrough();
        component.objGestion.accion = 'P';
        component.crud();
        expect(component.eliminarPermiso).toHaveBeenCalled();
      })
    })

    describe('Prueba del metodo close',()=>{
      it('Deberia llamarse el metodo desde el template',()=>{
        spyOn(component,'close').and.callThrough();
        spyOn(component.activemodal,'dismiss').and.callThrough();
        const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
        button.click();
        expect(component.close).toHaveBeenCalled();
        expect(component.activemodal.dismiss).toHaveBeenCalled();
      })
    })

    describe('Prueba del metodo eliminarAsistencia',()=>{
      it('Deberia mostrar una alerta de success si la resp es true',()=>{
        component.objGestion = ConstantesDatosPrueba.asistencia;
        component.objGestion.idAsistencia = true;
        spyOn(component.asistenciaService,'eliminarAsistencia').and.callThrough();
        spyOn(component.activemodal,'close').and.callThrough();
        component.eliminarAsistencia();
        expect(component.asistenciaService.eliminarAsistencia).toHaveBeenCalledWith(true);
        expect(component.activemodal.close).toHaveBeenCalled();
      })

      it('Deberia mostrar una alerta de error si la resp es false',()=>{
        component.objGestion = ConstantesDatosPrueba.asistencia;
        component.objGestion.idAsistencia = false;
        spyOn(component.asistenciaService,'eliminarAsistencia').and.callThrough();
        spyOn(component.activemodal,'dismiss').and.callThrough();
        component.eliminarAsistencia();
        expect(component.asistenciaService.eliminarAsistencia).toHaveBeenCalledWith(false);
        expect(component.activemodal.dismiss).toHaveBeenCalled();
      })
    })

    describe('Prueba del metodo eliminarFalta',()=>{
      it('Deberia mostrar una alerta de success si la resp es true',()=>{
        component.objGestion = ConstantesDatosPrueba.falta;
        component.objGestion.idFalta = true;
        spyOn(component.faltaService,'eliminarFalta').and.callThrough();
        spyOn(component.activemodal,'close').and.callThrough();
        component.eliminarFalta();
        expect(component.faltaService.eliminarFalta).toHaveBeenCalledWith(true);
        expect(component.activemodal.close).toHaveBeenCalled();
      })

      it('Deberia mostrar una alerta de error si la resp es false',()=>{
        component.objGestion = ConstantesDatosPrueba.falta;
        component.objGestion.idFalta = false;
        spyOn(component.faltaService,'eliminarFalta').and.callThrough();
        spyOn(component.activemodal,'dismiss').and.callThrough();
        component.eliminarFalta();
        expect(component.faltaService.eliminarFalta).toHaveBeenCalledWith(false);
        expect(component.activemodal.dismiss).toHaveBeenCalled();
      })
    })

    describe('Prueba del metodo eliminarPermiso',()=>{
      it('Deberia mostrar una alerta de success si la resp es true',()=>{
        component.objGestion = ConstantesDatosPrueba.permiso;
        component.objGestion.idPermiso = true;
        spyOn(component.permisoService,'eliminarPermiso').and.callThrough();
        spyOn(component.activemodal,'close').and.callThrough();
        component.eliminarPermiso();
        expect(component.permisoService.eliminarPermiso).toHaveBeenCalledWith(true);
        expect(component.activemodal.close).toHaveBeenCalled();
      })

      it('Deberia mostrar una alerta de error si la resp es false',()=>{
        component.objGestion = ConstantesDatosPrueba.permiso;
        component.objGestion.idPermiso = false;
        spyOn(component.permisoService,'eliminarPermiso').and.callThrough();
        spyOn(component.activemodal,'dismiss').and.callThrough();
        component.eliminarPermiso();
        expect(component.permisoService.eliminarPermiso).toHaveBeenCalledWith(false);
        expect(component.activemodal.dismiss).toHaveBeenCalled();
      })
    })



});
