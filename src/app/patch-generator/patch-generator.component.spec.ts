import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchGeneratorComponent } from './patch-generator.component';

describe('PatchGeneratorComponent', () => {
  let component: PatchGeneratorComponent;
  let fixture: ComponentFixture<PatchGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
