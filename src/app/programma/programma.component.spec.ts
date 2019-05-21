import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammaComponent } from './programma.component';

describe('ProgrammaComponent', () => {
  let component: ProgrammaComponent;
  let fixture: ComponentFixture<ProgrammaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
