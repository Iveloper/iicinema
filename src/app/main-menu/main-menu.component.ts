import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit {

  public currentRoutes: Routes = routes;
  constructor() { }

  ngOnInit(): void {
  }

}
