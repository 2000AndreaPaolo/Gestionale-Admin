import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EserciziComponent } from './esercizi.component';

describe('EserciziComponent', () => {
  let component: EserciziComponent;
  let fixture: ComponentFixture<EserciziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EserciziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EserciziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
