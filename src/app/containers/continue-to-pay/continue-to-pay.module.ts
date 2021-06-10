import { CustomerInfoModule } from './../customer-info/customer-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContinueToPayComponent } from './continue-to-pay.component';
import { RouterModule, Routes } from '@angular/router';
import { AddressSharedModule } from 'src/app/components/auth/address/address.shared.module';

export const routes: Routes = [
  { path: '', component: ContinueToPayComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AddressSharedModule
  ],
  declarations: [
    ContinueToPayComponent
  ],
  exports: [
    ContinueToPayComponent
  ]
})
export class ContinueToPayModule { }
