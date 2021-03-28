import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() name;
  @Input() avatar;
  @Input() id;

  constructor() {
  }

  searchProduct = (id: string = null): void => {
  //  chuyen service xuong ben duoi + call api product
  }
}
