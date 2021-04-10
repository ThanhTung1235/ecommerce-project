import { AppUtils } from 'src/app/utils/app.utils';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prod-item',
  templateUrl: './prod-item.component.html',
  styleUrls: ['./prod-item.component.scss']
})
export class ProdItemComponent implements OnInit, OnChanges {
  @Input() searchResult: boolean;
  @Input() products = [];
  currentRate = 6;
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  listProduct = [];
  totalProduct = 0;
  loading = false;

  constructor(
    config: NgbRatingConfig,
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    if (changes.products.currentValue) {
      this.products.map(data => {
        data.linkName = AppUtils.productNameInURL(data.name, data.uid);
      });
    }
  }
}
