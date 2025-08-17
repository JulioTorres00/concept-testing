import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingToStars',
})
export class RatingToStarsPipe implements PipeTransform {
  transform(rating: number, maxRating: number): string {
    let newRating = '';
    const emptyStar = '☆';
    const fullStar = '★';

    for (let i = 1; i <= maxRating; ++i) {
      if (i <= Math.round(rating)) {
        newRating += fullStar;
      } else {
        newRating += emptyStar;
      }
    }

    return newRating;
  }
}
