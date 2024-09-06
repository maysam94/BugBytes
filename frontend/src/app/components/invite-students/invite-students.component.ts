import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InviteStudentsService } from 'src/app/services/invite-students.service';
import { InvitableStudent } from 'src/app/interfaces/user/userInterface';

@Component({
    selector: 'app-invite-students',
    templateUrl: './invite-students.component.html',
    styleUrls: ['./invite-students.component.css'],
})
export class InviteStudentsComponent {
    public allStudents: InvitableStudent[] = [];
    public searchedStudents: InvitableStudent[] = [];
    public selectedStudents: InvitableStudent[] = [];
    @Output() myEvent = new EventEmitter<InvitableStudent[]>();

    /**
     * Creates a new instance of this class
     * @param inviteStudentsService - The invite student service
     */
    public constructor(private inviteStudentsService: InviteStudentsService) {}

    /**
     * Calls getAllStudents() when component is first initialized
     */
    public ngOnInit() {
        this.getAllStudents();
    }

    /**
     * Gets all students from backend
     */
    private getAllStudents(): void {
        this.inviteStudentsService.getStudents().subscribe({
            next: (students) => {
                this.allStudents = students;
            },
        });
    }

    /**
     * Finds the student names that match the user input
     * @param inputEvent - The event object obtained from the DOM
     */
    public findStudents(inputEvent: Event): void {
        const inputValue = (inputEvent.target as HTMLInputElement).value;
        if (inputValue.length > 0) {
            this.searchedStudents = this.allStudents.filter((student) => this.filterStudents(student, inputValue));
            this.sortStudents();
        } else {
            this.searchedStudents = [];
        }
    }

    /**
     * Checks whether a student name starts with a user input string
     * @param student - The student that needs to be checked
     * @param inputValue - The user input to which the student should be compared
     * @returns whether the student name starts with the user input string
     */
    private filterStudents(student: InvitableStudent, inputValue: string): boolean {
        const firstName = student.firstName.toLowerCase();
        const lastName = student.lastName.toLowerCase();
        let studentName: string;
        if (student.prefixes === '' || student.prefixes === null) {
            studentName = `${firstName} ${lastName}`;
            student.prefixes = '';
        } else {
            studentName = `${firstName} ${student.prefixes?.toLowerCase()} ${lastName}`;
        }
        return studentName.startsWith(inputValue.toLowerCase());
    }

    /**
     * Sorts the student names in alphabetical order
     * First name first, last name second
     */
    private sortStudents(): void {
        this.searchedStudents.sort(function (studentA, studentB) {
            const firstNameA = studentA.firstName.toLowerCase();
            const firstNameB = studentB.firstName.toLowerCase();
            const lastNameA = studentA.lastName.toLowerCase();
            const lastNameB = studentB.lastName.toLowerCase();
            let result: number;
            if (firstNameA !== firstNameB) {
                result = firstNameA < firstNameB ? -1 : firstNameA > firstNameB ? 1 : 0;
            } else {
                result = lastNameA < lastNameB ? -1 : lastNameA > lastNameB ? 1 : 0;
            }
            return result;
        });
    }

    /**
     * Finds the right student id and adds it to selectedStudents
     * Emits selectedStudents to parent component
     * @param event - The event object obtained from the DOM
     */
    public onCheckChange(event: Event): void {
        const checkBoxId: number = +(event.target as HTMLInputElement).id;
        const AllStudentsIndex = this.allStudents.findIndex(student => student.userId === checkBoxId);
        const selectedStudentsIndex: number = this.selectedStudents.findIndex( student => student.userId === checkBoxId);
        if (selectedStudentsIndex === -1) {
            this.selectedStudents.push(this.allStudents[AllStudentsIndex]);
        } else {
            this.selectedStudents.splice(selectedStudentsIndex, 1);
        }
        this.myEvent.emit(this.selectedStudents);
    }
}
