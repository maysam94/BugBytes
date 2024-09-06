import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { UserProfile } from "../interfaces/user/userInterface";

@Injectable({
    providedIn: "root",
})
export class MyprofileService {
    private requestUrl: string = "http://localhost:3000/users/profile";

    /**
     * classes can be implemented in de constructor to use the classes. eg the httpClient.
     * @param http
     */
    public constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
        withCredentials: true,
    };

    /**
     * sending get request to backend for getting user details
     * @param id
     * @returns the data that the user had for example first name, lastname
     */
    public getMyProfileDetails(id: number): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.requestUrl}/${id}`, this.httpOptions);
    }
}
