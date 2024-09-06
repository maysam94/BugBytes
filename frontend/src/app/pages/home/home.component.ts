import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProjectItemInterface } from 'src/app/components/project-item/interface/projectItemInterface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public projects: ProjectItemInterface[] = [];
  public errorMessage = "";

  constructor(private projectService: ProjectService) {}

  /**
   * Uses the projectServices to get all the projects its used for handling errors
   */
  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (result: ProjectItemInterface[]) => {
        this.projects = result
      },
      error: (error: HttpErrorResponse) => {
        this.errorHandler(error)
      }
    })
  }

  /**
   * Checks what the status code is and handles based on that
   * @param: responseError Response error given from the backend
   */
  private errorHandler(responseError: HttpErrorResponse) {
    if(responseError.status == 400) {
      this.errorMessage = `An error has occurred, please try again later`;
    }
  }
}
