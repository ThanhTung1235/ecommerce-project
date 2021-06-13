import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
        SharedDirectiveModule,
        NgbModule
    ],
    exports: [HeaderComponent, SearchBoxComponent, QuantityBoxComponent, FooterComponent],
    declarations: [HeaderComponent, SearchBoxComponent, QuantityBoxComponent, FooterComponent],
    providers: [],
})
export class SharedModule { }
