import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegmentGroup } from '@angular/router';
import { GeneralService } from 'src/app/config/general.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {
  public searchForm = new FormGroup({
    search: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
  });
  public isInputPopulated: boolean = false;
  public currentRoute: string = '';

  constructor(
    private generalService: GeneralService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteSearchInput() {
    this.searchForm.setValue({
      search: ''
    });
    this.isInputPopulated = false;
  }

  getTitlesBySearch() {
    this.generalService.title$.next(this.searchForm.get('search')?.value);
    
    /*Check if current route is a details page. 
    If so we will redirect to the parent route, 
    listing items with currently searched query. */
    const group: UrlSegmentGroup = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET];
    if (group) {
      this.router.navigate([`/${group.segments[0].path}`])
    }
  }

}
