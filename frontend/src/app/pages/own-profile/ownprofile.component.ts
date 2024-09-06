import { Component, OnInit } from "@angular/core";
import { UserProfile } from "../../interfaces/user/userInterface";
import { MyprofileService } from "../../services/myprofile.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
@Component({
    selector: "app-ownprofile",
    templateUrl: "./ownprofile.component.html",
    styleUrls: ["./ownprofile.component.css"],
})
export class MyProfileComponent implements OnInit {
    /**
     * services , classes can be implemented in de constructor to use the classes , services.
     * @param myProfileService
     * @param route
     */
    constructor(private myProfileService: MyprofileService, private route: ActivatedRoute) {}

    //properties
    public myProfileDetails!: UserProfile;
    public userSocials: UserProfile[] = [];

    //methods

    /**
     * displays the user details
     */
    public ngOnInit(): void {
        this.getMyProfileDetails();
    }

    /**
     * gets profile details for example firstname,lastname etc
     * @returns the service for getting the profile details
     */
    public getMyProfileDetails(): Subscription {
        const userId: number = Number(this.route.snapshot.paramMap.get("id"));
        return this.myProfileService
            .getMyProfileDetails(userId)
            .subscribe((myProfile) => (this.myProfileDetails = myProfile));
    }
}
