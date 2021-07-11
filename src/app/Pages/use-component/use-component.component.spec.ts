import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseComponentComponent } from './use-component.component';

describe('UseComponentComponent', () => {
  let component: UseComponentComponent;
  let fixture: ComponentFixture<UseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
