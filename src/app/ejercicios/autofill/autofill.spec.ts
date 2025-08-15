import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autofill } from './autofill';

describe('Autofill', () => {
  let component: Autofill;
  let fixture: ComponentFixture<Autofill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autofill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Autofill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
