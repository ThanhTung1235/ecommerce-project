import { AppUtils } from 'src/app/utils/app.utils';
import { AddressService } from './../../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerAddress } from 'src/app/models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  show_address_form = false;
  list_cities_fetch = [];
  list_district_fetch = [];
  list_ward_fetch = [];
  list_user_address= [];
  customer_address = new CustomerAddress();
  isLoading = false;
  customer_info: any;
  userAddressId: any;
  set_default_address_user = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService) { }

  ngOnInit() {
    this.customer_address.city_id = "0";
    this.customer_address.district_id = "0";
    this.customer_address.ward_id = "0";
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const url = evt.url
      this.getTitlePage(url);
    });
    this.getTitlePage(this.router.url);
    this.getListUserAddress();
    this.getUserInfoFromJwt();
    this.detectUrl();
  }

  detectUrl(): void{
    // this.userAddressId = this.route.snapshot.paramMap.get('edit');
    // this.getUserAddressDetail(this.userAddressId);
    this.route.queryParams.subscribe(params => {
      this.userAddressId = params.edit;
    });
  }

  getUserInfoFromJwt() {
    let token = AppUtils.getDataFromCookies('re_tk')
    this.customer_info =  AppUtils.parseJwt(token)['identity'];
  }

  editAddress(event) {
    if (event) {
      this.router.navigate([], {relativeTo : this.route, queryParams: {edit: event}});
    } else {
      this.router.navigate([], {relativeTo : this.route, queryParams: {edit: event}});
    }
    this.show_address_form = true
  }


  getTitlePage(url){
    if (url.includes('tai-khoan/dia-chi')) {
      if (url.includes('/dia-chi?edit=')) {
        this.show_address_form = true;
      }else {
        this.show_address_form = false;
      }
    }
  }

  getListUserAddress() {
    this.addressService.getUserAddress().subscribe(res => {
      if (res.status_code == 200) {
        this.list_user_address = res.data.result;
      }
    })
  }

}
