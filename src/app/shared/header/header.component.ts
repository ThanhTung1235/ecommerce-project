import { CustomerInfo } from './../../models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { AppUtils } from 'src/app/utils/app.utils';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/services/base.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  productCount: any;
  isTop = false;
  listCategory: any;
  isShowCategory = false;
  sub: Subscription;
  isLogin = false;
  user: CustomerInfo;
  constructor(
    private dataService: BaseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private customerService: CustomerService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.countProductInCart();
    this.getNotifyFromSubject();
    this.getCategory();
    this.detectUrlChange();
    this.getUserInfo();
    this.getUserInfoAfterLogin();
    const token = AppUtils.getDataFromCookies('re_tk');
    this.isLogin = token ? true : false
    
  }

  detectUrlChange() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.isShowCategory = false;
    });
  }

  ngAfterViewInit(){
    const haederMobile = document.getElementById("header-sm");
    if (window.pageYOffset > 0) {
      haederMobile.style.height = "50px";
      this.isTop = false;
    }else { 
      this.isTop = true;
      haederMobile.style.height = "110px";
    }
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

  getCategory() { 
    this.categoryService.getListCategory({}).subscribe(response => {
      if (response.status_code === 200){
        this.listCategory = response.data.result;
      }
    });
  }

  getNotifyFromSubject() { 
    this.dataService.getData().subscribe((data) => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.getElementById('dropNotifyCart').click();
        this.countProductInCart();
      }, 500);
    });
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    const haederMobile = document.getElementById("header-sm");
    if (window.pageYOffset > 0) {
      haederMobile.style.height = "50px";
      this.isTop = false;
    }else { 
      this.isTop = true;
      haederMobile.style.height = "110px";
    }
  }

  categoryMenuShow() {
    this.isShowCategory = this.isShowCategory == true ? false : true;
  }

  getUserInfo(){
    if (AppUtils.getDataFromCookies('re_tk')) {
      console.log('exists token');
      this.customerService.getInfoCustomer().subscribe(res => {
        this.user = res.data;
        this.isLogin = true
      })
    }
  }

  getUserInfoAfterLogin() {
    this.customerService.getData().subscribe(data => {
      console.log("login_succes: ", data['login_success']);
      if (data['login_success']) {
        this.customerService.getInfoCustomer().subscribe(res => {
          this.user = res.data;
          this.isLogin = true
        })
      }
    })
  }

  logOut() {
    AppUtils.clearCookies('re_tk');
    this.isLogin = false;
    this.user = undefined;
    if (this.router.url.includes('/tai-khoan')) {
      this.router.navigate(['/tai-khoan/dang-nhap'])
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
