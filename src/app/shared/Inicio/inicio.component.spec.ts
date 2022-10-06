import { InicioComponent } from './inicio.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InicioComponent', () => {

    let component: InicioComponent;
    let fixture: ComponentFixture<InicioComponent>;

  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          InicioComponent
        ],
        imports: [
          RouterTestingModule
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(InicioComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));
  
  
    describe('Creacion del component', () => {
      it('Deberia crearse el componente Inicio', async(() => {
        const fixture = TestBed.createComponent(InicioComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
      }))

      it('Deberia iniciarse ngOnInit',()=>{
        spyOn(component,'ngOnInit').and.callThrough();
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
      })
    })

    
})