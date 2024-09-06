import { TestBed } from '@angular/core/testing';

import { InviteStudentsService } from './invite-students.service';

describe('InviteStudentsService', () => {
  let service: InviteStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
