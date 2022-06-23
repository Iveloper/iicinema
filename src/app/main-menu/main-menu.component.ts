import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit {

  public currentRoutes: Routes = routes;
  public languageList: string[] = ['en', 'bg'];
  public chosenLanguage: string = 'bg';

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.addLangs(this.languageList);
    this.translate.setDefaultLang(this.chosenLanguage);
    this.translate.use(this.chosenLanguage?.match(/en|bg/) ? this.chosenLanguage : 'en')
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
