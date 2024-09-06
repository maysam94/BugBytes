import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Project } from "../pages/create-project/interfaces/project-interface";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class ProjectService {
    private projectUrl: string = "http://localhost:3000/projects";

    private httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    /**
     * Creates a new instance of this class
     * @param http - HttpClient
     */
    public constructor(private http: HttpClient) {}

    /**
     * Sends the project object to the backend
     * @param project - The project object containing the user's new project data
     * @returns - An observable with a response from the backend
     */
    public createProject(project: Project): Observable<any> {
        return this.http.post(this.projectUrl, project, this.httpOptions).pipe(
            tap(() => console.log(`created project: ${project.title}, invited users: ${project.studentIds}`)),
            catchError(this.handleError<any>("createProject"))
        );
    }

    /**
     * Sends a get request to the database
     * @returns  an Observable with a response from the backend
     */
    public getProjects(): Observable<any> {
        return this.http.get(this.projectUrl);
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
