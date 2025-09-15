import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { delay, of, throwError } from 'rxjs';
import { StackblitzFilter } from './stackblitz-filter';
import { StackblitzFilterService } from '../extras/services/stackblitz-filter-service/stackblitz-filter-service';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('StackblitzFilter Component', () => {
  let component: StackblitzFilter;
  let fixture: ComponentFixture<StackblitzFilter>;
  let mockSearchService: jasmine.SpyObj<StackblitzFilterService>;

  // Setup runs before each test
  beforeEach(async () => {
    // Create a spy object for the service
    mockSearchService = jasmine.createSpyObj('StackblitzFilterService', [
      'search',
    ]);

    await TestBed.configureTestingModule({
      imports: [StackblitzFilter], // Standalone component import
      providers: [
        provideHttpClient(),
        { provide: StackblitzFilterService, useValue: mockSearchService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StackblitzFilter);
    component = fixture.componentInstance;
  });

  // 1. INITIALIZATION TESTS
  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty query', () => {
      expect(component.query()).toBe('');
    });

    it('should initialize with empty results', () => {
      expect(component.results()).toEqual([]);
    });
  });

  // 2. INPUT HANDLING TESTS
  describe('Input Handling', () => {
    it('should update query signal when user types', () => {
      const inputElement =
        fixture.debugElement.nativeElement.querySelector('input');

      // Simulate user typing
      inputElement.value = 'angular';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.query()).toBe('angular');
    });

    it('should handle empty input', () => {
      const inputElement =
        fixture.debugElement.nativeElement.querySelector('input');

      inputElement.value = '';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.query()).toBe('');
    });

    it('should handle special characters', () => {
      const inputElement =
        fixture.debugElement.nativeElement.querySelector('input');

      inputElement.value = '@#$%';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.query()).toBe('@#$%');
    });
  });

  // 3. DEBOUNCING TESTS
  describe('Debouncing Behavior', () => {
    beforeEach(fakeAsync(() => {
      mockSearchService.search.and.returnValue(of(['result1', 'result2']));
      fixture.detectChanges();
    }));

    it('should make API call after 3 seconds depending on Debounce', fakeAsync(() => {
      component.query.set('angular');
      fixture.detectChanges();
      tick(2999); // Just under 3 seconds

      expect(mockSearchService.search).not.toHaveBeenCalled();

      tick(1);
      expect(mockSearchService.search).toHaveBeenCalledWith('angular');
    }));

    it('should only make one call after rapid typing', fakeAsync(() => {
      ['a', 'an', 'ang', 'angu', 'angular'].forEach((value, index) => {
        component.query.set(value);
        fixture.detectChanges();
        tick(500); // User types every 500ms
      });

      tick(2500); // Wait for debounce

      // Should only call once with final value
      expect(mockSearchService.search).toHaveBeenCalledTimes(1);
      expect(mockSearchService.search).toHaveBeenCalledWith('angular');
    }));
  });

  // 4. SERVICE INTEGRATION TESTS
  describe('User Interaction - Integration Tests', () => {
    function triggerSearch(searchValue: string) {
      const field = fixture.debugElement.query(By.css('input')).nativeElement;
      field.value = searchValue;
      field.dispatchEvent(new Event('input'));
    }

    beforeEach(fakeAsync(() => {
      mockSearchService.search.and.callFake((query: string) => {
        switch (query) {
          case 'script':
            return of(['JavaScript', 'TypeScript']);
          case '    ':
            return of([]);
          case 'error':
            return throwError(() => new Error('API Error'));
          case 'fastObservable':
            return of(['secondValue']).pipe(delay(300));
          case 'slowObservable':
            return of(['firstValue']).pipe(delay(3000));
          default:
            return of([]);
        }
      });
      fixture.detectChanges();
    }));

    it('should handle successful API responses after Debounce', fakeAsync(() => {
      const mockResults = ['JavaScript', 'TypeScript'];

      const inputField = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputField.value = 'script';
      inputField.dispatchEvent(new Event('input'));

      expect(component.query()).toBe('script');
      fixture.detectChanges();
      tick(2999);
      expect(mockSearchService.search).not.toHaveBeenCalled();
      tick(1);

      expect(mockSearchService.search).toHaveBeenCalledWith('script');
      expect(component.results()).toEqual(mockResults);
    }));

    it('should handle API errors gracefully', fakeAsync(() => {
      const inputField = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputField.value = 'error';
      inputField.dispatchEvent(new Event('input'));

      expect(component.query()).toBe('error');
      fixture.detectChanges();
      tick(3000);

      // Component should still exist and not crash
      expect(component).toBeTruthy();
      // Results should remain unchanged (empty in this case)
      expect(component.results()).toEqual([]);
    }));

    it('should not call service for empty queries', fakeAsync(() => {
      const inputField = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputField.value = '   ';
      inputField.dispatchEvent(new Event('input'));

      expect(component.query()).toBe('   ');
      fixture.detectChanges();
      tick(3000);

      expect(mockSearchService.search).not.toHaveBeenCalled();
      expect(component.results()).toEqual([]);
    }));

    it('should not make a second request if value doesnt change', fakeAsync(() => {
      const inputField = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputField.value = 'script';
      inputField.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(3000);
      expect(mockSearchService.search).toHaveBeenCalledWith('script');

      inputField.value = 'script';
      inputField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick(3000);

      expect(mockSearchService.search).toHaveBeenCalledTimes(1);
    }));

    it('should render list if data has been found', fakeAsync(() => {
      component.results.set(['JavaScript', 'TypeScript']);
      fixture.detectChanges();

      const liList = fixture.debugElement.queryAll(By.css('li'));
      expect(liList.length).toBe(2);
      expect(liList[0].nativeElement.textContent).toBe('JavaScript');
      expect(liList[1].nativeElement.textContent).toBe('TypeScript');
    }));

    it('should not render list if data is empty', fakeAsync(() => {
      const inputField = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputField.value = 'empty';
      inputField.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('ul'))).not.toBeTruthy();
      tick(3000);

      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('ul'))).toBeFalsy();
    }));

    it('should cancel first request if second request has been made', fakeAsync(() => {
      triggerSearch('slowObservable');
      fixture.detectChanges();

      tick(3000);
      expect(component.results()).toEqual([]);

      triggerSearch('fastObservable');
      fixture.detectChanges();
      tick(3000);
      tick(300);

      expect(mockSearchService.search).toHaveBeenCalledTimes(2);
      expect(component.results()).toEqual(['secondValue']);
    }));
  });
});
