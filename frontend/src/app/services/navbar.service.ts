import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../helpers/role';
import { CurrentUserData } from '../interfaces/user/userInterface';

@Injectable({
    providedIn: 'root',
})
export class NavbarService {
    private requestURL = 'http://localhost:3000/users/current';
    private _httpHeaders = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
    };

    constructor(private httpClient: HttpClient) {}

    /**
     * Gets the user's details
     * @returns The user details needed in the navbar
     */
    public getUserDetails(): Observable<CurrentUserData> {
        return this.httpClient.get<CurrentUserData>(this.requestURL, this._httpHeaders);
    }
}
