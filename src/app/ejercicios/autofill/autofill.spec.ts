import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Autofill } from './autofill';
import { isReactive } from '@angular/core/primitives/signals';

describe('Autofill', () => {
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
});
