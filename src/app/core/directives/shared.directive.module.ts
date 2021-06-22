import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberOnlyDirective } from './number-only.directive';
import { PhoneNumberDirective } from './phone-number.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        NumberOnlyDirective,
        PhoneNumberDirective
    ],
    declarations: [	
        NumberOnlyDirective,
        PhoneNumberDirective
   ],
    providers: [],
})
export class SharedDirectiveModule { }
