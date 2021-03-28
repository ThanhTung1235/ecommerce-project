import { ProductDescriptionComponent } from './../../components/product-description/product-description.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentComponent } from './../../components/comment/comment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared,module';

export const routes: Routes = [
  {path: '', component: DetailComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule
  ],
  declarations: [
    DetailComponent,
    CommentComponent,
    ProductDescriptionComponent
  ],
  exports: [
      DetailComponent,
      CommentComponent,
      ProductDescriptionComponent
    ]
})
export class DetailModule { }
