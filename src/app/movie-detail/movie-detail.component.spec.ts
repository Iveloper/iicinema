import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralService } from 'src/app/config/general.service';
import { Movie } from 'src/app/interfaces/movie';
import { Plot } from 'src/app/interfaces/plot';
import { Rating } from 'src/app/interfaces/rating';
import { MovieDetailComponent } from './movie-detail.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let generalService: GeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [GeneralService]
    });

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    generalService = TestBed.get(GeneralService);
  });

  it('#loadMovie() should populate movie variable', () => {
    const movie: Movie = {
      credits: ['Test Credit 1'],
      id: 'test id',
      image: {
        height: 1,
        id: 'test image id',
        url: 'test image url',
        width: 1
      },
      principals: [],
      runningTimeInMinutes: 1,
      title: 'test title',
      titleType: 'test titleType',
      year: 1997
    };

    const rating: Rating = {
      bottomRank: 0,
      canRate: false,
      id: 'test rating id',
      rating: 0,
      ratingCount: 0,
      ratingsHistograms: undefined,
      title: 'test Rating title',
      titleType: 'test rating title type',
      otherRanks: [],
      year: 0
    }

    const plot: Plot = {
      base: {
        id: 'test plotbase id',
        image: {
          height: 1,
          id: 'test image id',
          url: 'test image url',
          width: 1
        },
        title: 'test plotbase title',
        titleType: 'test plotbase titleType',
        year: 0
      },
      id: 'test plot id',
      plots: []
    }

    expect(component.movie.id)
      .withContext('undefined before ngOnInit')
      .toBe('');
    expect(component.movieRatings.id)
      .toBe('');
    expect(component.moviePlots.id)
      .toBe('')
    expect(component.movieGenres)
      .toBe([])

    component.ngOnInit();

    expect(component.movie)
      .withContext('after ngOnInit calls #loadMovie(), the variable should be of type Movie')
      .toBe(movie);
    expect(component.movieRatings)
      .withContext('movieRatings should be of type Rating')
      .toBe(rating);
    expect(component.moviePlots)
      .withContext('moviePlots should be of type Plot')
      .toBe(plot);
    expect(component.movieGenres)
      .withContext('movieGenres should be String[]')
      .toBe(['']);
  });
});
