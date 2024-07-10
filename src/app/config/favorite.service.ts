import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoritesDialogService } from './favorites-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'http://localhost:8080/api';
  private header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  favorites: any = new BehaviorSubject<any>({
    movie: [],
    show: [],
    actor: [],
  });
  favorite$ = this.favorites.asObservable();
  
  constructor(
    private http: HttpClient,
    private favoritesDialogService: FavoritesDialogService
  ) {}
  
  toggleFavorite(type: string, itemId: string): any {
    let matches: RegExpMatchArray | null;
    const userId = localStorage.getItem('user_id');
    const isFavorite = this.isFavorite(type, itemId);

    if (type === 'actor') {
      matches = itemId.match(/\/name\/([^/]+)/);
    } else {
      matches = itemId.match(/\/title\/([^/]+)/);
    }

    if (matches && matches.length >= 2) {
      itemId = matches[1];
    }

    const data = {
      user_id: userId,
      type: type,
      item_id: itemId
    }

    if (isFavorite) {
      // Remove item from favorites
      this.http.post<any>(`${this.baseUrl}/users/removeFavorite`, data, {headers: this.header}).subscribe(response => {
        this.fetchFavorites();
      });
    } else {
      // Add item to favorites
      this.http.post(`${this.baseUrl}/users/addFavorite`, data, {headers: this.header}).subscribe(response => {
        this.fetchFavorites();
      });
    }
  }

  fetchFavorites(): void {
    const userId = localStorage.getItem('user_id');
    this.http.get<any[]>(`${this.baseUrl}/users/getFavorites/${userId}`).subscribe((data) => {
      this.favorites.next(data);
      localStorage.setItem('favorites', JSON.stringify(data));
    });
  }

  getStoredFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : null;
  }

  isFavorite(type: string, itemId: string): any {
    // Check if an item is in favorites
    let matches: RegExpMatchArray | null;
    if (type === 'actor') {
      matches = itemId.match(/\/name\/([^/]+)/);
    } else {
      matches = itemId.match(/\/title\/([^/]+)/);
    }

    if (matches && matches.length >= 2) {
      itemId = matches[1];
    }

    if (localStorage.getItem('favorites')) {
      const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '{}');
      const isFavorite = Object.keys(currentFavorites).some((key) => {
        if (Array.isArray(currentFavorites[key])) {
          return currentFavorites[key].some((item: any) => item[type + '_id'] === itemId);
        }
        return false;
      });

      return isFavorite;
    }
  }
}