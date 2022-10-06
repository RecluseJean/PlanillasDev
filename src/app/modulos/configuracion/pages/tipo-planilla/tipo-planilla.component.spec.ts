import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPlanillaComponent } from './tipo-planilla.component';
import { NuevoTipoPlanillaComponent } from './modals/nuevo-tipo-planilla/nuevo-tipo-planilla.component';
import { ConfirmarNuevoTipoPlanillaComponent } from './modals/confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { PerfilesPlanillaComponent } from './modals/perfiles-planilla/perfiles-planilla.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanillaService } from '../../services/tipo-planilla/tipo-planilla.service';
import { TipoPlanillaServiceStub } from '../../../../mocks/services/tipoPlanilla.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';

describe('TipoPlanillaComponent', () => {
  let component: TipoPlanillaComponent;
  let fixture: ComponentFixture<TipoPlanillaComponent>;
  const mockTipoPlanilla = ConstantesDatosPrueba.TipoPlanilla;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TipoPlanillaComponent,
        NuevoTipoPlanillaComponent,
        ConfirmarNuevoTipoPlanillaComponent,
        PerfilesPlanillaComponent
      ],
      imports: [
        RouterTestingModule,
        NgSelectModule,
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
          ConfirmarNuevoTipoPlanillaComponent,
          NuevoTipoPlanillaComponent,
          PerfilesPlanillaComponent
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPlanillaComponent);
    component = fixture.componentInstance;
    localStorage.setItem('objEmpresaSeleccion',JSON.stringify({'idEmpresa':1}))
    fixture.detectChanges();
  }))

  describe('Creacion del component', () => {
    it('Deberia crearse el componente TipoPlanillaComponent', async(() => {
      const fixture = TestBed.createComponent(TipoPlanillaComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  })

  describe('Metodo listar',()=>{
    it('Deberia llamar a listar si existe una empresa en localStorage',()=>{
      spyOn(component,'listar');
      component.ngOnInit();
      expect(component.listar).toHaveBeenCalled();
    });

    it('Deberia llamarse a listar de TipoPlanillaService y llenarse el arreglo lsTipoPlanilla',()=>{
      spyOn(component.tipoPlanillaService,'listar').and.callThrough();
      component.listar();
      expect(component.tipoPlanillaService.listar).toHaveBeenCalled();
      expect(component.lstipoPlanilla.length>0).toBeTruthy();
    })
  });

  describe('Metodo registrar',()=>{
    it('Deberia llamarse al metodo registrar desde el template',()=>{
      const button = fixture.debugElement.nativeElement.querySelector('#nuevo');
      spyOn(component, 'registrar');
      button.click();
      expect(component.registrar).toHaveBeenCalled();
    });

    it('Deberia llamar al metodo modal',()=>{
      spyOn(component,'openModal');
      component.registrar();
      expect(component.openModal).toHaveBeenCalled();
    })
  })

  describe('Metodo asignarPerfiles',()=>{
    it('Deberia llamarse al metodo asignarPerfiles desde el template',()=>{
      const button = fixture.debugElement.nativeElement.querySelector('#asignar');
      spyOn(component, 'asignarPerfiles');
      button.click();
      expect(component.asignarPerfiles).toHaveBeenCalled();
    });

    it('Deberia llamar al metodo modal',()=>{
      spyOn(component,'openModal');
      let tmp:any = Object.assign({},mockTipoPlanilla);
      tmp.accion ="P";
      component.asignarPerfiles(mockTipoPlanilla);
      expect(component.openModal).toHaveBeenCalledWith(tmp);
    })
  })

  describe('Metodo modificar',()=>{
    it('Deberia llamarse al metodo modificar desde el template',()=>{
      const button = fixture.debugElement.nativeElement.querySelector('#actualizar');
      spyOn(component, 'modificar');
      button.click();
      expect(component.modificar).toHaveBeenCalled();
    });

    it('Deberia llamar al metodo modal',()=>{
      spyOn(component,'openModal');
      let tmp:any = Object.assign({},mockTipoPlanilla);
      tmp.accion ="U";
      component.modificar(mockTipoPlanilla);
      expect(component.openModal).toHaveBeenCalledWith(tmp);
    })
  })

  describe('Metodo eliminar',()=>{
    it('Deberia llamarse al metodo eliminar desde el template',()=>{
      const button = fixture.debugElement.nativeElement.querySelector('#borrar');
      spyOn(component, 'eliminar');
      button.click();
      expect(component.eliminar).toHaveBeenCalled();
    });

    it('Deberia llamar al metodo modal',()=>{
      spyOn(component,'openModal');
      let tmp:any = Object.assign({},mockTipoPlanilla);
      tmp.accion ="D";
      component.eliminar(mockTipoPlanilla);
      expect(component.openModal).toHaveBeenCalledWith(tmp);
    })
  })

  describe('Metodo OpenModal',()=>{
    it('Deberia abrir nuevotipoPlanillacomponent si indice es nulo',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      component.openModal(null)
      expect(component.modalService.open).toHaveBeenCalledWith(NuevoTipoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        });
    });

    it('Deberia abrir nuevotipoPlanillacomponent si indice.accion es U',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      var indice = {
        'accion':'U'
      }
      component.openModal(indice)
      expect(component.modalService.open).toHaveBeenCalledWith(NuevoTipoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        });
    });

    it('Deberia abrir PerfilesPlanillaComponent si indice es nulo',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      var indice = {
        'accion':'P'
      }
      component.openModal(indice)
      expect(component.modalService.open).toHaveBeenCalledWith(PerfilesPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        });
    });

    it('Deberia abrir ConfirmarNuevoTipoPlanillaComponent si indice es nulo',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      var indice = {
        'accion':'D'
      }
      component.openModal(indice)
      expect(component.modalService.open).toHaveBeenCalledWith(ConfirmarNuevoTipoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size:'sm'
        });
    });
  })


});
