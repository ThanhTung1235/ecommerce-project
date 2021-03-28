import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.scss']
})
export class ProdListComponent implements OnInit {
  categories = [];
  activeCate = 1;
  products: any;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.getListCategory({}).subscribe(res => {
      this.categories = res.data.result;
      this.activeCate = this.categories[0].uid;
      this.getProductByCateId(this.activeCate);
    });
  }

  getProdByCate(cateId): void{
    // this.getProductByCateId(cateId);
  }

  getProductByCateId(cateId): void{
    this.productService.getListProduct({category_id: cateId}).subscribe(res => {
      this.products = res.data;
    });
  }


}
