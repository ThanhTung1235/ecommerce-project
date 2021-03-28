import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ItemComponent } from '../components/product/item/item.component';
import { ProdItemComponent } from './product/prod-item/prod-item.component';

import { CommonModule } from '@angular/common';
import { ProdListComponent } from '../components/product/prod-list/prod-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
    ],
    exports: [
        ItemComponent,
        ProdItemComponent,
        ProdListComponent
    ],
    declarations: [
        ItemComponent,
        ProdItemComponent,
        ProdListComponent
    ],
    providers: [],
})
export class ProductModule { }
