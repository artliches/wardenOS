import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomComponent } from './add-custom.component';

describe('AddCustomComponent', () => {
  let component: AddCustomComponent;
  let fixture: ComponentFixture<AddCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
