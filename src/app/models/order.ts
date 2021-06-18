export class Order {
  total_price: number;
  ship_money: number;
  price: number;
  note: string;
  address: string;
  product_detail: ProductDetail[];
  phone_number: string;

  constructor(
    total_price: number,
    ship_money: number,
    price: number,
    note: string,
    address: string,
    product_detail: ProductDetail[],
    phone_number: string
  ){
    this.total_price = total_price;
    this.ship_money = ship_money;
    this.price = price;
    this.note = note;
    this.address = address;
    this.product_detail = product_detail;
    this.phone_number = phone_number
  }

}

export class ProductDetail {
  product_id: string;
  price: number;
  quantity: number;
  product_name: string;
  size: string;
}
