import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/config/general.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {
  public search: string = "";
  public isInputPopulated: boolean = false;
  public isValueLengthEnough: boolean = false;
  public currentRoute: string = '';

  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
  }

  onSearchChange(value: string) {
    if(value.length) {
      this.isInputPopulated = true;
      if(value.length > 2) {
        this.isValueLengthEnough = true;
      } else {
        this.isValueLengthEnough = false
      }
    } else {
      this.isInputPopulated = false;
    }
  }

  deleteSearchInput() {
    this.search = "";
    this.isInputPopulated = false;
    this.isValueLengthEnough = false;
  }

  getTitlesBySearch(title: string) {
    this.generalService.title$.next(title);
  }

}
