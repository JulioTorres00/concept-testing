import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedMenu } from './nested-menu';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('NestedMenu', () => {
  let component: NestedMenu;
  let fixture: ComponentFixture<NestedMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedMenu, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NestedMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const dataNoSubMenus = [
    {
      label: 'Home',
      color: 'blue',
      url: '/home',
      submenu: [],
    },
  ];

  const dataWithSubMenus = [
    {
      label: 'Contact',
      color: 'brown',
      url: '/contact',
      submenu: [
        { label: 'Support', color: 'black', url: '/support', submenu: [] },
        { label: 'Sales', color: 'yellow', url: '/sales', submenu: [] },
      ],
    },
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use inputs received to render only li when no subMenus found', () => {
    fixture.componentRef.setInput('submenuData', dataNoSubMenus);
    fixture.detectChanges();

    const dataItems = fixture.debugElement.queryAll(By.css('li'));
    expect(dataItems.length).toBe(1);
    expect(dataItems[0].nativeElement.textContent).toBe('Home');
  });

  it('should use input received to render submenu items with recursion if they exist', () => {
    fixture.componentRef.setInput('submenuData', dataWithSubMenus);
    fixture.detectChanges();

    const dataItems = fixture.debugElement.queryAll(By.css('li'));
    expect(dataItems[0].nativeElement.textContent).toContain('Contact');

    const subItems = dataItems[0].query(By.directive(NestedMenu));

    const subItemsData = subItems.queryAll(By.css('li'));

    expect(subItemsData.length).toBe(2);
    expect(
      subItemsData.map((item) => item.nativeElement.textContent.trim())
    ).toEqual(jasmine.arrayContaining(['Support', 'Sales']));
  });

  it('should render anchor tag if no subMenus are available', () => {
    fixture.componentRef.setInput('submenuData', dataNoSubMenus);
    fixture.detectChanges();

    const itemList = fixture.debugElement.query(By.css('li'));
    expect(itemList).toBeTruthy();

    const ahchor = fixture.debugElement.query(By.css('a'));
    expect(ahchor).toBeTruthy();
    expect(ahchor.nativeElement.textContent).toBe('Home');
  });

  it('should apply routerlink from the url property', () => {
    fixture.componentRef.setInput('submenuData', dataNoSubMenus);
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();

    const routing = anchor.nativeElement.getAttribute('href');
    expect(routing).toBe('/home');
  });

  it('should inherit color for the text from the color property', () => {
    fixture.componentRef.setInput('submenuData', dataNoSubMenus);
    fixture.detectChanges();

    const itemList = fixture.debugElement.query(By.css('li'));
    expect(itemList).toBeTruthy();
    expect(itemList.styles['color']).toBe('blue');
  });

  it('should render label from the label property', () => {
    fixture.componentRef.setInput('submenuData', dataNoSubMenus);
    fixture.detectChanges();

    const itemList = fixture.debugElement.query(By.css('li'));
    expect(itemList).toBeTruthy();
    expect(itemList.nativeElement.textContent).toBe(dataNoSubMenus[0].label);
  });
});
