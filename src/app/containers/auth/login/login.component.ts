import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  customer = new Customer();
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  submit() {
    this.isLoading = true;
    this.customerService.login(this.customer).subscribe(res => {
      this.isLoading = false;
      if(res.status_code == 200) {
        localStorage.setItem('re_tk', res['token']);
        this.router.navigate(['/']);
      }
    },
    err => {
      this.isLoading = false
    });
  }

}
