import { Component, input } from '@angular/core';
import { RatingToStarsPipe } from '../extras/pipes/rating-to-stars/rating-to-stars-pipe';

interface Product {
  name: string;
  content: string;
  rating: number;
}

@Component({
  selector: 'app-star-rating',
  imports: [RatingToStarsPipe],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
})
export class StarRating {
  public products: Product[] = [
    { name: 'Angular', content: 'Powerful front-end framework.', rating: 2.1 },
    { name: 'React', content: 'Library for building UIs.', rating: 7 },
    { name: 'Vue', content: 'Lightweight progressive UI.', rating: 3.7 },
    { name: 'Svelte', content: 'Compiler-based UI approach.', rating: -1 },
  ];

  public productsList = input<Product[]>(this.products);
}
