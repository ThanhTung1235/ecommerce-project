import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  customer = new Customer();
  isLoading = false;
  invalid_confirm_passwod = false;
  errorMessage = '';
  constructor(
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.isLoading = true;
      this.customerService.register(this.customer).subscribe(res => {
        this.isLoading = false;
        if(res.status_code === 200) {
          this.errorMessage = '';
          this.router.navigate(['/tai-khoan/dang-nhap'])
        }else {
          this.errorMessage = res.message;
        }
      },
      err => {
        this.isLoading = false
      });
    
  }

}
