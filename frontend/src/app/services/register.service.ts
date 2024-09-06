import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { User, UserAttributes, UserProfile } from "../interfaces/user/userInterface";

@Injectable({
    providedIn: "root",
})
export class RegisterService {
    private registerUrl: string = "http://localhost:3000/users/";

    private httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    /**
     * classes can be implemented in de constructor to use the classes. eg the httpClient.
     * @param http
     */
    public constructor(private http: HttpClient) {}

    /**
     * @param user
     * @returns {Observable<User>}
     * @description adds an user
     */
    public addUser(user: UserAttributes): Observable<User> {
        const body = JSON.stringify(user);
        return this.http.post<User>(`${this.registerUrl}`, body, this.httpOptions);
    }
}
