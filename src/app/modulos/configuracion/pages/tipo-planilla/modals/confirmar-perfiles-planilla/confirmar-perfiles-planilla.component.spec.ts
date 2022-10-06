import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPerfilesPlanillaComponent } from './confirmar-perfiles-planilla.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import { TipoPlanillaServiceStub } from '../../../../../../mocks/services/tipoPlanilla.service.stub';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { Observable } from 'rxjs';

describe('ConfirmarPerfilesPlanillaComponent', () => {
  let component: ConfirmarPerfilesPlanillaComponent;
  let fixture: ComponentFixture<ConfirmarPerfilesPlanillaComponent>;

  const mockTipoPlanilla: TipoPlanilla = ConstantesDatosPrueba.TipoPlanilla;
  const lsTipoPlanillaPerfiles = ConstantesDatosPrueba.lsTipoPlanillaPerfiles;
  var error = {
    "error": 'Error al actualizar perfiles'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmarPerfilesPlanillaComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: TipoPlanillaService, useClass: TipoPlanillaServiceStub },
        NgbActiveModal,
        NgbModal
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarPerfilesPlanillaComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }))

  describe('Creacion del component', () => {
    it('Deberia crearse el componente ConfirmarPerfilesPlanillaComponent', async(() => {
      const fixture = TestBed.createComponent(ConfirmarPerfilesPlanillaComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  });

  describe('Metodo ngOnInit',()=>{
    it('Deberia llenarse la variable lsTipoPlanillaPerfil',()=>{
      component.input_lsTipoPlanillaPerfil = lsTipoPlanillaPerfiles;
      component.ngOnInit();
      expect(component.lsTipoPlanillaPefil).toEqual(lsTipoPlanillaPerfiles);
    })
  })

  describe('Metodo crud',()=>{
    it('Deberia llamarse al metodo desde el template',()=>{
      spyOn(component,'crud');
      const button = fixture.debugElement.nativeElement.querySelector('#crud');
      button.click();
      expect(component.crud).toHaveBeenCalled();
    })

    it('Deberia llamarse al metodo actualizarPerfiles',()=>{
      spyOn(component,'actualizarPerfiles');
      component.crud();
      expect(component.actualizarPerfiles).toHaveBeenCalled();
    })
  })

  describe('Metodo actualizarPerfiles',()=>{
    it('Deberia llamarse al metodo actualizar Perfiles',()=>{
      spyOn(component.tipoPlanillaService,'actualizarPerfiles').and.callThrough();
      component.actualizarPerfiles();
      expect(component.tipoPlanillaService.actualizarPerfiles).toHaveBeenCalled();
    })

    it('Deberia mostrar un mensaje de success si el estado es 1',()=>{
      component.lsTipoPlanillaPefil = lsTipoPlanillaPerfiles;
      component.actualizarPerfiles();
      expect(component.estado).toEqual(1);
    });

    it('Deberia mostrar un mensaje de error si falla el servicio',()=>{
      spyOn(component.tipoPlanillaService,'actualizarPerfiles').and.returnValue(Observable.throw(error));
      component.actualizarPerfiles();
      expect(component.estado).toEqual(0);
    })
  })

  describe('Metodo close',()=>{
    it('Deberia llamarse el metodo close desde el template',()=>{
      spyOn(component,'close');
      const button = fixture.debugElement.nativeElement.querySelector('#close');
      button.click();
      expect(component.close).toHaveBeenCalled();
    });

    it('Deberia cerrarse el modal',()=>{
      spyOn(component.activemodal,'dismiss').and.callThrough();
      component.close();
      expect(component.activemodal.dismiss).toHaveBeenCalledWith('Cancelado');
    })
  })

});
