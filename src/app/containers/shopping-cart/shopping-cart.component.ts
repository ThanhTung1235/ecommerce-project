import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  data = [];
  totalAmount = 0;
  constructor() {
  }

  ngOnInit(): void {
    this.initData();
  }


  initData(): void {
    const data = AppUtils.getDataFromCookies('_cart');
    if (data) {
      this.data = JSON.parse(data);
      this.calculatorAmount();
    }
  }

  quantityChange(quantity, id): void {
    const product = this.data.find(x => x.product_id === id);
    if (quantity > 0) {
      if (product) {
        product.quantity = quantity;
        this.calculatorAmount();
      }
    } else{
      this.removeProduct(id);
    }
  }

  removeProduct(id): void{
    const productIndex =  this.data.findIndex(x => x.product_id === id);
    if (productIndex > -1) {
      this.data.splice(productIndex, 1);
      this.calculatorAmount();
    }
  }

  calculatorAmount(): void {
    this.totalAmount = this.data.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
    AppUtils.saveDataToCookies('_cart', JSON.stringify(this.data));
  }

}
