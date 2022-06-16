import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit {
  @Input() elements: any[] = [];
  @Input() type?: string = '';

  public ascending: boolean = false;
  public yearOrder: boolean = false;
  public abcOrder: boolean = false;
  public runTimeOrder: boolean = false;
  public nameOrder: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  filterElements(property: string) {
    this.yearOrder = false;
    this.abcOrder = false;
    this.runTimeOrder = false;

    switch (property) {
      case 'year': {
        this.yearOrder = true;
        this.ascending = !this.ascending;
        break;
      }
      case 'title': {
        this.abcOrder = true;
        this.ascending = !this.ascending;
        break;
      }
      case 'runningTimeInMinutes': {
        this.runTimeOrder = true;
        this.ascending = !this.ascending;
        break;
      }
      default: {
        this.nameOrder = true;
        this.ascending = !this.ascending
        break;
      }
    }

    if (this.ascending) {
      this.elements.sort((a: any, b: any) => a[property] > b[property] ? 1 : -1);
    } else {
      this.elements.sort((a: any, b: any) => a[property] < b[property] ? 1 : -1);
    }
  }

}
