import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesMenuReactive } from './countries-menu-reactive';

describe('CountriesMenuReactive', () => {
  let component: CountriesMenuReactive;
  let fixture: ComponentFixture<CountriesMenuReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesMenuReactive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesMenuReactive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
