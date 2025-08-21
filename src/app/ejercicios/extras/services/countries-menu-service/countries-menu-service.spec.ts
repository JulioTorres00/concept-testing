import { TestBed } from '@angular/core/testing';

import { CountriesMenuService } from './countries-menu-service';
import { provideHttpClient } from '@angular/common/http';

describe('CountriesMenuService', () => {
  let service: CountriesMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CountriesMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
