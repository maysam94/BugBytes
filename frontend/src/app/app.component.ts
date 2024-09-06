import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './interfaces/user/userInterface';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    title = 'bug-bytes';
    constructor() {}
    userElements: User[] = [];
    public userProfile!: User;

    ngOnInit() {}

    hide = true;
}
