import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared,module';

const routes: Routes = [
  {path: '', component : ShoppingCartComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ShoppingCartComponent],
  exports: [ShoppingCartComponent]
})
export class ShoppingCartModule { }
