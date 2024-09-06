import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpHeaders,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';
import { Assignment } from 'src/app/Assignment/interface-create-assignment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private assignmentUrl: string = 'http://localhost:3000/assignments';

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public createAssignment(assignment: Assignment): Observable<any> {
    return this.http.post(this.assignmentUrl,assignment,  this.httpOptions).pipe(
      tap(() => console.log(`created assignment: ${assignment.title}`)),
      catchError(this.handleError<any>('createAssignment'))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
