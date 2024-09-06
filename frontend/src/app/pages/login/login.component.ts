import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    public loginForm!: FormGroup;
    public popUpMessage!: string;

    constructor(
        private loginService: LoginService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ]),
            password: new FormControl(null, Validators.required),
        });
    }
    /**
     * @author Anish Raghoenath
     * On submit checks the input and logs the user in.
     */
    public onSubmit(): void {
        if (
            this.loginForm.controls['email'].valid &&
            this.loginForm.controls['password'].valid
        ) {
            this.loginUser();
        }
    }

    /**
     * @author Anish Raghoenath
     * Uses the login method on the LoginService and handles the response.
     */
    private loginUser(): void {
        this.loginService
            .login({
                email: this.loginForm.controls['email'].value,
                password: this.loginForm.controls['password'].value,
            })
            .subscribe({
                error: (errorMessage: HttpErrorResponse) => {
                    this.errorHandling(errorMessage);
                },
                complete: () => {
                    this.popUpMessage = 'Logged in';
                    window.location.href = "/"
                },
            });
    }
    /**
     * @author Anish Raghoenath
     * Handles the different cases when an error happens
     * @param errorMessage The error of a bad login request
     */
    private errorHandling(errorMessage: HttpErrorResponse): void {
        if (errorMessage.status === 400) {
            this.popUpMessage = 'Invalid email';
        } else if (errorMessage.status === 401) {
            this.popUpMessage = 'Incorrect Credentials';
        } else {
            this.popUpMessage = 'Unknown Error';
        }
    }
}
