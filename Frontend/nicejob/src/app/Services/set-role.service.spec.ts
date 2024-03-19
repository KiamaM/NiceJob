import { TestBed } from '@angular/core/testing';

import { SetRoleService } from './set-role.service';

describe('SetRoleService', () => {
  let service: SetRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
