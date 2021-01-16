import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipGeneratorComponent } from './ship-generator.component';

describe('ShipGeneratorComponent', () => {
  let component: ShipGeneratorComponent;
  let fixture: ComponentFixture<ShipGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
