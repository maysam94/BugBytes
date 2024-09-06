import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CurrentUserData, UserProfile } from "../../interfaces/user/userInterface";
import { MyprofileService } from "../../services/myprofile.service";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
@Component({
    selector: "app-ownprofiledetails",
    templateUrl: "./ownprofiledetails.component.html",
    styleUrls: ["./ownprofiledetails.component.css"],
})
export class OwnprofiledetailsComponent implements OnInit {
    /**
     * services etc can be implemented in the constructor to use in methods
     */
    constructor(private myProfileService: MyprofileService, private route: ActivatedRoute) {}
    //properties

    public faEnvelope = faEnvelope;
    public myProfileDetails!: UserProfile;
    public currentUserData!: CurrentUserData;
    public bannerPlaceholder: string =
        "https://res.cloudinary.com/omaha-code/image/upload/ar_4:3,c_fill,dpr_1.0,e_art:quartz,g_auto,h_396,q_auto:best,t_Linkedin_official,w_1584/v1561576558/mountains-1412683_1280.png";
    public achievementImages = [
        { url: "https://cdn-icons-png.flaticon.com/512/4168/4168977.png" },
        {
            url: "https://media.istockphoto.com/id/1168757141/nl/vector/gouden-trofee-met-de-naamplaatje-van-de-winnaar-van-de-competitie.jpg?s=612x612&w=0&k=20&c=nwnkHYbJ4BZ2gvdNyzUm4d9AeZkDQwJIXVlmTlY_6qE=",
        },
        { url: "https://cdn.icon-icons.com/icons2/2744/PNG/512/medal_award_success_badge_achievement_icon_175957.png" },
        {
            url: "https://cdn2.iconfinder.com/data/icons/teamwork-41/100/team-achievement-1-teamwork-achievements-flag-goal-celebrate-confetti-512.png",
        },
        {
            url: "https://static.vecteezy.com/system/resources/previews/007/837/768/original/red-flags-placed-on-high-mountains-ideas-for-achieving-business-goals-vector.jpg",
        },
    ];

    //methods
    /**
     * ngOnInit will be called when angular is done with creating the component
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
