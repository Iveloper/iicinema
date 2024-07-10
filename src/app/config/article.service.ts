import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:8080/api';
  private header = new HttpHeaders().set('Accept', 'application/json');
  
  constructor(private http: HttpClient) {}

  createArticle(articleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/articles/submit`, articleData, {headers: this.header});
  }

  fetchAllArticles(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles`, {
      params: {
        page: pageIndex.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/articles/${id}`);
  }

  updateArticle(id: string, articleData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/articles/update/${id}`, articleData, {headers: this.header});
  }

  deleteArticle(articleId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/articles/delete/${articleId}`);
  }

  deleteArticleImage(imageId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/articles/images/delete/${imageId}`);
  }
}