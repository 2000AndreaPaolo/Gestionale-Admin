import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressioneComponent } from './progressione.component';

describe('ProgressioneComponent', () => {
  let component: ProgressioneComponent;
  let fixture: ComponentFixture<ProgressioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
