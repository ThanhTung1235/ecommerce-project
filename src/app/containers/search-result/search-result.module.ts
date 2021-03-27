import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';

import { Routes, RouterModule } from '@angular/router';
import { ProductModule } from 'src/app/components/product.module';

const routes: Routes = [
  {path: '', component: SearchResultComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ProductModule
  ],
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent]
})
export class SearchResultModule { }
