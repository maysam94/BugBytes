import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LogoutService {
    private sessionUrl = 'http://localhost:3000/sessions';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        withCredentials: true,
    };
    constructor(private http: HttpClient) {}
    /**
     * Makes an logout request to the server
     * @returns An observable<opject>
     */
    public logout(): Observable<object> {
        return this.http.delete(`${this.sessionUrl}`, this.httpOptions);
    }
}
