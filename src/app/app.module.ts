import { AppRouting } from './app.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from './services/product.service';
import {CategoryService} from './services/category.service';
import {HttpClientModule} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(AppRouting),
    NgbModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
