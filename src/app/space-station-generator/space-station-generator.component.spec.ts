import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceStationGeneratorComponent } from './space-station-generator.component';

describe('SpaceStationGeneratorComponent', () => {
  let component: SpaceStationGeneratorComponent;
  let fixture: ComponentFixture<SpaceStationGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceStationGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceStationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
