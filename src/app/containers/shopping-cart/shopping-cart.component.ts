import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  data: any;
  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    const data = AppUtils.getDataFromCookies('_cart');
    this.data = JSON.parse(data);
  }

}
