import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesPlanillaComponent } from './perfiles-planilla.component';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { ConfirmarPerfilesPlanillaComponent } from '../confirmar-perfiles-planilla/confirmar-perfiles-planilla.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import { TipoPlanillaServiceStub } from '../../../../../../mocks/services/tipoPlanilla.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';

describe('PerfilesPlanillaComponent', () => {
  let component: PerfilesPlanillaComponent;
  let fixture: ComponentFixture<PerfilesPlanillaComponent>;

  const mockTipoPlanilla: TipoPlanilla = ConstantesDatosPrueba.TipoPlanilla;
  const lsTipoPlanillaPerfiles = ConstantesDatosPrueba.lsTipoPlanillaPerfiles;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmarPerfilesPlanillaComponent,
        PerfilesPlanillaComponent
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

    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          ConfirmarPerfilesPlanillaComponent
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilesPlanillaComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }))

  describe('Creacion del component', () => {
    it('Deberia crearse el componente PerfilesPlanillaComponent', async(() => {
      const fixture = TestBed.createComponent(PerfilesPlanillaComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  });

  describe('Metodo ngOnInit', () => {
    it('Deberia llamarse al metodo listarPerfilesPorTipoPlanilla si el input no es nulo', () => {
      spyOn(component, 'listarPerfilesPorTipoPlanilla');
      component.input_tipPlan = mockTipoPlanilla;
      component.ngOnInit();
      expect(component.listarPerfilesPorTipoPlanilla).toHaveBeenCalledWith();
      expect(component.tipoPlanilla).toEqual(mockTipoPlanilla);
    })
  })

  describe('Metodo ListarPerfilesPorTipoPlanilla', () => {
    it('Deberia llenarse el arreglo si la respuesta es correcta', () => {
      spyOn(component.tipoPlanillaService, 'listarPerfilesPorTipoPlanilla').and.callThrough();
      component.tipoPlanilla = mockTipoPlanilla;
      component.listarPerfilesPorTipoPlanilla();
      expect(component.lsTipoPlanillaPerfiles.length > 0).toBeTruthy();

    })
  })

  describe('Metodo close', () => {
    it('Deberia llamarse al metodo close desde el template', () => {
      const button = fixture.debugElement.nativeElement.querySelector('#close');
      spyOn(component, 'close');
      button.click();
      expect(component.close).toHaveBeenCalled();
    })

    it('Deberia cerrarse el modal cuando inicia close', () => {
      spyOn(component.activemodal, 'dismiss').and.callThrough();
      component.close();
      expect(component.activemodal.dismiss).toHaveBeenCalledWith('Cancelado');
    })
  })

  describe('Metodo ver', () => {
    it('Deberia setearse el estado de un perfil en 0 si fue 1', () => {
      component.lsTipoPlanillaPerfiles = lsTipoPlanillaPerfiles;
      component.ver(lsTipoPlanillaPerfiles[0]);
      var nuevols = [{
        "idTipoPlanillaPerfil": 1,
        "estado": 0
      },
      {
        "idTipoPlanillaPerfil": 2,
        "estado": 0
      }
      ];
      expect(component.lsTipoPlanillaPerfiles).toEqual(nuevols);
    })

    it('Deberia setearse el estado de un perfil en 1 si fue 0', () => {
      component.lsTipoPlanillaPerfiles = lsTipoPlanillaPerfiles;
      component.ver(lsTipoPlanillaPerfiles[1]);
      var nuevols = [{
        "idTipoPlanillaPerfil": 1,
        "estado": 0
      },
      {
        "idTipoPlanillaPerfil": 2,
        "estado": 1
      }
      ];
      expect(component.lsTipoPlanillaPerfiles).toEqual(nuevols);
    })
  })

  describe('Metodo confirmar',()=>{
    it('Deberia llamarse al metodo confirmar desde el template',()=>{
      const button = fixture.debugElement.nativeElement.querySelector('#confirmar');
      spyOn(component, 'confirmar');
      button.click();
      expect(component.confirmar).toHaveBeenCalled();
    })

    it('Deberia abrir el modal ConfirmarPerfilesPlanillaComponent',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      component.confirmar();
      expect(component.modalService.open).toHaveBeenCalledWith(ConfirmarPerfilesPlanillaComponent,{
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    })
  })
});
