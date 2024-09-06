import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AchievementInterface } from 'src/app/components/achievement-item/interfaces/achievementInterface';
import { AchievementService } from 'src/app/services/achievement/achievement.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent {
  public achievements: AchievementInterface[] = [];
  constructor(private achievementService: AchievementService) {}

  /**
   * is used for the error handling
   */
  ngOnInit(): void {
    this.achievementService.getAchievements().subscribe({
      next: (result: AchievementInterface[]) => {
        this.achievements = result;
      },
      error: (error: HttpErrorResponse) => {
      }
    })
  }
}
