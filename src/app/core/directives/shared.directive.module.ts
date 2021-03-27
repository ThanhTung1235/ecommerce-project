import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberOnlyDirective } from './number-only.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        NumberOnlyDirective
    ],
    declarations: [
        NumberOnlyDirective
],
    providers: [],
})
export class SharedDirectiveModule { }
