import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvitableStudent } from '../interfaces/user/userInterface';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InviteStudentsService {

    private inviteStudentsUrl: string = 'http://localhost:3000/users/students'

    private httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    /**
     * Creates a new instance of this class
     * @param http - HttpClient
     */
    public constructor(private http: HttpClient) { }

    /**
     * Gets all students from the backend
     * @returns An observable with type InvitableStudent[]
     */
    public getStudents(): Observable<InvitableStudent[]> {
        return this.http.get<InvitableStudent[]>(this.inviteStudentsUrl, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError<any>('getStudents'))
        );
    }

    private handleError<T>(result?: T) {
        return (error: Error): Observable<T> => {
          console.error(error.message);
          return of(result as T);
        };
      }
}
