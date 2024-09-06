import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummypersonalprojectsComponent } from './dummypersonalprojects.component';

describe('DummypersonalprojectsComponent', () => {
  let component: DummypersonalprojectsComponent;
  let fixture: ComponentFixture<DummypersonalprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummypersonalprojectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummypersonalprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
