import { AppUtils } from 'src/app/utils/app.utils';
import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productCount: any;
  constructor(private dataService: BaseService) { }

  ngOnInit(): void {
    AppUtils.getDataFromCookies('_cart');
    const data = AppUtils.getDataFromCookies('_cart');
    if (data) {
      const products = JSON.parse(data);
      this.productCount = products.length;
    } else {
      this.productCount = 0;
    }
    this.dataService.getData().subscribe(data => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.getElementById('dropNotifyCart').click();
      }, 500);
    });
  }
}
