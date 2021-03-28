import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-hight-lights',
  templateUrl: './hight-lights.component.html',
  styleUrls: ['./hight-lights.component.scss']
})
export class HightLightsComponent {
  listCategory: [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getListCategory({}).subscribe(response => {
      if (response.status_code === 200){
        this.listCategory = response.data.result;
      }
    });
  }

  // ngOnInit() {
  // }

}
