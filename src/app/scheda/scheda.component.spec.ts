import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaComponent } from './scheda.component';

describe('SchedaComponent', () => {
  let component: SchedaComponent;
  let fixture: ComponentFixture<SchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
