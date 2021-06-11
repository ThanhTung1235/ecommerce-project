import { OrderService } from './../../../../services/order.service';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAddress } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['../address/address.component.scss']
})
export class AddressFormComponent implements OnInit, OnChanges {
  @Input() orderView: any;
  @Output() dataAddress = new EventEmitter<any>();
  @ViewChild('userAddressForm') userAddressForm;

  show_address_form = false;
  list_cities_fetch = [];
  list_district_fetch = [];
  list_ward_fetch = [];
  list_user_address= [];
  customer_address = new CustomerAddress();
  isLoading = false;
  set_default_address_user = false;
  userAddressId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getCity();
    this.detectUrl();
    this.initDistrictAndWard();
  }

  ngOnChanges() {
    this.orderService.getData().subscribe(data => {
      if (data.getInfoAddress) {
        document.getElementById('btn_submit').click();
        if (this.userAddressForm.form.valid) {
          this.dataAddress.emit(this.customer_address);  
        }
        
      }
    })
  }

  detectUrl(): void{
    this.route.queryParams.subscribe(params => {
      this.userAddressId = params.edit;
      if (this.userAddressId !== 'false' && this.userAddressId !== undefined) {
        this.getUserAddressDetail(this.userAddressId);
      } else {
        this.customer_address = new CustomerAddress();
      }
      
    });
  }

  getUserAddressDetail(uid) {
    this.addressService.getUserAddressDetail(uid).subscribe(res => {
      if (res.status_code == 200) {
        this.customer_address = {...res.data};
        this.getDistrict(this.customer_address.city_id);
        this.getWard(this.customer_address.district_id);
        this.customer_address.address = res.data.address.split('-')[0]
      }
    });
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

  setAddressDefault(value) {
    this.set_default_address_user = value;
  }

  saveUserAddress() {
    this.isLoading = true;
    if (!this.orderView) {
      if(this.userAddressId) {
        this.updateUserAddress();
        if (this.set_default_address_user) {
          this.addressService.userAddressDefault(this.userAddressId)
        }
      } else {
        this.createUserAddress();
      }
    }
  }

  updateUserAddress() {
    this.addressService.updateUserAddress(this.customer_address).subscribe(res => {
      this.isLoading = false;
      if (res.status_code == 200) {
        this.show_address_form = false;
        this.router.navigate([], {relativeTo : this.route})
        this.getListUserAddress();
      }
    },
    err => {
      this.isLoading = false;
      console.log(err)
    })
  }

  createUserAddress() {
    this.addressService.createUserAddress(this.customer_address).subscribe(res => {
      this.isLoading = false;
      if (res.status_code == 200) {
        this.show_address_form = false;
        this.router.navigate([], {relativeTo : this.route})
        this.getListUserAddress();
      }
    },
    err => {
      this.isLoading = false;
      console.log(err)
    })
  }

  getListUserAddress() {
    this.addressService.getUserAddress().subscribe(res => {
      if (res.status_code == 200) {
        this.list_user_address = res.data.result;
      }
    })
  }

  initDistrictAndWard() {
    if (this.list_district_fetch.length == 0) {
      this.list_district_fetch.push({
        "code": 0,
        "name": "-- Quận huyện --",
        "parent": 0
      })
    }

    if (this.list_ward_fetch.length == 0) {
      this.list_ward_fetch.push({
        "code": 0,
        "name": "-- Xã phường --",
        "parent": 0
      })
    }
  }

  

}
