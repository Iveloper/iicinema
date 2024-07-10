import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/api';
  private header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient) {}
  
  loadComments(articleId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/comments/${articleId}`);
  }

  submitComment(commentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/comments/submit`, commentData, {headers: this.header});
  }

  updateComment(id: string, commentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/comments/update/${id}`, commentData, {headers: this.header});
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/comments/delete/${commentId}`);
  }
}