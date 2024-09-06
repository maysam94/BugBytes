import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  public handleError(error: HttpErrorResponse): Observable<unknown> {
    if (error.status === 404) {
      console.log('An Error occurred:', error.error);
    } else {
      console.log(`Backend return status code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
