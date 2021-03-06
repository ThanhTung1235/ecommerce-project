import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { SharedDirectiveModule } from 'src/app/core/directives/shared.directive.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedDirectiveModule
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
