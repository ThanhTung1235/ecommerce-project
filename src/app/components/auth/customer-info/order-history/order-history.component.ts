import { OrderService } from './../../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  page = 1;
  limit = 10;
  totalOrder  = 0;
  listOrder = [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getListOrder();
  }

  getListOrder() {
    this.orderService.getListOrder(this.limit, this.page).subscribe(res => {
      if (res.status_code = 200) {
        this.listOrder = res.data.list_order;
        this.totalOrder = res.data.total;
      }
    })
  }

  pageChanging(event) {
    this.page = event;
    this.getListOrder();
  }

}
