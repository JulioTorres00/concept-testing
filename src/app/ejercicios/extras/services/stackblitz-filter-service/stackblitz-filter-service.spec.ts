import { TestBed } from '@angular/core/testing';

import { StackblitzFilterService } from './stackblitz-filter-service';

describe('StackblitzFilterService', () => {
  let service: StackblitzFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackblitzFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
