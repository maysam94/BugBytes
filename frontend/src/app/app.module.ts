import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppFooterComponent } from "./components/app-footer/app-footer.component";
import { AppNavbarComponent } from "./components/app-navbar/app-navbar.component";
import { RegisterComponent } from "./pages/register/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./material.module";
import { RegisterService } from "./services/register.service";
import { CreateAssignmentComponent } from "./Assignment/create-assignment/create-assignment.component";
import { LoginComponent } from "./pages/login/login.component";
import { PopupComponent } from "./components/popup/popup.component";
import { AddGroupComponent } from "./pages/dashboard/teacher/groups/add-group/add-group.component";
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import { DummypersonalprojectsComponent } from "./dummypersonalprojects/dummypersonalprojects.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { InviteStudentsComponent } from "./components/invite-students/invite-students.component";
import { ProjectItemComponent } from "./components/project-item/project-item.component";
import { HomeComponent } from "./pages/home/home.component";
import { SdgComponent } from "./components/sdg/sdg.component";
import { NavbarDropdownComponent } from "./components/navbar-dropdown/navbar-dropdown.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EditprofileComponent } from "./pages/edit-profile/editprofile.component";
import { MyProfileComponent } from "./pages/own-profile/ownprofile.component";
import { OwnprofiledetailsComponent } from "./pages/own-profile-details/currentuserprofiledetails.component";
import { EditprofileService } from "./services/editprofile.service";
import { AchievementComponent } from "./pages/achievement/achievement.component";
import { AchievementItemComponent } from "./components/achievement-item/achievement-item.component";
@NgModule({
    declarations: [
        AppComponent,
        AppNavbarComponent,
        AppFooterComponent,
        RegisterComponent,
        LoginComponent,
        PopupComponent,
        CreateAssignmentComponent,
        AddGroupComponent,
        CreateProjectComponent,
        NotFoundComponent,
        DummypersonalprojectsComponent,
        InviteStudentsComponent,
        ProjectItemComponent,
        HomeComponent,
        SdgComponent,
        NavbarDropdownComponent,
        EditprofileComponent,
        MyProfileComponent,
        OwnprofiledetailsComponent,
        AchievementComponent,
        AchievementItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
    ],
    providers: [EditprofileService, RegisterService],
    bootstrap: [AppComponent],
})
export class AppModule {}
