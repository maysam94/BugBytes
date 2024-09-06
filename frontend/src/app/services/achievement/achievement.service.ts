import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AchievementInterface } from 'src/app/components/achievement-item/interfaces/achievementInterface';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  private url = "http://localhost:3000/achievements";
  constructor(private http: HttpClient) { }

  /**
     * Sends a get request to the database
     * @returns  an Observable with a response from the backend
  */
  public getAchievements(): Observable<AchievementInterface[]> {
    return this.http.get<AchievementInterface[]>(this.url);
  }
}
