import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRating } from './star-rating';
import { By } from '@angular/platform-browser';

describe('StarRating', () => {
  let component: StarRating;
  let fixture: ComponentFixture<StarRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRating],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  interface Product {
    name: string;
    content: string;
    rating: number;
  }

  const fakeProducts: Product[] = [
    { name: 'Angular', content: 'Powerful front-end framework.', rating: 3.7 },
  ];

  function setProductsInput(products: Product[]) {
    fixture.componentRef.setInput('productsList', products);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a all the products received in the components input', () => {
    setProductsInput(fakeProducts);

    const products = fixture.debugElement.queryAll(By.css('.products'));
    expect(products).toBeTruthy();
    expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it('should render content binded from the input', () => {
    setProductsInput(fakeProducts);

    const content = fixture.debugElement.queryAll(By.css('#content'));
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThanOrEqual(1);
  });

  it('should render product name binded from the input', () => {
    setProductsInput(fakeProducts);

    const ratings = fixture.debugElement.queryAll(By.css('#ratings'));
    expect(ratings).toBeTruthy();
    expect(ratings.length).toBeGreaterThanOrEqual(1);
  });

  it('should render rating transformed by ratingToStars pipe to show a string of stars', () => {
    setProductsInput(fakeProducts);

    const ratings = fixture.debugElement.query(By.css('#ratings'));
    const transformedRatings = ratings.query(By.css('#rating')).nativeElement;
    expect(transformedRatings.textContent.trim()).toBe('★★★★☆');
  });
});
