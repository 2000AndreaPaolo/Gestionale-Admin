import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammazioneComponent } from './programmazione.component';

describe('ProgrammazioneComponent', () => {
  let component: ProgrammazioneComponent;
  let fixture: ComponentFixture<ProgrammazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
