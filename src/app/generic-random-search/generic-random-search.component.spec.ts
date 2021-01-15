import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericRandomSearchComponent } from './generic-random-search.component';

describe('GenericRandomSearchComponent', () => {
  let component: GenericRandomSearchComponent;
  let fixture: ComponentFixture<GenericRandomSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericRandomSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericRandomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
