import { CountriesMenuService } from './../extras/services/countries-menu-service/countries-menu-service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesMenu } from './countries-menu';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CountriesMenu', () => {
  describe('Unit Tests', () => {
    let component: CountriesMenu;
    let serviceSpy: jasmine.SpyObj<CountriesMenuService>;

    const spyValues = [
      {
        name: {
          common: 'Venezuela',
        },
        subregion: 'South America',
        flags: {
          png: '/venezuela-flag.png',
        },
      },
      {
        name: {
          common: 'Mexico',
        },
        subregion: 'North America',
        flags: {
          png: '/mexico-flag.png',
        },
      },
    ];

    function setInitialList() {
      serviceSpy.getCountriesList.and.returnValue(of(spyValues));
      component.ngOnInit();
    }

    beforeEach(async () => {
      serviceSpy = jasmine.createSpyObj<CountriesMenuService>(
        'CountriesMenuService',
        ['getCountriesList']
      );
      serviceSpy.getCountriesList.and.returnValue(of([]));

      component = new CountriesMenu(serviceSpy);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load list of countries from API on initialization', () => {
      serviceSpy.getCountriesList.and.returnValue(of(spyValues));

      expect(component.countriesList()).toEqual([]);
      expect(component.filteredCountriesList()).toEqual(
        component.countriesList()
      );
      component.ngOnInit();

      expect(serviceSpy.getCountriesList).toHaveBeenCalledTimes(1);
      expect(component.countriesList()).toEqual(spyValues);
      expect(component.filteredCountriesList()).toEqual(
        component.countriesList()
      );
    });

    it('should load empty list if call fails on initialization', () => {
      serviceSpy.getCountriesList.and.returnValue(
        throwError(() => new Error('error'))
      );

      expect(component.countriesList()).toEqual([]);
      expect(component.filteredCountriesList()).toEqual(
        component.countriesList()
      );
      component.ngOnInit();

      expect(component.countriesList()).toEqual([]);
      expect(component.filteredCountriesList()).toEqual(
        component.countriesList()
      );
    });

    it('should find 0 countries with numbers in the name when using input', () => {
      setInitialList();

      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesInput.set('123');

      expect(component.filteredCountriesList()).toEqual([]);
    });

    it('should find 0 countries with input when typing special characters', () => {
      setInitialList();

      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesInput.set('+-/');

      expect(component.filteredCountriesList()).toEqual([]);
    });

    it('should compute filtered list of countries based on user input', () => {
      setInitialList();

      expect(component.countriesInput()).toBe('');
      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesInput.set('Mexico');

      expect(
        component.filteredCountriesList().map((x) => x.name?.common)
      ).toEqual(['Mexico']);
    });

    it('should compute filtered list regardless of casing', () => {
      setInitialList();

      expect(component.countriesInput()).toBe('');
      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesInput.set('MEXICO');

      expect(
        component.filteredCountriesList().map((x) => x.name?.common)
      ).toEqual(['Mexico']);

      component.countriesInput.set('mexico');

      expect(
        component.filteredCountriesList().map((x) => x.name?.common)
      ).toEqual(['Mexico']);
    });

    it('should compute filtered list regardless of whitespaces', () => {
      setInitialList();

      expect(component.countriesInput()).toBe('');
      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesInput.set(' Mex ');

      expect(
        component.filteredCountriesList().map((x) => x.name?.common)
      ).toEqual(['Mexico']);
    });

    it('should compute filtered list of countries based on select value', () => {
      setInitialList();

      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesSelect.set('South America');

      expect(
        component.filteredCountriesList().map((z) => z.name?.common)
      ).toEqual(['Venezuela']);
    });

    it('should compute filtered list of countries based on input and select values', () => {
      setInitialList();

      expect(component.filteredCountriesList()).toEqual(spyValues);
      component.countriesSelect.set('South America');

      expect(
        component.filteredCountriesList().map((z) => z.name?.common)
      ).toEqual(['Venezuela']);

      component.countriesInput.set('Mexico');

      expect(component.filteredCountriesList()).toEqual([]);
    });
  });

  describe('Integration Tests', () => {
    let component: CountriesMenu;
    let fixture: ComponentFixture<CountriesMenu>;

    const mockData = [
      {
        name: {
          common: 'Venezuela',
        },
        subregion: 'South America',
        flags: {
          png: '/venezuela-flag.png',
        },
      },
      {
        name: {
          common: 'Mexico',
        },
        subregion: 'North America',
        flags: {
          png: '/mexico-flag.png',
        },
      },
    ];

    class MockCountriesService {
      getCountriesList() {
        return of(mockData);
      }
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CountriesMenu],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: CountriesMenuService, useClass: MockCountriesService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CountriesMenu);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render list of countries fetched from API', () => {
      const countriesContainer = fixture.debugElement.query(
        By.css('.countries-container')
      );
      expect(countriesContainer).toBeTruthy();

      const imgContainers = fixture.debugElement.queryAll(By.css('img'));
      const pContainers = fixture.debugElement.queryAll(By.css('p'));
      expect(imgContainers.length).toBeGreaterThan(0);
      expect(pContainers.length).toBeGreaterThan(0);
    });

    it('should render the img of the flag of the countries fetched', () => {
      const imgContainers = fixture.debugElement.queryAll(By.css('img'));
      expect(imgContainers.length).toEqual(mockData.length);

      const imgSrc = imgContainers.map((d) => d.nativeElement.src);
      const mockSrc = mockData.map((d) => window.location.origin + d.flags.png);

      expect(imgSrc).toEqual(mockSrc);
    });

    it('should render the name of the country for the countries ferched', () => {
      const nameContainer = fixture.debugElement.queryAll(By.css('p'));
      expect(nameContainer.length).toEqual(mockData.length);

      const namesArray = nameContainer.map((z) => z.nativeElement.textContent);
      const mockArray = mockData.map((z) => z.name.common);
      expect(namesArray).toEqual(mockArray);
    });

    it('should render filtered list on user input', () => {
      const imgContainers = fixture.debugElement.queryAll(By.css('img'));
      const nameContainers = fixture.debugElement.queryAll(By.css('p'));
      expect(imgContainers.length).toBe(2);
      expect(nameContainers.length).toBe(2);

      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = 'Mexico';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const newImgContainers = fixture.debugElement.queryAll(By.css('img'));
      const newNameContainers = fixture.debugElement.queryAll(By.css('p'));

      expect(newImgContainers.length).toBe(1);
      expect(newNameContainers.length).toBe(1);
    });

    it('should render empty state when input contains numbers', () => {
      const imageContainer = fixture.debugElement.queryAll(By.css('img'));
      const nameContainer = fixture.debugElement.queryAll(By.css('p'));
      expect(imageContainer.length).toBe(2);
      expect(nameContainer.length).toBe(2);

      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = '203';

      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const newImgContainer = fixture.debugElement.queryAll(By.css('img'));
      const newNameContainer = fixture.debugElement.queryAll(By.css('p'));
      expect(newImgContainer).toEqual([]);
      expect(newNameContainer).toEqual([]);
    });

    it('should render empty state when input contains special characters', () => {
      const imageContainer = fixture.debugElement.queryAll(By.css('img'));
      const nameContainer = fixture.debugElement.queryAll(By.css('p'));
      expect(imageContainer.length).toBe(2);
      expect(nameContainer.length).toBe(2);

      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = '+-(';

      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const newImgContainer = fixture.debugElement.queryAll(By.css('img'));
      const newNameContainer = fixture.debugElement.queryAll(By.css('p'));
      expect(newImgContainer).toEqual([]);
      expect(newNameContainer).toEqual([]);
    });

    it('should render list of options in the select tag', () => {
      const select = fixture.debugElement.query(By.css('select'));
      expect(select).toBeTruthy();

      const options = fixture.debugElement.queryAll(By.css('option'));
      const optionsValues = options.map((d) => d.nativeElement.value);

      expect(optionsValues).toEqual(
        jasmine.arrayContaining(['', 'North America', 'South America'])
      );
    });

    it('should change the value of select signal when user changes option selected', async () => {
      expect(component.countriesSelect()).toBe('');

      const select = fixture.debugElement.query(By.css('select'));
      expect(select).toBeTruthy();

      const optionsList = fixture.debugElement.queryAll(By.css('option'));
      expect(optionsList.length).toBeGreaterThanOrEqual(2);
      const optionClicked = optionsList[1].nativeElement;

      optionClicked.selected = true;
      select.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      await fixture.whenStable();

      expect(component.countriesSelect()).toEqual(optionClicked.value);
    });
  });
});
