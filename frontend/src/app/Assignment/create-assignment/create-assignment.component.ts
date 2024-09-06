import { Component, OnInit } from '@angular/core';
import { Assignment } from '../interface-create-assignment';
import { assingImageUrls } from './assginment-url-imges';
import { Location } from '@angular/common';
import { AssignmentService } from '../../../../services/assginment.service';
import { Router, Routes } from '@angular/router';


import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css'],
})
export class CreateAssignmentComponent implements OnInit {
  [x: string]: any;
  constructor(private fb: FormBuilder, private assignmentService: AssignmentService, private router: Router) {}
  createAssignment!: FormGroup;
  assignment: Assignment = {
    title: '',
    description: '',
    imageUrls: [],
  };
  private assignmentTitle: string = '';
  private assignmentDescription: string = '';
  public assignmentImageUrls: string[] = [];

  public validTitle: boolean = true;
  public validDescription: boolean = true;
  public validUrl: boolean = true;
  public maxImageAmount: boolean = false;



  public onUpdateTitle(event: Event) {
    this.assignmentTitle = (event.target as HTMLInputElement).value;
    if (
      this.assignmentTitle.length >= 5 &&
      this.assignmentTitle.length <= 125
    ) {
      this.validTitle = true;
    }
  }

  public onUpdateDescription(event: Event) {
    this.assignmentDescription = (event.target as HTMLTextAreaElement).value;
    if (
      this.assignmentDescription.length >= 10 &&
      this.assignmentDescription.length <= 5000
    ) {
      this.validDescription = true;
    }
  }

  public onUpdateImageUrl() {
    this.validUrl = true;
  }

  public onSubmitImageUrl(imageForm: any, imageUrlObject: any) {
    this.checkUrlValidity(imageUrlObject.imageUrl);
    if (this.validUrl) {
      if (this.assignmentImageUrls.length < 5) {
        this.assignmentImageUrls.push(imageUrlObject.imageUrl);
        imageForm.reset();
      } else {
        this.maxImageAmount = true;
      }
    }
  }
  public onRemoveImage(imageIndex: number) {
    this.assignmentImageUrls.splice(imageIndex, 1);
    this.maxImageAmount = false;
  }
  private checkUrlValidity(urlString: string) {
    var urlPattern = new RegExp(
      '^' + // begin
        '[a-z]{2,5}' + // 2 to 5 letters
        '\\:' + // followed by a colon
        '\\/\\/' + // followed by 2 slashes
        '[a-z\\d.-]+' + // followed by groups of letters, numbers, periods and/or dashes
        '(\\:\\d+)?' + // potentially followed by a colon and numbers (portnr.)
        '(\\/[0-9a-z%_.~+=-]*)+' + // followed by a slash, numbers, letters and potentially other characters
        '(\\?.*)?' + // potentially followed by a question mark and anything else
        '$',
      'i'
    ); // end

    this.validUrl = !!urlPattern.test(urlString);
  }
  public createAssignmentOpject(){
    let newAssignment : Assignment ={
      title: this.assignmentTitle,
      description: this.assignmentDescription,
      imageUrls: this.assignmentImageUrls
    };
    console.log(newAssignment)
    this.assignmentService
                .createAssignment(newAssignment)
                .subscribe(() => this.router.navigate(['/']));


  
  }









  ngOnInit(): void {

  }
  
}

