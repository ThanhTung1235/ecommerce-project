import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CustomerInfo } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  title_page = '';
  customer_info: CustomerInfo;
  constructor(
    private router: Router,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.getTitlePage(this.router.url);
    this.getUserInfo()
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const url = evt.url
      this.getTitlePage(url);
      window.scrollTo(0, 0);
    });
  }


  getTitlePage(url){
    if (url.includes('tai-khoan')) {
      this.title_page = 'Thông tin tài khoản';
    }
    if (url.includes('tai-khoan/dia-chi')) {
      if (url.includes('/dia-chi?edit=')) {
        this.title_page = 'Chỉnh sửa địa chỉ'
      }else {
        this.title_page = 'Sổ địa chỉ'
      }
    }
  }

  getUserInfo() {
    this.customerService.getcustomerInfoCache().subscribe(res => {
      this.customer_info = res.data;
    })
  }

}
