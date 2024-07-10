import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../config/article.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less']
})
export class ArticlesComponent implements OnInit {
  
  public articles!: any[];
  public roleId: string | null = '';
  public totalArticles: number = 0;
  public paginatedArticles!: any[];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.roleId = localStorage.getItem('role_id');
    this.fetchArticles();
  }

  fetchArticles(pageIndex: number = 0, pageSize: number = 4): void {
    this.articleService.fetchAllArticles(pageIndex, pageSize).subscribe((data: any) => {
      this.articles = data.articles;
      this.totalArticles = data.total;
      this.paginatedArticles = this.articles.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    });
  }

  onPageChange(event: PageEvent): void {
    this.fetchArticles(event.pageIndex, event.pageSize);
  }

  public readMore(id: number): void {
    this.router.navigate(['/articles', id]);
  }

  public addArticle(): void {
    this.router.navigate(['/article/create']);
  }
}