import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-box',
  templateUrl: './quantity-box.component.html',
  styleUrls: ['./quantity-box.component.scss']
})
export class QuantityBoxComponent implements OnInit {
  @Output() quantity = new EventEmitter();

  quantityNumber = 1;

  constructor() { }

  ngOnInit(): void {
    this.quantity.emit(this.quantityNumber);
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
    this.quantityNumber = quantity;
    this.quantity.emit(this.quantityNumber);
  }

}
