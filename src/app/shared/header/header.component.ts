import { AppUtils } from 'src/app/utils/app.utils';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/services/base.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private dataService: BaseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    this.countProductInCart();
    this.getNotifyFromSubject();
    this.getCategory();
    this.detectUrlChange();

    const token = localStorage.getItem('re_tk')
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
