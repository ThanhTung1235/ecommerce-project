import { SearchBoxComponent } from './search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { QuantityBoxComponent } from './quantity-box/quantity-box.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [HeaderComponent, SearchBoxComponent, QuantityBoxComponent],
    declarations: [HeaderComponent, SearchBoxComponent, QuantityBoxComponent],
    providers: [],
})
export class SharedModule { }
