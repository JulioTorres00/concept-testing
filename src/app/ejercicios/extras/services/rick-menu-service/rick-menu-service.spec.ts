import { TestBed } from '@angular/core/testing';

import { RickService } from './rick-menu-service';

describe('RickMenuService', () => {
  let service: RickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
