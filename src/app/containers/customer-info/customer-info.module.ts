import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderHistoryComponent } from './../../components/auth/customer-info/order-history/order-history.component';
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
import { SharedPipeModule } from 'src/app/core/pipes/shared.pipe.module';
import { OrderHistoryDetailComponent } from 'src/app/components/auth/customer-info/order-history-detail/order-history-detail.component';


export const routes: Routes = [
  {
    path: '',
    component: CustomerInfoComponent,
    children: [
      { path: 'chinh-sua', component: UserInfoComponent },
      { path: 'dia-chi', component: AddressComponent },
      { path: 'don-hang', component: OrderHistoryComponent},
      { path: 'don-hang/:order_id', component: OrderHistoryDetailComponent},
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedDirectiveModule,
    AddressSharedModule,
    NgbModule,
    SharedPipeModule
  ],
  declarations: [
    UserInfoComponent,
    CustomerInfoComponent,
    OrderHistoryComponent,
    OrderHistoryDetailComponent
  ],
  exports: [
    UserInfoComponent,
    CustomerInfoComponent,
    OrderHistoryComponent,
    
  ]
})
export class CustomerInfoModule { }
