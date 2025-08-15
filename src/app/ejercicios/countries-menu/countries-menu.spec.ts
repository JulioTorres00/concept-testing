import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesMenu } from './countries-menu';

describe('CountriesMenu', () => {
  let component: CountriesMenu;
  let fixture: ComponentFixture<CountriesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
