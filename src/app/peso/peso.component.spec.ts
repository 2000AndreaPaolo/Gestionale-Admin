import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoComponent } from './peso.component';

describe('PesoComponent', () => {
  let component: PesoComponent;
  let fixture: ComponentFixture<PesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
