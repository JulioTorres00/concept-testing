import { TestBed } from '@angular/core/testing';

import { StackblitzFilterService } from './stackblitz-filter-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StackblitzFilterService', () => {
  let service: StackblitzFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(StackblitzFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
