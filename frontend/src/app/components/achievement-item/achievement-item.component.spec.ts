import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementItemComponent } from './achievement-item.component';

describe('AchievementItemComponent', () => {
  let component: AchievementItemComponent;
  let fixture: ComponentFixture<AchievementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
