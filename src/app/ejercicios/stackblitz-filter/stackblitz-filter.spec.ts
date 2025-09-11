import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackblitzFilter } from './stackblitz-filter';

describe('StackblitzFilter', () => {
  let component: StackblitzFilter;
  let fixture: ComponentFixture<StackblitzFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackblitzFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackblitzFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
