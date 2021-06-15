import { OrderService } from './../../../../services/order.service';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAddress } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['../address/address.component.scss']
})
export class AddressFormComponent implements OnInit, OnChanges {
  @Input() orderView: any;
  @Output() dataAddress = new EventEmitter<any>();
  @Output() listUserAddress = new EventEmitter<any>();
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
    private orderService: OrderService,
    private toastService: ToastrService) { }

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
          const city = this.list_cities_fetch.find(x => x.code == this.customer_address.city_id);
          const district = this.list_district_fetch.find(x => x.code == this.customer_address.district_id);
          const ward = this.list_ward_fetch.find(x => x.code == this.customer_address.ward_id);
          const data = {
            city: city.name,
            district: district.name,
            ward: ward.name,
            full_name: this.customer_address.full_name,
            phone: this.customer_address.phone_number,
            address: this.customer_address.address
          }
          this.dataAddress.emit(data);  
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
        this.set_default_address_user = res.data.status;
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
      if(this.userAddressId !== 'false') {
        this.updateUserAddress();
        console.log("this.set_default_address_user", this.set_default_address_user);
        
        if (this.set_default_address_user) {
          this.addressService.userAddressDefault(this.userAddressId).subscribe(res => {
            if (res.status_code !== 200) {
              this.toastService.error("set default address user fail");
              console.log(res.message);
            }
          });
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
        this.toastService.success('Cật nhật địa chỉ thành công','')
      } else {
        this.toastService.error('Tạo mới địa chỉ không thành công', '')
      }
    },
    err => {
      this.isLoading = false;
      console.log(err);
      this.toastService.error('Tạo mới địa chỉ không thành công', '')
    })
  }

  createUserAddress() {
    this.addressService.createUserAddress(this.customer_address).subscribe(res => {
      this.isLoading = false;
      if (res.status_code == 200) {
        this.show_address_form = false;
        this.router.navigate([], {relativeTo : this.route})
        this.getListUserAddress();
        this.toastService.success('Tạo mới địa chỉ thành công','')
      }else {
        this.toastService.error('Tạo mới địa chỉ không thành công', '')
      }
    },
    err => {
      this.isLoading = false;
      console.log(err);
      this.toastService.error('Tạo mới địa chỉ không thành công', '')
    })
  }

  getListUserAddress() {
    this.listUserAddress.emit(true);
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
