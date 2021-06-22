import { filter } from 'rxjs/operators';
import { BaseService } from './../../services/base.service';
import { ToastrService } from 'ngx-toastr';
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
  codeOrder = '';
  listProductSeleted = [];
  totalProduct = 0;

  constructor(
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router,
    private toastService: ToastrService,
    private baseService: BaseService) {
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
      this.data = this.data.map(item => ({...item, checked: false}));
      this.data.forEach(item => {
        this.totalProduct += item.products.length;
      })
      this.calculatorAmount(this.listProductSeleted);
    }
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
    const product = this.listProductSeleted.find((x) => x.product_option_id === id);
    const product_attached = this.data.find((x) => x.product_parent === id);
    if (quantity > 0) {
      if (product) {
        product.quantity = quantity;
        this.calculatorAmount(this.listProductSeleted);
      }
      if (product_attached) {
        product_attached.quantity = quantity;
        this.calculatorAmount(this.listProductSeleted);
      }
    }
  }

  removeProduct(product, sellerItem): void {
    const seller = this.data.find(x => x.seller == product.seller);
    if (seller) {
      const productIndex = seller.products.findIndex((x) => x.product_option_id === product.product_option_id);
      const sellerIndex = this.data.indexOf(seller);
      
      if (productIndex > -1) {
        seller.products.splice(productIndex, 1);
        this.calculatorAmount(this.listProductSeleted);
      }

      if (seller.products.length == 0) {
        this.data.splice(sellerIndex, 1);
      }
      AppUtils.saveDataToCookies('_cart', JSON.stringify(this.data));
      this.initData();
    }
    
  }

  calculatorAmount(data): void {
    const list_product = data.filter(x => x.checked = true);
    this.listProductSeleted = [...new Set(list_product)]
    this.totalAmount = 0
    
    this.totalAmount = this.listProductSeleted.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
    AppUtils.saveDataToCookies('_product_payment', JSON.stringify(this.listProductSeleted));
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
    if (this.userAddress) {
      const data = {
        ship_money: 5000,
        note: '',
        address: this.userAddress.address,
        referral: this.getCookie('referral')
      };
      const productDetail = this.listProductSeleted.map((item) => {
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
      const order = new Order(this.totalAmount, data.ship_money, this.totalAmount, data.note, data.address, productDetail, this.userInfo.phone);
      this.orderService.createOrder(order).subscribe(res => {
        if (res.status_code === 200) {
          this.orderSuccess = true;
          AppUtils.clearCookies('_cart');
          AppUtils.clearCookies('_product_payment');
          this.initData();
          this.codeOrder = res.data;
          this.baseService.sendData({createOrderSuccess: true})
        } else {
          console.error(res.message);
          this.toastService.error('Đặt hàng không thành công', '')
        }
      });
    } else {
      this.showError = true;
      this.toastService.warning('Bạn hãy đặt địa chỉ mặc định trước khi đặt hàng', '')
    }
  }

  continueOrder() {
    this.router.navigate(['/thong-tin-van-chuyen']);
  }

  getUserAddress() {
    const limit = 10;
    const page = 1
    this.addressService.getUserAddress(limit, page).subscribe(res => {
      if (res.status_code == 200) {
        const list_user_address = res.data.result;
        this.userAddress =list_user_address.find(x => x.status == 1);
      }
    })
  }

  isAllChecked() {
    return this.data.every(x => x.checked == true)
  }


  checkAllOptions() {
    if (this.data.every(val => val.checked == true)) {
      this.data.forEach(val => {
        val.checked = false;
        val.products.forEach(item => {
          item.checked = false;
          this.listProductSeleted = [];
        });
      });
    } else {
      this.data.forEach(val => {
        val.checked = true;
        val.products.forEach(item => {
          item.checked = true;
          this.listProductSeleted.push(item);
        });
      });
      this.calculatorAmount(this.listProductSeleted);
    }
  }

  isAllProductOfseller(listProductOfSeller) {
    if (this.data.every(x => x.checked)) {
      return true;
    } else {
      this.checkDataChecked();
      return listProductOfSeller.every(x => x.checked == true);
    }
    
  }

  checkAllProductOfseller(listProductOfSeller, event) {
    const listProductSeller = this.data.find(x => x.seller == listProductOfSeller.seller);
    if (listProductSeller.products.every(val => val.checked == true)){
      listProductSeller.products.forEach(val => { val.checked = false });
    } else {
      listProductSeller.products.forEach(val => { val.checked = true });
    }
    this.checkDataChecked();
  }

  selectedProduct(listProductOfSeller, event) {
    const product = listProductOfSeller.products.find(x => x.product_id == event.target.value);
    product.checked = event.target.checked ? true : false;
    this.checkDataChecked();
    } 

  checkDataChecked() {
    this.data.forEach(val => {
      const list_product = val.products.filter(x => x.checked == true);
      if (list_product.length == val.products.length) {
        val.checked = true;
      } else {
        val.checked = false;
      }
      val.products.forEach(item => {
        if (item.checked) {
          this.listProductSeleted.push(item);
        } else {
          const index = this.listProductSeleted.indexOf(item)
          if (index > -1) {
            this.listProductSeleted.splice(index, 1);
          }
        }
      });
    });
    this.calculatorAmount(this.listProductSeleted);
   }
}
