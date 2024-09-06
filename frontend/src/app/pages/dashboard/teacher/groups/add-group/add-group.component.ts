import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { students } from '../fakeStudents';
import { GroupInterface, StudentInterface } from '../interfaces/groupInterfaces';
import { GroupService } from 'src/app/services/group/group.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  fakeStudents = students;

  searchedStudents!: StudentInterface[];
  searchBar = '';
  selectedStudents: number[] = [];

  formCheck = new FormControl('');
  addGroup!: FormGroup;

  popUpMessage!: string;

  constructor(private groupservice: GroupService) {}

  public ngOnInit(): void {
    this.addGroup = new FormGroup({
      "groupname": new FormControl(null, Validators.required),
      "students": new FormControl(false, Validators.required)
    });
  }

  /**
   * Updates the searchbar input to that of the DOM and gives the searchedstudents a value
   * @param event
   */
  protected onSearchbarUpdate(event: Event): void {
    this.searchBar = (event.target as HTMLInputElement).value;
    this.searchedStudents = this.returnFilteredStudents(this.searchBar);
  }

    /**
   * Filters the fakeStudents array depending on the searchValue
   * @param searchValue: The search value
   */
  private returnFilteredStudents(searchValue: string): StudentInterface[] {
    const filteredStudents = (this.fakeStudents.filter((student) => student.studentFirstName.includes(searchValue)));
    return filteredStudents;
  }

  /**
   * It checks the index of the selectedStudents based of the event target value
   */
  protected onCheckChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const index = this.selectedStudents.indexOf(Number(target.value));

    if(target.checked && index === -1) {
      this.selectedStudents.push(Number(target.value));
    } else if(index !== -1){
      this.selectedStudents.splice(index, 1);
    }
  }

  /**
   * Returns the first / last name of the user
   * @param id: id of the selected student
   * @returns the firstname and last name
   */
  protected returnSelectedStudentFullName(id: number): string {
    const selectedStudent = this.fakeStudents.find(student => student.studentID === +id);
    return `${selectedStudent?.studentFirstName} ${selectedStudent?.studentLastName}`;
  }

  /**
   * Checks if the student is included inside of the selectedStudents array
   * @param studentID ID of the student
   * @returns true / false based on if it has been selected
   */
  protected checkStudents(studentID: number): boolean {
    let isSelected: boolean;
    if(this.selectedStudents.includes(studentID)) {
      isSelected = true;
    } else {
      isSelected = false;
    }

    return isSelected;
  }

  /**
   * Submits the form to the service
   */
  protected onSubmit(): void {
    if(this.addGroup.controls['groupname'].valid &&
    this.selectedStudents.length !== 0) {
      const groupObject: GroupInterface = {
        teacherId: 1,
        groupName: this.addGroup.controls['groupname'].value,
        students: this.selectedStudents
      }
      this.createGroup(groupObject);
    } else {
      this.popUpMessage = `Please fill out all required fields.`;
    }
  }

  /**
   * Uses the createGroup method from the groupservice
   * @param groupObject
   */
  private createGroup(groupObject: GroupInterface): void {
    this.groupservice.createGroup(groupObject).subscribe({
      error: (error: HttpErrorResponse) => {
        this.errorHandler(error);
      },
      complete: () => {
        this.popUpMessage = `${this.addGroup.controls['groupname'].value} has been created`;
      }
    });
  }

  /**
   * Handles the response error situations
   * @param error The http response error
   */
  private errorHandler(error: HttpErrorResponse) {
    if(error.status === 409) {
      this.popUpMessage = `"${this.addGroup.controls['groupname'].value}" already exists`;
    } else if(error.status === 500) {
      this.popUpMessage = `Something went wrong. Please try again later.`;
    } else if(error.status === 422) {
      this.popUpMessage = `Please fill out all required fields.`;
    }
  }
}
