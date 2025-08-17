import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Autofill } from './autofill';
import { By } from '@angular/platform-browser';
import { findIndex } from 'rxjs';

describe('Autofill', () => {
  describe('Unit Tests', () => {
    let component: Autofill;

    beforeEach(() => {
      component = new Autofill();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should check if searchTerm has no value initially', () => {
      expect(component.searchTerm).toBe('');
    });

    it('should return an array with elements containing searchTerm', () => {
      component.searchTerm = 'D';

      expect(component.filteredItems).toEqual(
        jasmine.arrayContaining([
          'Django',
          'Docker',
          'Data Science',
          'Node',
          'Design',
        ])
      );
      expect(component.filteredItems.length).toBe(5);
    });

    it('should filter the same items with case-insensitive behavior', () => {
      component.searchTerm = 'D';
      const upperCaseArray = component.filteredItems;

      component.searchTerm = 'd';
      expect(component.filteredItems).toEqual(upperCaseArray);
    });

    it('should return an empty array if no match is found', () => {
      component.searchTerm = 'X';

      expect(component.filteredItems).toEqual([]);
    });

    it('should filter by searchTerm regardless of position', () => {
      component.searchTerm = 'ang';

      expect(component.filteredItems).toEqual(
        jasmine.arrayContaining(['Angular', 'Django'])
      );
      expect(component.filteredItems.length).toBe(2);
    });

    it('should update searchTerm when selecItem function is executed', () => {
      component.selectItem('Docker');

      expect(component.searchTerm).toBe('Docker');
      expect(component.filteredItems).toEqual(['Docker']);
    });

    it('should update searchTerm current value when selecItem function is executed', () => {
      component.searchTerm = 'ang';
      component.selectItem('Django');

      expect(component.filteredItems).toEqual(['Django']);
    });

    it('should ignore whitespaces when typing a searchTerm', () => {
      component.searchTerm = ' D ';

      expect(component.filteredItems.length).toBe(5);
    });

    it('should handle searching for items with space in between words', () => {
      component.searchTerm = 'a s';

      expect(component.filteredItems).toEqual(['Data Science']);
    });

    it('should handle searching for items by words after the first space', () => {
      component.searchTerm = 'science';

      expect(component.filteredItems).toEqual(['Data Science']);
    });

    it('should return an empty array when special characters are used', () => {
      component.searchTerm = '+-/';

      expect(component.filteredItems).toEqual([]);
    });

    it('should return an empty array when numbers are used', () => {
      component.searchTerm = '123';

      expect(component.filteredItems).toEqual([]);
    });
  });

  describe('Integration Tests', () => {
    let component: Autofill;
    let fixture: ComponentFixture<Autofill>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Autofill, FormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(Autofill);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    function searchInputValueSetter(term: string) {
      const searchInput = fixture.debugElement.query(
        By.css('#search')
      ).nativeElement;

      searchInput.value = term;
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    it('should update search input based on searchTerm', async () => {
      const searchInput = fixture.debugElement.query(
        By.css('#search')
      ).nativeElement;
      expect(searchInput.value).toBe('');
      expect(component.searchTerm).toBe('');

      component.searchTerm = 'Angular';
      fixture.detectChanges();

      await fixture.whenStable();

      expect(searchInput).toBeTruthy();
      expect(searchInput.type).toBe('text');
      expect(searchInput.placeholder).toBe('Escribe para buscar');
      expect(searchInput.value).toEqual(component.searchTerm);
    });

    it('should update searchTerm based on search input', () => {
      searchInputValueSetter('Angular');

      expect(component.searchTerm).toEqual('Angular');
    });

    it('should render ul based on search input', () => {
      let itemList = fixture.debugElement.query(By.css('ul'));
      expect(itemList).toBeNull();

      searchInputValueSetter('Angular');

      itemList = fixture.debugElement.query(By.css('ul'));
      expect(itemList).not.toBeNull();
    });

    it('should render li of filteredItems based on search input', () => {
      let itemList = fixture.debugElement.queryAll(By.css('li'));

      searchInputValueSetter('ang');

      itemList = fixture.debugElement.queryAll(By.css('li'));
      const filteredItemList = itemList.map((item) =>
        item.nativeElement.textContent.trim()
      );

      expect(filteredItemList).toEqual(
        jasmine.arrayContaining(['Angular', 'Django'])
      );
      expect(filteredItemList.length).toBe(2);
    });

    it('should update searchTerm when one of the filteredItems is clicked', async () => {
      searchInputValueSetter('ang');

      const item = fixture.debugElement.query(By.css('li')).nativeElement;
      expect(item).toBeTruthy();
      item.click();
      fixture.detectChanges();

      await fixture.whenStable();

      const searchInput = fixture.debugElement.query(
        By.css('#search')
      ).nativeElement;
      expect(searchInput.value).toBe(item.textContent.trim());
    });
  });
});

// En el Ul no usamos el nativeElement ya que al estar bajo un If el debugElement.query
// regresa un null, en los otros casos que no estan condicionados podemos usar nativeElement
// ya que el debugElement si existe y podemos accesar al elemento DOM nativo/real
