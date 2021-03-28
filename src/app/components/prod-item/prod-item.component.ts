import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-prod-item',
  templateUrl: './prod-item.component.html',
  styleUrls: ['./prod-item.component.scss']
})
export class ProdItemComponent implements OnInit, OnChanges {
  @Input() searchResult: boolean;
  currentRate = 6;
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  listProduct = [];
  totalProduct = 0;
  loading = false;

  constructor(
    config: NgbRatingConfig,
    private productService: ProductService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loading = true;
    this.productService.getListProduct({}).subscribe(response => {
      if (response.status_code === 200) {
        this.listProduct = response.data.result;
        this.totalProduct = response.data.total;
      }
    });
  }
}
