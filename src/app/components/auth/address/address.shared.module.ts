import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { AddressFormComponent } from './address-form/address-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AddressComponent,
    AddressFormComponent
  ],
  exports: [
    AddressComponent,
    AddressFormComponent
  ]
})
export class AddressSharedModule { }
