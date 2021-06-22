import { BaseService } from './../../services/base.service';
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
  userInfo: any;

  constructor(
    private orderService: OrderService,
    private baseService: BaseService) { }

  ngOnInit() {
    this.initData()
  }

  initData(): void {
    const data = AppUtils.getDataFromCookies('_product_payment');
    const userInfo = AppUtils.getDataFromCookies('re_tk');
    if (data) {
      this.listProductOrder = JSON.parse(data);
      this.calculatorAmount();
    }
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  calculatorAmount(): void {
    this.totalAmount = this.listProductOrder.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }

  dataAddress(data){
    this.customer_address = {...data};
    console.log(this.customer_address);
    
  }

  createOrder() {
    this.orderService.sendData({getInfoAddress: true})
    if (this.customer_address) {
      const address = `${this.customer_address.address} - ${this.customer_address.ward} - ${this.customer_address.district} - ${this.customer_address.city}`;

      const data = {
        ship_money: 5000,
        note: '',
        address: address,
        referral: AppUtils.getDataFromCookies('referral')
      };
      const productDetail = this.listProductOrder.map((item) => {
        return {
          product_id: item.product_option_id,
          price: item.price,
          quantity: item.quantity,
          product_name: item.product_name,
          size: item.size,
          image: item.image,
          product: item.product
        };
      });

      const order = new Order(this.totalAmount, data.ship_money, this.totalAmount, data.note, address, productDetail, this.customer_address.phone);
      this.orderService.createOrderNoAuth(order).subscribe(res => {
        if (res.status_code == 200) {
          this.orderSuccess = true;
          AppUtils.clearCookies('_cart');
          this.initData();
          this.codeOrder = res.data;
          this.baseService.sendData({createOrderSuccess: true})
        }
      })
    }
    
  }

}
