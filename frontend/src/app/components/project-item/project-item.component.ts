import { Component, Input } from '@angular/core';
import { ProjectItemInterface } from './interface/projectItemInterface';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {
  @Input() title!: ProjectItemInterface["title"];
  @Input() description!: ProjectItemInterface["description"];
  @Input() sdgs!: ProjectItemInterface["sdgs"];

  /**
   * Returns the amount of sdgs inside of the sdgsObject
   * @param sdgsObject all the sdgs associated
   * @returns
   */
  returnTotalSdgs(sdgsObject: ProjectItemInterface["sdgs"]): number {
    const totalSdgs = Object.keys(sdgsObject).length;
    return totalSdgs;
  }

  /**
   * Makes the labels visible / hidden based on their style.overflow value and changes the target textcontent
   * @param sectionParent : The given parent
   * @param event : An event object from the DOM
   */
  showLabels(sectionParent: HTMLElement, event: Event) {
    if(sectionParent.style.overflow == "hidden") {
      sectionParent.style.overflow = "visible";
      sectionParent.style.maxHeight = "none";
      (event.target as HTMLButtonElement).textContent = "Show less";
    } else {
      sectionParent.style.overflow = "hidden";
      sectionParent.style.maxHeight = "100px";
      (event.target as HTMLButtonElement).textContent = "Show more";
    }
  }
}
