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
  productOption: any;
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
    // this.product = this.productService.getDataDemo();
    // this.productOption = this.product.products[0];
    this.productService.getDetailProduct({product_id: id}).subscribe(res => {
      this.product = res.data.result;
      this.productOption = this.product.products[0];
    });
  }

  buyNow(_product): void{
    console.log(_product);
    this.showNotiCart = true;
    this.dataService.sendData(true);
    const data = {
      product_name: this.product.name,
      product_id: this.prodId,
      price: _product.price,
      seller: 'Máy tính Lanh Dung',
      quantity: this.quantityProd,
      img: _product.image,
      size: _product.size,
      color: _product.color,
      product_link: AppUtils.productNameInURL(this.product.name, this.prodId),
      product_option_id: _product.id
    };
    let listProd = [];
    const dataFormCookies = AppUtils.getDataFromCookies('_cart');
    if (dataFormCookies) {
      const products = JSON.parse(dataFormCookies);
      const product = products.find(x => x.product_option_id === this.productOption.uid);
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

  productOptionChange(value): void{
    const optionChange = this.product.products.find(x => x.uid === value);
    if (optionChange) {
      this.productOption = {...optionChange};
    }
  }

}
