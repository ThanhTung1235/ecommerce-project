import { AppUtils } from 'src/app/utils/app.utils';
import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  productCount: any;
  constructor(private dataService: BaseService) {}

  ngOnInit(): void {
    this.countProductInCart();
    this.dataService.getData().subscribe((data) => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.getElementById('dropNotifyCart').click();
        this.countProductInCart();
      }, 500);
    });
  }

  countProductInCart(): void {
    AppUtils.getDataFromCookies('_cart');
    const dataFromCookie = AppUtils.getDataFromCookies('_cart');
    if (dataFromCookie) {
      const products = JSON.parse(dataFromCookie);
      this.productCount = products.length;
    } else {
      this.productCount = 0;
    }
  }
}
