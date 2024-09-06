import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EditprofileService } from "../../services/editprofile.service";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserProfile } from "../../interfaces/user/userInterface";
import { MyprofileService } from "../../services/myprofile.service";
import { Location } from "@angular/common";

@Component({
    selector: "app-editprofile",
    templateUrl: "./editprofile.component.html",
    styleUrls: ["./editprofile.component.css"],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditprofileComponent implements OnInit {
    //properties
    public popUpMessage!: string;
    public emailPattern: RegExp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    public myProfileSavedDetails!: UserProfile;
    public myEditForm!: FormGroup;
    public areaOfExpertise: { id: number; areaOfExpertiseName: string }[] = [
        { id: 1, areaOfExpertiseName: "ICT" },
        { id: 2, areaOfExpertiseName: "Communication" },
        { id: 3, areaOfExpertiseName: "Law" },
        { id: 4, areaOfExpertiseName: "Fashion Design" },
        { id: 5, areaOfExpertiseName: "Graphic Design" },
        { id: 6, areaOfExpertiseName: "Nutrition and dietetics" },
        { id: 7, areaOfExpertiseName: "Business" },
    ];

    constructor(
        private editProfileService: EditprofileService,
        private myProfileService: MyprofileService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    //methods

    /**
     * displays the user details in input fields
     * using reactive form these are synced
     */
    ngOnInit(): void {
        this.getMyProfileDetails();
        const userId = Number(this.route.snapshot.paramMap.get("id"));
        this.myEditForm = this.formBuilder.group({
            firstName: new FormControl(null, [Validators.minLength(2), Validators.maxLength(255)]),
            prefixes: new FormControl(null, [Validators.minLength(0), Validators.maxLength(20)]),
            lastName: new FormControl(null, [Validators.minLength(2), Validators.maxLength(255)]),
            description: new FormControl(null, [Validators.minLength(0), Validators.maxLength(500)]),
            email: new FormControl(null, [
                Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            ]),
            areaOfExpertiseId: new FormControl(null),
        });
        this.myProfileService.getMyProfileDetails(userId).subscribe((data) => {
            this.myEditForm.patchValue(data);
        });
    }

    /**
     * sends the request to backend if edit form is valid
     * @author Ömer Aynaci <omer.aynaci@hva.nl>
     * @param editUser
     */
    onSubmit(editUser: UserProfile): void {
        if (this.myEditForm.valid) {
            this.save(editUser);
        } else if (this.myEditForm.invalid) {
            this.popUpMessage = "One or more fields are invalid";
        }
    }

    /**
     * gets all data of a user
     * @author Ömer Aynaci <omer.aynaci@hva.nl>
     * @returns the service that gets the data from backend
     */
    public getMyProfileDetails(): Subscription {
        const userId: number = Number(this.route.snapshot.paramMap.get("id"));
        return this.myProfileService
            .getMyProfileDetails(userId)
            .subscribe((myProfile) => (this.myProfileSavedDetails = myProfile));
    }

    /**
     * goes back to previous path
     * @author Ömer Aynaci <omer.aynaci@hva.nl>
     */
    public goBack(): void {
        window.location.href = "http://localhost:4200/profile";
    }

    /**
     * updates user details if user data exists
     * @author Ömer Aynaci <omer.aynaci@hva.nl>
     */
    public save(user: UserProfile): void {
        const userId = Number(this.route.snapshot.paramMap.get("id"));
        if (this.myProfileSavedDetails) {
            this.editProfileService
                .updateUserInformation(userId, user)
                .subscribe((profile) => (this.myProfileSavedDetails = profile))
                .add(this.goBack());
        }
    }
}
