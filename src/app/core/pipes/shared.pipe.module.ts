import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatusOrderPipe } from './status-order.pipe';


@NgModule({
    imports: [CommonModule],
    exports: [StatusOrderPipe],
    declarations: [	
      StatusOrderPipe
   ],
    providers: [],
})
export class SharedPipeModule { }
