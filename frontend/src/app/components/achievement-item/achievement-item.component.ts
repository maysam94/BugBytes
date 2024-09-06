import { Component, Input } from '@angular/core';
import { AchievementInterface } from './interfaces/achievementInterface';

@Component({
  selector: 'app-achievement-item',
  templateUrl: './achievement-item.component.html',
  styleUrls: ['./achievement-item.component.css']
})
export class AchievementItemComponent {
  @Input() achievementInformation!: AchievementInterface;

}
