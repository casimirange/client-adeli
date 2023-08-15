import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdiComponent } from './ldi.component';

describe('LdiComponent', () => {
  let component: LdiComponent;
  let fixture: ComponentFixture<LdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
