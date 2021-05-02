import { AppUtils } from 'src/app/utils/app.utils';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/services/base.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  productCount: any;
  isTop = false;
  listCategory: any;
  constructor(
    private dataService: BaseService,
    private categoryService: CategoryService
    ) {}

  ngOnInit(): void {
    this.countProductInCart();
    this.getNotifyFromSubject();
    this.getCategory();
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
    const dataFromCookie = AppUtils.getDataFromCookies('_cng serveart');
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
}
