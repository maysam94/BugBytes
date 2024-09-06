import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Role } from "src/app/helpers/role";
import { UserProfile } from "src/app/interfaces/user/userInterface";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./app-navbar.component.html",
    styleUrls: ["./app-navbar.component.css"],
})
export class AppNavbarComponent {
    public userInformation?: {
        name: string;
        role: Role;
        userId: number;
    };
    public myProfile!: UserProfile;
    constructor(private navbarService: NavbarService) {}

    ngOnInit(): void {
        this.getUserInformation();
    }

    /**
     * Gets the users information
     * @returns An subscription
     */
    private getUserInformation(): Subscription {
        return this.navbarService.getUserDetails().subscribe({
            next: (response) => {
                const firstName = this.capitalizeFirstLetter(response.firstName);
                const prefixes = response.prefixes ? " " + response.prefixes + " " : " ";
                const lastName = this.capitalizeFirstLetter(response.lastName);
                this.userInformation = {
                    name: firstName + prefixes + lastName,
                    role: response.role,
                    userId: response.userId,
                };
            },
            error: () => {
                this.userInformation = undefined;
            },
        });
    }

    /**
     * Capitalizes the first letter of a word
     * @param word - The word to be capitalized
     * @returns The word with its first letter capitalized
     */
    private capitalizeFirstLetter(word: string): string {
        const letters = word.split("");
        letters[0] = letters[0].toUpperCase();
        const capitalizedWord = letters.join("");
        return capitalizedWord;
    }
}
