import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { ProdItemComponent } from './prod-item/prod-item.component';

import { CommonModule } from '@angular/common';
import { ProdListComponent } from './prod-list/prod-list.component';
import { ProductService } from '../../services/product.service';

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
        ProdListComponent,
        ItemComponent,
        ProdItemComponent,
    ],
    providers: [
        ProductService
    ],
})
export class ProductModule { }
