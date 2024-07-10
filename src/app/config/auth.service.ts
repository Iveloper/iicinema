import { FavoritesDialogService } from './favorites-dialog.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FavoriteService } from './favorite.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  

  constructor(
    private http: HttpClient,
    private favoritesDialogService: FavoritesDialogService,
    public favoriteService: FavoriteService
  ) { }

  login(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post<any>(`${this.apiUrl}/users/login`, user, {headers: this.header});
  }

  updateUserInfo(id: string, username: string, email: string, password: string): Observable<any> {
    const updatedInfo = { id, username, email, password };
    return this.http.post(`${this.apiUrl}/users/update`, updatedInfo, {headers: this.header});
  }

  getUnapprovedUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/getUnapproved`);
  }

  getAllUsersAndAuthors(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/getAllUsersAndAuthors`);
  }

  fetchRoles(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/roles`);
  }

  changeUserRole(userId: number, roleId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/changeRole/${userId}`, { role_id: roleId }, {headers: this.header});
  }

  submitReview(reviewData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reviews/submit`, reviewData, {headers: this.header});
  }

  updateReview(id: string, reviewData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reviews/update/${id}`, reviewData, {headers: this.header});
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reviews/delete/${reviewId}`);
  }

  loadProductionReviews(productionId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${productionId}`);
  }

  handleLoginSuccess(response: any) {
    // Store user information in localStorage
    localStorage.setItem('user_id', response.id);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    localStorage.setItem('role_id', response.role_id);

    this.userSubject.next({ id: response.id, username: response.username, email: response.email, role: response.role_id });
    this.favoriteService.fetchFavorites();
  }

  logoutUser() {
    localStorage.clear();
    this.userSubject.next(null);
  }

  getUserInfoObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  approveUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/approve/${userId}`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/delete/${userId}`);
  }
}
