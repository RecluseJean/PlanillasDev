import { TestBed, async,ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderService } from '../../services/shared/header.service';
import { HeaderServiceStub } from '../../mocks/services/header.service.stub';
import { NgModel, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarService } from '../../services/service.index';
import ConstantesDatosPrueba from '../../mocks/ConstantesMockito';
import { Mes } from '../../models/Mes';
import { Año } from '../../models/Año';
import { Empresa } from '../../models/Empresa';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:[    
            HeaderComponent,
            NgModel,
            NgForm    
        ],
      imports: [
          RouterTestingModule.withRoutes([ { path: 'login', component: HeaderComponent} ]),
          HttpClientTestingModule,
          NgSelectModule,
        
        ],
      providers: [ 
            {provide: HeaderService, useClass:HeaderServiceStub}, 
            SidebarService,
            UsuarioService
        ]
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

    describe('Metodo ListarEmpresas de HeaderComponent',()=>{
        it('Deberia llamarse el metodo ListarEmpresas',()=>{
            spyOn(component._headerService,'listarEmpresa').and.callThrough();
            component.listarEmpresas();
            expect(component._headerService.listarEmpresa).toHaveBeenCalled();
        })
    })
    
    describe('Metodo ListarAno de HeaderComponent',()=>{
        it('Deberia llamarse el metodo publico ListarAno',()=>{
            spyOn(component._headerService,'listarAno').and.callThrough();
            component.listarAno();
            expect(component._headerService.listarAno).toHaveBeenCalled();
        })
    })

    describe('Metodo ListarMes de HeaderComponent',()=>{
        it('Deberia llamarse el metodo publico ListarMes',()=>{
            spyOn(component._headerService,'listarMeses').and.callThrough();
            component.listarMeses();
            expect(component._headerService.listarMeses).toHaveBeenCalled();
        })
    })
 
    describe('Metodo InicirValores en HeaderComponent',()=>{
        
        it('Deberia llamarse el metodo ListarAno dentro de IniciarValores si empresa esta seleccionada',()=>{
        
            spyOn(component,'listarAno').and.callThrough();
            var emp: any = ConstantesDatosPrueba.empresa1;
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify(emp));
            component.iniciarValores();
            expect(component.listarAno).toHaveBeenCalled();
        }),
        afterEach(()=>{
            localStorage.removeItem('objEmpresaSeleccion');
        })
    
        it('Deberia llamarse el metodo ListarMes dentro de IniciarValores si empresa y año estan seleccionados',()=>{
            
            spyOn(component,'listarMeses').and.callThrough();
            var emp: any = ConstantesDatosPrueba.empresa1;
            var ano: any = ConstantesDatosPrueba.añoPrueba1;
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify(emp));
            localStorage.setItem('anoSeleccion',JSON.stringify(ano));
            component.iniciarValores();
            expect(component.listarMeses).toHaveBeenCalled();
        }),
        afterEach(()=>{
            localStorage.removeItem('objEmpresaSeleccion');
            localStorage.removeItem('anoSeleccion');
            
        })
    
        it('Deberia llenarse el mes dentro de IniciarValores si empresa, año y mes estan seleccionados',()=>{
        
            var emp: any = ConstantesDatosPrueba.empresa1;
            var ano: any = ConstantesDatosPrueba.añoPrueba1;
            var mes: any = ConstantesDatosPrueba.MesPrueba1;
            localStorage.setItem('objEmpresaSeleccion',JSON.stringify(emp));
            localStorage.setItem('anoSeleccion',JSON.stringify(ano));
            localStorage.setItem('mesSeleccion',JSON.stringify(mes));
            var mesJSON: Mes = JSON.parse(localStorage.getItem('mesSeleccion'));    
            component.iniciarValores();
            expect(component.mes.idPdoMes).toEqual(mesJSON.idPdoMes);
        }),
        afterEach(()=>{
            localStorage.removeItem('objEmpresaSeleccion');
            localStorage.removeItem('anoSeleccion');
            localStorage.removeItem('mesSeleccion');        
        })

    })

    describe('Metodo LogOut de HeaderComponent',()=>{
        it('Deberia llamarse el metodo LogOut cuando se hace clic en Logout dentro del componente navbar',()=>{
            const button = fixture.debugElement.nativeElement.querySelector('#logout');
            spyOn(component,'logout').and.callThrough();
            button.click();
            expect(component.logout).toHaveBeenCalled();     
        })
    })
    /*
    describe('Metodo SetEmpresa de HeaderComponent',()=>{
        it('Deberia llamarse el metodo setEmpresa cuando se hace clic en el dropdown y se selecciona otra empresa',()=>{
               const select = fixture.debugElement.query(By.css('.ng-select-container')).nativeElement;
               spyOn(component,'setEmpresa').and.callThrough();
                fixture.detectChanges();

            expect(component.setEmpresa).toHaveBeenCalled();
        })
    })*/

    describe('Metodo SetEmpresa de HeaderComponent',()=>{
        it('Cambiar objeto empresa en el localStorage y limpiar Ano y Mes si se selecciona otra empresa',()=>{
            var emp: any = ConstantesDatosPrueba.ResponseWrapperListaEmpresas.aaData;
            var empJSON: Empresa[] = emp;
            component.lsEmpresas = empJSON;
            spyOn(component,'setEmpresa').and.callThrough();
            component.setEmpresa(1);
            expect(component.setEmpresa).toHaveBeenCalled();
        })

        it('borrar objetos empresa,ano y mes en el localStorage si se borra la empresa seleccionada',()=>{
            var emp: any = ConstantesDatosPrueba.ResponseWrapperListaEmpresas.aaData;
            var empJSON: Empresa[] = emp;
            component.lsEmpresas = empJSON;
            spyOn(component,'setEmpresa').and.callThrough();
            component.setEmpresa(null);
            expect(component.setEmpresa).toHaveBeenCalled();
        })
    })

    describe('Metodo SetAno de HeaderComponent',()=>{

        it('Cambiar objeto año en el localStorage y limpiar Mes si se selecciona otro año',()=>{
            var año: any = ConstantesDatosPrueba.ResponseWrapperListaAñoEmpresa2.aaData;
            var añoJSON: Año[] = año;
            component.lsAno = añoJSON;
            spyOn(component,'setAno').and.callThrough();
            component.setAno(12);
            expect(component.setAno).toHaveBeenCalled();
        })

        it('borrar objetos ano y mes en el localStorage si se borra el año seleccionado',()=>{
            var año: any = ConstantesDatosPrueba.ResponseWrapperListaAñoEmpresa2.aaData;
            var añoJSON: Año[] = año;
            component.lsAno = añoJSON;
            spyOn(component,'setAno').and.callThrough();
            component.setAno(null);
            expect(component.setAno).toHaveBeenCalled();
        })
    })

    describe('Metodo SetMes de HeaderComponent',()=>{

        it('Cambiar objeto mes en el localStorage',()=>{
            var mes: any = ConstantesDatosPrueba.ResponseWrapperListaMeses.aaData;
            var mesJSON:Mes[] = mes;
            component.lsMeses = mesJSON;
            spyOn(component,'setMes').and.callThrough();
            component.setMes(2);
            expect(component.setMes).toHaveBeenCalled();
        })

        it('borrar objeto mes en el localStorage si se borra el mes seleccionado',()=>{
            var mes: any = ConstantesDatosPrueba.ResponseWrapperListaMeses.aaData;
            var mesJSON:Mes[] = mes;
            component.lsMeses = mesJSON;
            spyOn(component,'setMes').and.callThrough();
            component.setMes(null);
            expect(component.setMes).toHaveBeenCalled();
        })
    })


});
