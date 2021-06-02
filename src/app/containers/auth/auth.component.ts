import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  auth_form = false
  constructor(
    private router: Router,
    private customerService: CustomerService) { }

  ngOnInit() {
    const url = this.router.url
    this.auth_form = (url.includes('tai-khoan/dang-nhap') || url.includes('tai-khoan/dang-ki')) ? true : false
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const url = evt.url

      this.auth_form = (url.includes('tai-khoan/dang-nhap') || url.includes('tai-khoan/dang-ki')) ? true : false
      window.scrollTo(0, 0);
    });
    this.checkUserLogin()
  }

  checkUserLogin() {
    this.customerService.getcustomerInfoCache().subscribe(res => {
      console.log(res);
      
    })
  }

}
