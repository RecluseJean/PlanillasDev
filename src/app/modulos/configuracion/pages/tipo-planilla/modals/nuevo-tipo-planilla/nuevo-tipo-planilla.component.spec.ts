import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoPlanillaComponent } from './nuevo-tipo-planilla.component';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { TipoPlanilla } from '../../../../../../models/Tipo-Planilla';
import { ConfirmarNuevoTipoPlanillaComponent } from '../confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import { TipoPlanillaServiceStub } from '../../../../../../mocks/services/tipoPlanilla.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgSelectModule } from '@ng-select/ng-select';

describe('NuevoTipoPlanillaComponent', () => {
  let component: NuevoTipoPlanillaComponent;
  let fixture: ComponentFixture<NuevoTipoPlanillaComponent>;
  const mockTipoPlanilla: TipoPlanilla = ConstantesDatosPrueba.TipoPlanilla;
  const mocklsPerfiles = ConstantesDatosPrueba.lsPerfiles;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NuevoTipoPlanillaComponent,
        ConfirmarNuevoTipoPlanillaComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        NgSelectModule,
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
          ConfirmarNuevoTipoPlanillaComponent
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoTipoPlanillaComponent);
    component = fixture.componentInstance;
    component.input_tipPlan= mockTipoPlanilla;
    fixture.detectChanges();
  }))

  describe('Creacion del component', () => {
    it('Deberia crearse el componente NuevoTipoPlanillaComponent', async(() => {
      const fixture = TestBed.createComponent(NuevoTipoPlanillaComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }))
  });

  describe('Metodo ngOnInit',()=>{
    it('Deberia setearse tipoPlanilla y categoriaPlanilla si input no es nulo',()=>{
      component.input_tipPlan = mockTipoPlanilla;
      component.ngOnInit();
      expect(component.tipoPlanilla).toEqual(mockTipoPlanilla);
      expect(component.categoriaPlanilla).toEqual(1);
    });

    it('Deberia llamar al metodo listarPerfiles si input  es nulo',()=>{
      spyOn(component,'listarPerfiles');
      component.input_tipPlan = null;
      component.ngOnInit();
      expect(component.listarPerfiles).toHaveBeenCalled();
    })
  })

  describe('Metodo ListarPerfiles',()=>{
    it('Deberia llenarse lsPerfiles si es correcto el servicio',()=>{
      component.listarPerfiles();
      expect(component.lsPerfiles.length>0).toBeTruthy();
    })
  });

  describe('Metodo close',()=>{
    it('Deberia llamarse al metodo desde el template',()=>{
      spyOn(component,'close');
      const button = fixture.debugElement.nativeElement.querySelector('#close');
      button.click();
      expect(component.close).toHaveBeenCalled();
    });

    it('Deberia cerrarse el modal',()=>{
      spyOn(component.activemodal,'dismiss').and.callThrough();
      component.close();
      expect(component.activemodal.dismiss).toHaveBeenCalledWith('Cancelado');
    });
  });

  describe('Metodo ver', () => {
    it('Deberia setearse el estado de un perfil en 0 si fue 1', () => {
      component.lsPerfiles = mocklsPerfiles;
      component.ver(mocklsPerfiles[0]);
      var nuevols = [
        {
          "idPerfil":1,
          "ambito":0
        },
        {
          "idPerfil":2,
          "ambito":0
        }
      ]
      expect(component.lsPerfiles).toEqual(nuevols);
    })

    it('Deberia setearse el estado de un perfil en 1 si fue 0', () => {
      component.lsPerfiles = mocklsPerfiles;
      component.ver(mocklsPerfiles[1]);
      var nuevols = [
        {
          "idPerfil":1,
          "ambito":0
        },
        {
          "idPerfil":2,
          "ambito":1
        }
      ]
      expect(component.lsPerfiles).toEqual(nuevols);
    })
  })

  describe('Metodo mostrarMsj',()=>{
    it('Deberia mostrar un mensaje de alerta si input no es nulo y las categorias son distintas',()=>{
      component.input_tipPlan = mockTipoPlanilla;
      component.categoriaPlanilla = 5;
      component.mostrarMsj();
      expect(component.msg).toEqual('Esta cambiando la categoria de la planilla.               Si guardas los cambios todos los trabajadores asignados a esta planilla seran retirados y quedaran libres');

    })
  })

  describe('Metodo confirmar',()=>{
    it('Deberia llamarse al metodo desde el template',()=>{
      spyOn(component,'confirmar');
      const button = fixture.debugElement.nativeElement.querySelector('#confirmar');
      button.click();
      expect(component.confirmar).toHaveBeenCalled();
    })

    it('Deberia abrirse el modal ConfirmarNuevoTipoPlanillaComponent',()=>{
      spyOn(component.modalService,'open').and.callThrough();
      component.confirmar();
      expect(component.modalService.open).toHaveBeenCalledWith(ConfirmarNuevoTipoPlanillaComponent,{
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      });
    })
  })
});
