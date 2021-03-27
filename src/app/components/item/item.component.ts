import {Component, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() name;
  @Input() avatar;
  @Input() id;

  constructor(
    private productService: ProductService
  ) {
  }

  searchProduct = (id: string = null): void => {
  //  chuyen service xuong ben duoi + call api product
  }
}
