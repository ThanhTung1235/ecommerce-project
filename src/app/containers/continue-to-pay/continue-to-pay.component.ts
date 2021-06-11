import { CustomerAddress } from './../../models/address';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-continue-to-pay',
  templateUrl: './continue-to-pay.component.html',
  styleUrls: ['./continue-to-pay.component.scss']
})
export class ContinueToPayComponent implements OnInit {
  totalAmount = 0;
  listProductOrder = [];
  customer_address: any;

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
    }
    
  }

}
