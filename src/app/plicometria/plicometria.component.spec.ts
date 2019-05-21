import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlicometriaComponent } from './plicometria.component';

describe('PlicometriaComponent', () => {
  let component: PlicometriaComponent;
  let fixture: ComponentFixture<PlicometriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlicometriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlicometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
