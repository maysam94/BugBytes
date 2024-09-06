import { Component } from "@angular/core";
import { Project } from "./interfaces/project-interface";
import { sdgImageUrls } from "./sdg-images";
import { ProjectService } from "src/app/services/project.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { InvitableStudent } from "src/app/interfaces/user/userInterface";

@Component({
    selector: "app-create-project",
    templateUrl: "./create-project.component.html",
    styleUrls: ["./create-project.component.css"],
})
export class CreateProjectComponent {
    private projectTitle: string = "";
    private projectDescription: string = "";
    public projectImageUrls: string[] = [];
    private projectSdgIds: number[] = [];
    private invitedStudentIds: number[] = [];

    public validTitle: boolean = true;
    public validDescription: boolean = true;
    public validUrl: boolean = true;
    public maxImageAmount: boolean = false;
    public validSdgInput: boolean = true;

    public sdgImages: string[] = sdgImageUrls;

    /**
     * Creates a new instance of this class
     * @param projectService
     * @param router
     */
    public constructor(private projectService: ProjectService, private router: Router) {}

    /**
     * Checks if main project form is valid, adds information into an object of type Project and sends it to projectService
     * @param projectForm - The ngForm directive from the main project form
     */
    public onSubmit(projectForm: NgForm) {
        if (projectForm.valid && this.projectSdgIds.length > 0) {
            let newProject: Project = {
                title: this.projectTitle,
                description: this.projectDescription,
                imageUrls: this.projectImageUrls,
                sdgIds: this.projectSdgIds,
                studentIds: this.invitedStudentIds,
            };
            this.projectService.createProject(newProject).subscribe(() => this.router.navigate(["/"]));
        } else {
            this.handleInvalidSubmit(projectForm);
        }
    }

    /**
     * Checks which inputs are invalid and sets validity accordingly
     * @param projectForm - The ngForm directive of the main project form
     */
    private handleInvalidSubmit(projectForm: NgForm) {
        if (projectForm.value.titleInput === "") this.validTitle = false;
        if (projectForm.value.descriptionInput === "") this.validDescription = false;
        if (this.projectSdgIds.length === 0) this.validSdgInput = false;
    }

    /**
     * Gets the title input from the DOM and checks if length is between 5 and 125 characters
     * @param event - The event object obtained from the DOM
     */
    public onUpdateTitle(event: Event) {
        this.projectTitle = (event.target as HTMLInputElement).value;
        if (this.projectTitle.length >= 5 && this.projectTitle.length <= 255) {
            this.validTitle = true;
        }
    }

    /**
     * Gets the description input from the DOM and checks if length is between 10 and 5000 characters
     * @param event - The event object obtained from the DOM
     */
    public onUpdateDescription(event: Event) {
        this.projectDescription = (event.target as HTMLTextAreaElement).value;
        if (this.projectDescription.length >= 10 && this.projectDescription.length <= 10000) {
            this.validDescription = true;
        }
    }

    /**
     * Sets validUrl to true on input to remove the error message.
     */
    public onUpdateImageUrl(urlInputField: HTMLInputElement) {
        this.validUrl = true;
        urlInputField.classList.remove("invalid-input-field");
    }

    /**
     * Inserts an image url into the projectImageUrls array if the url is valid and the array is under 5 items.
     * Empties the image form
     * @param imageForm - The ngForm directive of the image form
     * @param imageUrlObject - The object containing the image url from user input
     */
    public onSubmitImageUrl(imageForm: NgForm, imageUrlObject: any, urlInputField: HTMLInputElement) {
        this.checkUrlValidity(imageUrlObject.imageUrl);
        if (this.validUrl) {
            if (this.projectImageUrls.length < 5) {
                this.projectImageUrls.push(imageUrlObject.imageUrl);
                imageForm.reset();
            } else {
                this.maxImageAmount = true;
                urlInputField.classList.add("invalid-input-field");
            }
        } else {
            urlInputField.classList.add("invalid-input-field");
        }
    }

    /**
     * Removes the image whith the requested idex from the images array
     * @param imageIndex - The index of the image to be removed
     */
    public onRemoveImage(imageIndex: number, urlInputField: HTMLInputElement) {
        this.projectImageUrls.splice(imageIndex, 1);
        this.maxImageAmount = false;
        urlInputField.classList.remove("invalid-input-field");
    }

    /**
     * Adds or removes an sdg id from the projectSdgIds array and checks if the array length is 0
     * @param event The event object obtained from the DOM
     */
    public onSdgClick(event: Event) {
        let sdgId: number = +(event.target as HTMLImageElement).id;
        (event.target as HTMLImageElement).classList.toggle("clicked-sdg");
        if (this.projectSdgIds.includes(sdgId)) {
            this.projectSdgIds.splice(this.projectSdgIds.indexOf(sdgId), 1);
        } else {
            this.projectSdgIds.push(sdgId);
        }
        if (this.projectSdgIds.length > 0) this.validSdgInput = true;
    }

    /**
     * Gets all user ids form invitable student array
     * @param selectedStudents - array of invitable students from the invite-students component
     */
    public onUpdateStudentSelect(selectedStudents: InvitableStudent[]) {
        let selectedStudentIds: number[] = [];
        selectedStudents.forEach((student) => {
            selectedStudentIds.push(student.userId);
        });
        this.invitedStudentIds = selectedStudentIds;
    }

    /**
     * Checks whether a string is an url
     * @param urlString - The url that needs to be validated
     */
    private checkUrlValidity(urlString: string) {
        const urlPattern = new RegExp(
            "^" + // begin
                "[a-z]{2,5}" + // 2 to 5 letters
                "\\:" + // followed by a colon
                "\\/\\/" + // followed by 2 slashes
                "[a-z\\d.-]+" + // followed by groups of letters, numbers, periods and/or dashes
                "(\\:\\d+)?" + // potentially followed by a colon and numbers (portnr.)
                "(\\/[0-9a-z%_.~+=-]*)+" + // followed by a slash, numbers, letters and potentially other characters
                "(\\?.*)?" + // potentially followed by a question mark and anything else
                "$",
            "i"
        ); // end

        this.validUrl = !!urlPattern.test(urlString);
    }
}
