import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { AppUtils } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  customer = new Customer();
  isLoading = false;
  error_message = '';
  constructor(
    private customerService: CustomerService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  submit() {
    this.isLoading = true;
    this.customerService.login(this.customer).subscribe(res => {
      this.isLoading = false;
      if(res.status_code == 200) {
        AppUtils.saveDataToCookies('re_tk', res['token'])
        this.customerService.sendData({login_success: true})
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      } else {
        this.error_message = res.message
      }
      
    },
    err => {
      this.isLoading = false
    });
  }

}
