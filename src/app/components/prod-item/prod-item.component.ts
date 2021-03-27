import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prod-item',
  templateUrl: './prod-item.component.html',
  styleUrls: ['./prod-item.component.scss']
})
export class ProdItemComponent implements OnInit {
  @Input() searchResult: boolean;
  currentRate = 6;
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }

}
