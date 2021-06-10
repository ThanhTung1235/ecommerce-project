import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInfoComponent } from './customer-info.component';
import { UserInfoComponent } from 'src/app/components/auth/customer-info/user-info/user-info.component';
import { AddressComponent } from 'src/app/components/auth/address/address/address.component';
import { SharedDirectiveModule } from 'src/app/core/directives/shared.directive.module';
import { AddressFormComponent } from 'src/app/components/auth/address/address-form/address-form.component';
import { AddressSharedModule } from 'src/app/components/auth/address/address.shared.module';


export const routes: Routes = [
  {
    path: '',
    component: CustomerInfoComponent,
    children: [
      { path: 'chinh-sua', component: UserInfoComponent },
      { path: 'dia-chi', component: AddressComponent }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedDirectiveModule,
    AddressSharedModule 
  ],
  declarations: [
    UserInfoComponent,
    CustomerInfoComponent
  ],
  exports: [
    UserInfoComponent,
    CustomerInfoComponent
  ]
})
export class CustomerInfoModule { }
