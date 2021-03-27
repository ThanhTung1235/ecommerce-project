import { SearchBoxComponent } from './search-box/search-box.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { QuantityBoxComponent } from './quantity-box/quantity-box.component';
import { FormsModule } from '@angular/forms';
import { SharedDirectiveModule } from '../core/directives/shared.directive.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedDirectiveModule
    ],
    exports: [HeaderComponent, SearchBoxComponent, QuantityBoxComponent],
    declarations: [HeaderComponent, SearchBoxComponent, QuantityBoxComponent],
    providers: [],
})
export class SharedModule { }
