import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  quantityProd: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  quantityChange(quanity): void {
    this.quantityProd = quanity;
  }

  buyNow(): void{
    const data = {
      product_name: 'Màn Hinh BenQ GW2283 22 Inch Full HD (1920 x 1080) 5ms 60Hz IPS Speaker 1W x 2 - Hàng Chính Hãng',
      product_id: '12',
      price: '2.550.000đ',
      seller: 'Máy tính Lanh Dung',
      quantity: this.quantityProd
    };
    const listProd = [];
    const dataFormCookies = AppUtils.getDataFromCookies('_cart');
    if (dataFormCookies) {
      console.log(this.quantityProd);
      const products = JSON.parse(dataFormCookies);
      const product = products.find(x => x.product_id === '12');
      product.quantity = this.quantityProd + product.quantity;
      listProd.push(product);
      AppUtils.saveDataToCookies('_cart', JSON.stringify(listProd));
    }else {
      listProd.push(data);
      AppUtils.saveDataToCookies('_cart', JSON.stringify(listProd));
    }
    this.router.navigate(['/gio-hang']);
  }

}
