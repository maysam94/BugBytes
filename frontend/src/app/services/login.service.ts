import { Location } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    private _httpHeaders = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        withCredentials: true,
    };
    constructor(private httpClient: HttpClient) {}

    /**
     * Makes an login request to the server
     * @param userInfo The user's info
     * @returns An observable
     */
    public login(userInfo: { email: string; password: string }): Observable<Object> {
        return this.httpClient.post(
            "http://localhost:3000/sessions",
            {
                email: userInfo.email,
                password: userInfo.password,
            },
            this._httpHeaders
        );
    }
}
