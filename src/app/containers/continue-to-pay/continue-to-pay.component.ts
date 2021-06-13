import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/app.utils';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-continue-to-pay',
  templateUrl: './continue-to-pay.component.html',
  styleUrls: ['./continue-to-pay.component.scss']
})
export class ContinueToPayComponent implements OnInit {
  totalAmount = 0;
  listProductOrder = [];
  customer_address: any;
  orderSuccess = false;
  codeOrder = '';

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.initData()
  }

  initData(): void {
    const data = AppUtils.getDataFromCookies('_cart');
    if (data) {
      this.listProductOrder = JSON.parse(data);
      this.calculatorAmount();
    }
  }

  calculatorAmount(): void {
    this.totalAmount = this.listProductOrder.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }

  dataAddress(data){
    this.customer_address = {...data};
  }

  createOrder() {
    this.orderService.sendData({getInfoAddress: true})
    if (this.customer_address) {
      console.log(this.customer_address);
      const data = {
        ship_money: 5000,
        note : '',
      }
      const address = `${this.customer_address.address} - ${this.customer_address.ward} - ${this.customer_address.district} - ${this.customer_address.city}`;

      const order = new Order(this.totalAmount, data.ship_money, this.totalAmount, data.note, address, this.listProductOrder);
      this.orderService.createOrder(order).subscribe(res => {
        if (res.status_code == 200) {
          this.orderSuccess = true;
          AppUtils.clearCookies('_cart');
          this.initData();
          this.codeOrder = res.data;
        }
      })
    }
    
  }

}
