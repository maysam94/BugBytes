import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserAttributes, UserProfile } from "src/app/interfaces/user/userInterface";
import { RegisterService } from "src/app/services/register.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class RegisterComponent implements OnInit {
    //properties
    public popUpMessage!: string;
    protected passwordPatterns: RegExp = new RegExp(
        /^(?=(.*[A-Z]){1})(?=(.*[a-z]){1})(?=(.*[0-9]){1})(?=(.*[@#$%^!&+=.\-_*]){1})([a-zA-Z0-9@#$%^!&+=*.\-_]){8,}$/
    );
    protected passwordContainsOneNumber: RegExp = new RegExp(/\d/g);
    protected passwordContainsCapitalCase: RegExp = new RegExp(/[A-Z]{1}/);
    protected passwordContainsLowerCase: RegExp = new RegExp(/[a-z]{1}/);
    protected passwordContainsSpecialCharacter: RegExp = new RegExp(/(?=(.*[@#$%^!&+=.\-_*]){1})/);
    public registerForm!: FormGroup;
    protected passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9]).+(?=.*[$@$!%*?&])[A-Za-z$@$!%*?&].{8,}.+";
    protected passwordOneNumber: string = "^(?=.*?[0-9]).+";
    protected passwordHasNumber: RegExp = /\d/;
    protected passwordHasCapitalCase: RegExp = /[A-Z]/;
    protected passwordHasLowerCase: RegExp = /[a-z]/;
    protected passwordHasSpecialCharacter: RegExp = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    protected areaOfExpertise: { id: number; areaOfExpertiseName: string }[] = [
        { id: 1, areaOfExpertiseName: "ICT" },
        { id: 2, areaOfExpertiseName: "Communication" },
        { id: 3, areaOfExpertiseName: "Law" },
        { id: 4, areaOfExpertiseName: "Fashion Design" },
        { id: 5, areaOfExpertiseName: "Graphic Design" },
        { id: 6, areaOfExpertiseName: "Nutrition and dietetics" },
        { id: 7, areaOfExpertiseName: "Business" },
    ];
    public defaultSelect: string = "Select Your Area of Expertise";

    /**
     * services , classes can be implemented in de constructor to use the classes , services.
     * @param formBuilder
     * @param registerService
     */
    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {}

    /**
     * creating the register form and validating the input fields
     */
    ngOnInit(): FormGroup {
        return (this.registerForm = this.formBuilder.group({
            firstName: new FormControl(null, [Validators.required]),
            prefixes: new FormControl(null),
            lastName: new FormControl(null, Validators.required),

            email: new FormControl(null, [
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(this.passwordPatterns),
            ]),
            areaOfExpertiseId: new FormControl(null, Validators.required),
        }));
    }
    selectedValue: string = "Select Your Area of Expertise";
    /**
     * on submit logged the input values to the console and making a post request
     */
    public onSubmit(user: UserAttributes): void {
        this.addUser(user);
    }

    /**
     * adds user
     * @param user
     */
    private addUser(user: UserAttributes): void {
        this.registerService.addUser(user).subscribe({
            error: (errorMessage: HttpErrorResponse) => {
                this.errorHandling(errorMessage);
            },
            complete: () => {
                this.popUpMessage = "Succesfully Registered";
            },
        });
    }

    /**
     * handles errors when an error has occured
     * @param error
     */
    private errorHandling(error: HttpErrorResponse): void {
        if (error.status === 400) {
            this.popUpMessage = "invalid credentials";
        } else if (error.status === 500) {
            this.popUpMessage = "Unknown Error";
        }
    }
}
