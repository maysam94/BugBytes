import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "@angular/common";
import { Observable, tap } from "rxjs";
import { UserProfile } from "../interfaces/user/userInterface";
import { Role } from "../helpers/role";

@Injectable({
    providedIn: "root",
})
export class EditprofileService {
    /**
     * classes can be implemented in de constructor to use the classes.
     * @param http
     */
    public constructor(private http: HttpClient) {}

    private requestUrl: string = "http://localhost:3000/users/profile";

    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
        withCredentials: true,
    };

    /**
     * sending put request to backend
     * @param id
     * @param user
     * @returns the data that the user had for example first name, lastname
     */
    updateUserInformation(id: number, user: UserProfile): Observable<UserProfile> {
        return this.http.put<UserProfile>(`${this.requestUrl}/${id}`, user, this.httpOptions);
    }
}
