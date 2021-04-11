export class Order {
  // tslint:disable-next-line:variable-name
  total_price: number;
  // tslint:disable-next-line:variable-name
  ship_money: number;
  price: number;
  note: string;
  address: string;
  // tslint:disable-next-line:variable-name
  product_detail: ProductDetail[];

  constructor(
    // tslint:disable-next-line:variable-name
    total_price: number,
    // tslint:disable-next-line:variable-name
    ship_money: number,
    price: number,
    note: string,
    address: string,
    // tslint:disable-next-line:variable-name
    product_detail: ProductDetail[]
  ){
    this.total_price = total_price;
    this.ship_money = ship_money;
    this.price = price;
    this.note = note;
    this.address = address;
    this.product_detail = product_detail;
  }

}

export class ProductDetail {
  // tslint:disable-next-line:variable-name
  product_id: string;
  price: number;
  quantity: number;
  // tslint:disable-next-line:variable-name
  product_name: string;
  size: string;
}
