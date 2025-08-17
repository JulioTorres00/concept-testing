import { RatingToStarsPipe } from './rating-to-stars-pipe';

describe('RatingToStarsPipe', () => {
  let pipe: RatingToStarsPipe;

  beforeEach(() => {
    pipe = new RatingToStarsPipe();
  });

  it('create an instance', () => {
    const pipe = new RatingToStarsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform a rating number to a string with stars, filled and unfilled', () => {
    expect(pipe.transform(3, 5)).toBe('★★★☆☆');
  });

  it('should should round up a rating >= .5 to the nearest integer', () => {
    expect(pipe.transform(3.5, 5)).toBe('★★★★☆');
  });

  it('should should round down a rating < .5 to the closest integer', () => {
    expect(pipe.transform(3.3, 5)).toBe('★★★☆☆');
  });

  it('should have a string with only filled stars if rating >= maxRating', () => {
    expect(pipe.transform(6, 5)).toBe('★★★★★');
  });

  it('should have a string with only unfilled stars if rating <= 0', () => {
    expect(pipe.transform(-1, 5)).toBe('☆☆☆☆☆');
  });
});
