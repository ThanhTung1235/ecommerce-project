import { AppUtils } from './../../utils/app.utils';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  isToggleFilter = false;
  sub: Subscription;
  queryCate: any;
  productList: any;
  keyword: any;
  totalProd: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.detectUrl();
  }

  detectUrl(): void{
    this.queryCate = this.route.snapshot.paramMap.get('query_cate');
    this.sub = this.route.queryParams.subscribe(params => {
      this.queryCate = params.query_cate;
    });
    // this.productService.getListProduct({category_id: this});
    if (this.queryCate) {
      const cateId = AppUtils.getNameAndIdOfURL(this.queryCate);
      this.getProductOfCate(cateId.id);
      this.keyword = cateId.name;
    }
  }

  getProductOfCate(cateId): void{
    this.productService.getListProduct({category_id: cateId}).subscribe(res => {
      if (res.status_code === 200) {
        this.productList = res.data.result;
        this.totalProd = res.data.total;
      }
    });
  }

  showFilter(): void {
    if (this.isToggleFilter) {
      this.isToggleFilter = false;
    } else {
      this.isToggleFilter = true;
    }
  }

}
