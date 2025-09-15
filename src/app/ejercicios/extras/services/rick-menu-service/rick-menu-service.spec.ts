import { TestBed } from '@angular/core/testing';

import { RickService } from './rick-menu-service';
import { provideHttpClient } from '@angular/common/http';

describe('RickMenuService', () => {
  let service: RickService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(RickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
