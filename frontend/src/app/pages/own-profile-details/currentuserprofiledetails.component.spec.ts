import { ComponentFixture, TestBed } from "@angular/core/testing";
import { OwnprofiledetailsComponent } from "../own-profile/ownprofile.component";

describe("OwnprofiledetailsComponent", () => {
    let component: OwnprofiledetailsComponent;
    let fixture: ComponentFixture<OwnprofiledetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OwnprofiledetailsComponent],
        });
        fixture = TestBed.createComponent(OwnprofiledetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
