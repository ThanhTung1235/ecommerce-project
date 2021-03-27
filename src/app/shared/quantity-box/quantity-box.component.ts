import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-box',
  templateUrl: './quantity-box.component.html',
  styleUrls: ['./quantity-box.component.scss']
})
export class QuantityBoxComponent implements OnInit, OnChanges {
  @Output() quantity = new EventEmitter();
  @Input() quantityProduct: number;

  quantityNumber = 1;

  constructor() { }

  ngOnInit(): void {
    this.quantity.emit(this.quantityNumber);
  }

  ngOnChanges(): void {
    this.quantityNumber = this.quantityProduct;
  }

  minus(): void {
    if (this.quantityNumber === 0) {
      this.quantityNumber = 0;
    } else {
      this.quantityNumber = this.quantityNumber - 1;
    }
    this.quantity.emit(this.quantityNumber);
  }

  plus(): void{
    this.quantityNumber = this.quantityNumber + 1;
    this.quantity.emit(this.quantityNumber);
  }

  quantityChange(quantity): void{
    this.quantityNumber = quantity.replace(/[^0-9]/g, '');
    this.quantity.emit(this.quantityNumber);
  }

}
