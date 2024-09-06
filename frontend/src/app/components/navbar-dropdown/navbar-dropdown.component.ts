import { Component, Input } from "@angular/core";
import { LogoutService } from "../../services/logout.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Location } from "@angular/common";
import { MyprofileService } from "src/app/services/myprofile.service";
import { Subscription } from "rxjs/internal/Subscription";
import { UserProfile } from "src/app/interfaces/user/userInterface";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: "app-navbar-dropdown",
    templateUrl: "./navbar-dropdown.component.html",
    styleUrls: ["./navbar-dropdown.component.css"],
})
/**
 * @author Mays alTimemy
 * Uses the logout method on the LogoutService and handles the response.
 */
export class NavbarDropdownComponent {
    @Input() public name?: string;
    onClick(dialog: HTMLDialogElement): void {
        dialog.show();
    }

    public popUpMessage!: string;
    public myProfileDetails!: UserProfile;
    constructor(
        private logoutService: LogoutService,
        private location: Location,
        private myProfileService: MyprofileService,
        private route: ActivatedRoute
    ) {}

    /**
     * On submit log the user out.
     */

    public onSubmit(): void {
        this.logout();
    }

    /**
     * Uses the logout method on the LogoutService and handles the response.
     */
    logout(): void {
        this.logoutService.logout().subscribe({
            error: (errorMessage: HttpErrorResponse) => {
                this.errorHandling(errorMessage);
            },
            complete: () => {
                this.popUpMessage = "Logged out";
                this.location.back();
            },
        });
    }
    /**
     * Handles the different cases when an error happens
     * @param errorMessage The error of a bad logout request
     */
    private errorHandling(errorMessage: HttpErrorResponse): void {
        if (errorMessage.status === 401) {
            this.popUpMessage = "Incorrect Credentials";
        } else {
            this.popUpMessage = "Unknown Error";
        }
    }
}
