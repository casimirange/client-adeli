import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcoComponent } from './lco.component';

describe('LcoComponent', () => {
  let component: LcoComponent;
  let fixture: ComponentFixture<LcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
