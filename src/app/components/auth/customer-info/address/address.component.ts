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
  list_ward_fetch = []
  customer_address = new CustomerAddress();
  isLoading = false;
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
    this.getCity();
    this.initDistrictAndWard();
  }

  editAddress(uid) {
    if (uid) {
      this.router.navigate([], {relativeTo : this.route, queryParams: {edit: uid}})  
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

  getCity(){
    this.addressService.getCity().subscribe(res => {
      if (res.status_code == 200) {
        this.list_cities_fetch = res.data;
        this.list_cities_fetch.push({
          "code": 0,
          "name": "-- Tỉnh thành phố --",
          "parent": 0
        })
      }
    })
  }

  onCityChange(event) {
    this.getDistrict(event);
  }

  getDistrict(district_code){
    this.addressService.getDistrict(district_code).subscribe(res => {
      if (res.status_code == 200) {
        this.list_district_fetch = res.data;
        this.list_district_fetch.push({
          "code": 0,
          "name": "-- Quận huyện --",
          "parent": 0
        })
      }
    })

  }

  onDistrictChange(event){
    this.getWard(event);
  }

  getWard(ward_code){
    this.addressService.getWard(ward_code).subscribe(res => {
      if (res.status_code == 200) {
        this.list_ward_fetch = res.data;
        this.list_ward_fetch.push({
          "code": 0,
          "name": "-- Xã phường --",
          "parent": 0
        })
      }
    })
  }

  deleteAddress() {
    
  }

  initDistrictAndWard() {
    this.list_district_fetch.push({
      "code": 0,
      "name": "-- Quận huyện --",
      "parent": 0
    })
    this.list_ward_fetch.push({
      "code": 0,
      "name": "-- Xã phường --",
      "parent": 0
    })
  }

  saveUserAddress() {
    this.isLoading = true;
    this.addressService.createUserAddress(this.customer_address).subscribe(res => {
      this.isLoading = false;
      if (res.status_code == 200) {
        this.show_address_form = false;
        this.router.navigate([], {relativeTo : this.route})
      }
    },
    err => {
      this.isLoading = false;
      console.log(err)
    })
  }

}
