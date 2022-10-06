import { BreadcrumbsComponent } from './breadcrumbs.component';
import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Router, ActivationEnd } from '@angular/router';
import { InicioComponent } from '../Inicio/inicio.component';

describe('BreadcrumbsComponent', () => {
    
    let component: BreadcrumbsComponent;
    let fixture: ComponentFixture<BreadcrumbsComponent>;
    let router: Router;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
               BreadcrumbsComponent,
               InicioComponent
            ],
            imports: [
                RouterTestingModule.withRoutes( [{path: 'inicio',component: InicioComponent, data: { titulo: 'Inicio' }}]),
                HttpClientTestingModule,
            ],
            providers: [

            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        }).compileComponents();

        fixture = TestBed.createComponent(BreadcrumbsComponent);
        router = TestBed.get(Router);
        component = fixture.componentInstance;
        router.initialNavigation();
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente Breadcrumbs', async(() => {
            const fixture = TestBed.createComponent(BreadcrumbsComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba metodo ngOnInit',()=>{
        it('Deberia setearse el titulo que le llega del evento',()=>{
            spyOn(component,'getDataRoute').and.returnValue(of({
                'titulo':'Hola'
            }));
            component.ngOnInit();
            expect(component.label).toEqual('Hola');
            expect(component.title.getTitle()).toEqual('Hola');
        });
    });

    describe('Prueba metodo getDataRoute',()=>{
        it('Deberia instanciarse a ActivationEnd',fakeAsync(()=>{
            router.navigate(['inicio']);
            tick();
            var mock:any = router.events
            .filter(evento => evento instanceof ActivationEnd)
            .filter((evento: ActivationEnd) => evento.snapshot.firstChild === null)
            .map((evento: ActivationEnd) => evento.snapshot.data);
            spyOn(component.router,'events').and.returnValue(of(mock));
            var data: any =component.getDataRoute();
            component.getDataRoute();
            expect(data).toBeDefined();
        }))
    })
});