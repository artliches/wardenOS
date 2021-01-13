import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinketGeneratorComponent } from './trinket-generator.component';

describe('TrinketGeneratorComponent', () => {
  let component: TrinketGeneratorComponent;
  let fixture: ComponentFixture<TrinketGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrinketGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrinketGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
