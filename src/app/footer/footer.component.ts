import { Component, Input, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  @Input() projectName!: string;
  public currentRoutes: Routes = routes;
  constructor() { }

  ngOnInit(): void {
  }

}
