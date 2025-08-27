import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickMenu } from './rick-menu';
import { RickService } from '../extras/services/rick-menu-service/rick-menu-service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RickMenu', () => {
  let component: RickMenu;
  let fixture: ComponentFixture<RickMenu>;

  let serviceSpy: jasmine.SpyObj<RickService>;

  const spyValues = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickMenu],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        jasmine.createSpyObj('RickService', ['getCharacters']),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RickMenu);
    component = fixture.componentInstance;

    serviceSpy = TestBed.inject(RickService) as jasmine.SpyObj<RickService>;
    serviceSpy.getCharacters.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for values when button is clicked', () => {
    serviceSpy.getCharacters.and.returnValue(of(spyValues));

    component.inputField.set('');
    component.selectField.set('');

    const input = fixture.debugElement.query(By.css('button')).nativeElement;
    input.click();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));

    expect(rows.length).toBe(2);
  });
});
