import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdministracionComponent } from './administracion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('AdministracionComponent', () => {
    
  let component: AdministracionComponent;
  let fixture: ComponentFixture<AdministracionComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AdministracionComponent,

        ],
        imports: [
            RouterTestingModule,
            HttpClientTestingModule
                  ],
          providers: [ ],
          schemas:[
              NO_ERRORS_SCHEMA
          ]
      }).compileComponents();

      fixture = TestBed.createComponent(AdministracionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));
    it('Deberia crearse el componente administracion', async(() => {
      const fixture = TestBed.createComponent(AdministracionComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));

    it('Deberia iniciarse ngOnInit',()=>{
      spyOn(component,'ngOnInit').and.callThrough();
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalled();
    })
  
  });
  