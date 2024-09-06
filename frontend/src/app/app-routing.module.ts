import { ApplicationModule, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule, Routes } from "@angular/router";
import { CreateAssignmentComponent } from "./Assignment/create-assignment/create-assignment.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import { AddGroupComponent } from "./pages/dashboard/teacher/groups/add-group/add-group.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { EditprofileComponent } from "./pages/edit-profile/editprofile.component";
import { MyProfileComponent } from "./pages/own-profile/ownprofile.component";
import { AchievementComponent } from "./pages/achievement/achievement.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "", redirectTo: "/", pathMatch: "full" },
    { path: "createAssignment", component: CreateAssignmentComponent },
    { path: "dashboard/groups/add-group", component: AddGroupComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "achievements", component: AchievementComponent },
    { path: "create-project", component: CreateProjectComponent },
    { path: "profile", component: MyProfileComponent },
    { path: "edit", component: EditprofileComponent },
    { path: "404", component: NotFoundComponent },
    { path: "**", redirectTo: "404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],

    exports: [RouterModule],
})
export class AppRoutingModule {}
