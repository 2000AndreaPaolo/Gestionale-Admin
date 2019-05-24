import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestazioneComponent } from './prestazione.component';

describe('PrestazioneComponent', () => {
  let component: PrestazioneComponent;
  let fixture: ComponentFixture<PrestazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
