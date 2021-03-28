import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuickLinksComponent } from './../../components/quick-links/quick-links.component';
import { HotDealComponent } from './../../components/hot-deal/hot-deal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { RouterModule, Routes } from '@angular/router';
import { HightLightsComponent } from 'src/app/components/hight-lights/hight-lights.component';
import { ProductModule } from 'src/app/components/product.module';

const routes: Routes = [
  {path: '', component: HomeComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ProductModule
  ],
  declarations: [
    HomeComponent,
    HotDealComponent,
    QuickLinksComponent,
    HightLightsComponent,
  ]
})
export class HomeModule { }
