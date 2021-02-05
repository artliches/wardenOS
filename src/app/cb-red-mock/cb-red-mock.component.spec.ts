import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbRedMockComponent } from './cb-red-mock.component';

describe('CbRedMockComponent', () => {
  let component: CbRedMockComponent;
  let fixture: ComponentFixture<CbRedMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbRedMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbRedMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
