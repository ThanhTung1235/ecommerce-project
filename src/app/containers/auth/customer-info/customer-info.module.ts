import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInfoComponent } from './customer-info.component';
import { UserInfoComponent } from 'src/app/components/auth/customer-info/user-info/user-info.component';
import { AddressComponent } from 'src/app/components/auth/customer-info/address/address.component';


export const routes: Routes = [
  {
    path: '',
    component: CustomerInfoComponent,
    children: [
      { path: 'chinh-sua', component: UserInfoComponent },
      { path: 'dia-chi', component: AddressComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    UserInfoComponent,
    AddressComponent
  ],
  exports: [
    UserInfoComponent,
    AddressComponent
  ]
})
export class CustomerInfoModule { }
