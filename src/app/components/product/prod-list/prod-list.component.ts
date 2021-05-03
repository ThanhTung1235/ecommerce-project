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
  activeCate = "_";
  products: any;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const default_cate = { 
      "image": "http://static.muahoantien.com/uploads/library/goi-y-sp.png", 
      "image_150": "http://static.muahoantien.com/uploads/library/goi-y-sp.png", 
      "image_full": "http://static.muahoantien.com/uploads/library/goi-y-sp.png", 
      "name": "Gợi ý", "status": 1, "uid": "_" 
    }
    this.categories.push(default_cate)  
    this.activeCate = this.categories[0].uid;
    this.getProductByCateId(this.activeCate);
  }

  getProdByCate(cateId): void{
    this.getProductByCateId(cateId);
  }

  getProductByCateId(cateId): void{
    cateId = cateId === '_' ? '': cateId;
    this.productService.getListProduct({category_id: cateId}).subscribe(res => {
      this.products = res.data.result;
    });
  }


}
