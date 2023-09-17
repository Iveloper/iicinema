import { FavoritesDialogService } from './favorites-dialog.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  // Set the headers for the POST request
  private header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  favorites: any = new BehaviorSubject<any>({
    movie: [],
    show: [],
    actor: [],
  });
  favorite$ = this.favorites.asObservable();

  constructor(
    private http: HttpClient,
    private favoritesDialogService: FavoritesDialogService
  ) { }

  login(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, user, {headers: this.header});
  }

  updateUserInfo(id: string, username: string, email: string, password: string): Observable<any> {
    const updatedInfo = { id, username, email, password };
    return this.http.post(`${this.apiUrl}/update`, updatedInfo, {headers: this.header});
  }

  handleLoginSuccess(response: any) {
    // Store user information in localStorage
    localStorage.setItem('user_id', response.id);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);

    this.userSubject.next({ id: response.id, username: response.username, email: response.email });
    this.fetchFavorites();
  }

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
      this.http.post<any>(`${this.apiUrl}/removeFavorite`, data, {headers: this.header}).subscribe(response => {
        this.fetchFavorites();
        this.favoritesDialogService.openDialog('Removed from favorites');
      });
    } else {
      // Add item to favorites
      this.http.post(`${this.apiUrl}/addFavorite`, data, {headers: this.header}).subscribe(response => {
        this.fetchFavorites();
        this.favoritesDialogService.openDialog('Added to favorites');
      });
    }
  }

  fetchFavorites(): void {
    const userId = localStorage.getItem('user_id');
    this.http.get<any[]>(`${this.apiUrl}/getFavorites/${userId}`).subscribe((data) => {
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

  logoutUser() {
    localStorage.clear();
    this.userSubject.next(null);
  }

  getUserInfoObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
