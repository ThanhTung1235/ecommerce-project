import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUtils } from 'src/app/utils/app.utils';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  quantityProd: number;
  product: any;
  prodId: any;
  showNotiCart = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dataService: BaseService) { }

  ngOnInit(): void {
    this.detetUrl();
  }

  detetUrl(): void{
      let nameProd = this.route.snapshot.paramMap.get('name');
      this.prodId = nameProd.split('_i.')[1];
      if (!nameProd) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
          nameProd = this.route.snapshot.paramMap.get('name');
          this.prodId = nameProd.split('_i.')[1];
          return false;
        };
      }
      this.getDetailProduct(this.prodId);
  }

  quantityChange(quanity): void {
    this.quantityProd = quanity;
  }

  getDetailProduct(id): void {
    this.product = {
      image : 'https://salt.tikicdn.com/cache/550x550/ts/product/86/1f/13/41351980c0e8bd616bcc36fc431d033d.jpg',
      name: 'Loa Bluetooth JBL Go 2 - Hàng Chính Hãng',
      price: 630000,
    }
    // this.productService.getDetailProduct({product_id: id}).subscribe(res => {
    //   this.product = res.data.result[0];
    // });
  }

  buyNow(_product): void{
    this.showNotiCart = true;
    this.dataService.sendData(true);
    const data = {
      product_name: _product.name,
      product_id: this.prodId,
      price: _product.price,
      seller: 'Máy tính Lanh Dung',
      quantity: this.quantityProd,
      img: _product.image,
      product_link: AppUtils.productNameInURL(_product.name, this.prodId)
    };
    let listProd = [];
    const dataFormCookies = AppUtils.getDataFromCookies('_cart');
    if (dataFormCookies) {
      console.log(this.quantityProd);
      const products = JSON.parse(dataFormCookies);
      const product = products.find(x => x.product_id === this.prodId);
      if (product) {
        product.quantity = this.quantityProd + product.quantity;
      } else {
        products.push(data);
      }
      listProd = [...products];
      AppUtils.saveDataToCookies('_cart', JSON.stringify(listProd));
    }else {
      listProd.push(data);
      AppUtils.saveDataToCookies('_cart', JSON.stringify(listProd));
    }
    // this.router.navigate(['/gio-hang']);
  }

  closeNotiCart(): void{
    if(this.showNotiCart) {
      this.showNotiCart = false;
    } else {
      this.showNotiCart = true;
    }
  }

}
