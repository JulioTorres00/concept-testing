import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedMenu } from './nested-menu';

describe('NestedMenu', () => {
  let component: NestedMenu;
  let fixture: ComponentFixture<NestedMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
