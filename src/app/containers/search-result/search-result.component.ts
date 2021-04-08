import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  isToggleFilter = false;

  constructor() { }

  ngOnInit(): void {
  }

  showFilter(): void {
    if (this.isToggleFilter) {
      this.isToggleFilter = false;
    } else {
      this.isToggleFilter = true;
    }
  }

}
