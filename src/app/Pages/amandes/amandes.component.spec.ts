import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmandesComponent } from './amandes.component';

describe('AmandesComponent', () => {
  let component: AmandesComponent;
  let fixture: ComponentFixture<AmandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
