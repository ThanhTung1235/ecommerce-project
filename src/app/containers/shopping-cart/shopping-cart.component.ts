import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Order} from 'src/app/models/order';
import { AddressService } from 'src/app/services/address.service';
import {OrderService} from 'src/app/services/order.service';
import {AppUtils} from 'src/app/utils/app.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  data = [];
  totalAmount = 0;
  orderSuccess = false;
  showError = false;
  userAddress: any;
  userInfo: any;

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initData();
    if (this.getUserInfo()) {
      this.getUserAddress(); 
    }
    
  }

  initData(): void {
    const data = AppUtils.getDataFromCookies('_cart');
    if (data) {
      this.data = JSON.parse(data);
      this.calculatorAmount();
    }
    const product_attached = [];
    this.data.forEach(item => {
      if (item.product_attached) {
        product_attached.push({data: item.product_attached, quantity: item.quantity, product_parent: item.product_option_id});
      }
    })
    const gifts = [...new Set(product_attached)];
    gifts.forEach(item => {
      if (item['data'].name) {
        let gift = this.data.find(x => x.product_id == item.data['uid'])
        if (!gift) {          
          this.data.push({
            product_option_id: item.data['uid'],
            product_name: item.data['name'],
            price: 0,
            quantity: item.quantity,
            size: '',
            gift: true,
            product_parent: item.product_parent
          });
        }
      }
    })
  }

  getUserInfo(){
    let user_parser = AppUtils.getDataFromCookies('re_tk');
    if (user_parser) {
      this.userInfo = AppUtils.parseJwt(user_parser)['identity'];
      return true;
    }else {
      return false
    }
  }

  quantityChange(quantity, id): void {
    const product = this.data.find((x) => x.product_option_id === id);
    const product_attached = this.data.find((x) => x.product_parent === id);
    if (quantity > 0) {
      if (product) {
        product.quantity = quantity;
        this.calculatorAmount();
      }
      if (product_attached) {
        product_attached.quantity = quantity;
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

  getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
  }

  createOrder(): void {
    console.log(this.userAddress.address);
    if (this.userAddress.address) {
      const data = {
        ship_money: 5000,
        note: '',
        address: this.userAddress.address,
        referral: this.getCookie('referral')
      };
      const productDetail = this.data.map((item) => {
        return {
          product_id: item.product_option_id,
          price: item.price,
          quantity: item.quantity,
          product_name: item.product_name,
          size: item.size,
          image: item.image,
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
      console.log(order);
      this.orderService.createOrder(order).subscribe(res => {
        if (res.status_code === 200) {
          this.orderSuccess = true;
          AppUtils.clearCookies('_cart');
          this.initData();
        } else {
          console.error(res.message);
        }
      });
    } else {
      this.showError = true;
    }
  }

  continueOrder() {
    this.router.navigate(['/thong-tin-van-chuyen']);
  }

  getUserAddress() {
    this.addressService.getUserAddress().subscribe(res => {
      if (res.status_code == 200) {
        const list_user_address = res.data.result;
        this.userAddress =list_user_address.find(x => x.status == 1);
      }
    })
  }
}
