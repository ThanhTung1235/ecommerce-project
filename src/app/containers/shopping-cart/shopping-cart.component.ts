import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Order, ProductDetail } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  data = [];
  totalAmount = 0;
  constructor(private orderService: OrderService) {}

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
    const product = this.data.find((x) => x.product_option_id === id);
    if (quantity > 0) {
      if (product) {
        product.quantity = quantity;
        this.calculatorAmount();
      }
    }
  }

  removeProduct(id): void {
    const productIndex = this.data.findIndex((x) => x.product_option_id === id);
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

  createOrder(): void {
    const data = {
      ship_money: 5000,
      note: '',
      address: '97-99 Láng Hạ - Đống Đa- Hà Nội',
    };
    const productDetail = this.data.map((item) => {
      return {
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
        product_name: item.product_name,
        size: item.size
      };
    });
    const order = new Order(
      this.totalAmount,
      data.ship_money,
      this.totalAmount,
      data.note,
      data.address,
      productDetail
    );
    this.orderService.createOrder(order).subscribe(res => {
      console.log(res);
    });
  }
}
