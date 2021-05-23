import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangwaComponent } from './mangwa.component';

describe('MangwaComponent', () => {
  let component: MangwaComponent;
  let fixture: ComponentFixture<MangwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangwaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
