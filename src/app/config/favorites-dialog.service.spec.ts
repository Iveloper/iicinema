import { TestBed } from '@angular/core/testing';

import { FavoritesDialogService } from './favorites-dialog.service';

describe('FavoritesDialogService', () => {
  let service: FavoritesDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
