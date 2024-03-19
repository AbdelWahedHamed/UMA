import { TestBed } from '@angular/core/testing';

import { AuthentationService } from './authentation.service';

describe('AuthentationService', () => {
  let service: AuthentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
