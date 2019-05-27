import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CestinoComponent } from './cestino.component';

describe('CestinoComponent', () => {
  let component: CestinoComponent;
  let fixture: ComponentFixture<CestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
