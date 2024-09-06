import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GroupInterface } from 'src/app/pages/dashboard/teacher/groups/interfaces/groupInterfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private requestUrl = "http://localhost:3000/groups";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to the backend for creating a group
   * @param groupObject All required group data
   * @returns The response from the backend
   */
  public createGroup(groupObject: GroupInterface): Observable<GroupInterface> {
      return this.http.post<GroupInterface>(this.requestUrl, groupObject, this.httpOptions).pipe(
        tap(() => console.log(`created`))
        );
    }
}
