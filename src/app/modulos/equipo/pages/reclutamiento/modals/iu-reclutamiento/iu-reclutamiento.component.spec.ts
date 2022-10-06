import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IuReclutamientoComponent } from './iu-reclutamiento.component';

describe('IuReclutamientoComponent', () => {
  let component: IuReclutamientoComponent;
  let fixture: ComponentFixture<IuReclutamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IuReclutamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IuReclutamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
