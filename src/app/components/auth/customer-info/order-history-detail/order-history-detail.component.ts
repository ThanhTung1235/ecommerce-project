import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.scss']
})
export class OrderHistoryDetailComponent implements OnInit {
  order_id: any;
  orderDetail: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('order_id');
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrderDetail(this.order_id).subscribe(res => {
      if (res.status_code == 200) {
        this.orderDetail = res.data;

      }
    })
  }

  demoData() {
    return {
      "data": {
          "list_product": [
              {
                  "ctime": "2021-06-17 23:46:31",
                  "image": "http://static-image.webdemo.isvn.space/uploads/product/5674613837070266464-low-300.jpg",
                  "price": 10000000,
                  "product_id": "5674613837494790238",
                  "product_name": "iPhone 11 pro max 256gb - iPhone 11 bán lẻ giá sỉ Hà Nội [Tặng Ốp Lưng]",
                  "quantity": 1,
                  "shop_id": "5674590154980977953"
              },
              {
                "ctime": "2021-06-17 23:46:31",
                "image": "http://static-image.webdemo.isvn.space/uploads/product/5674613837070266464-low-300.jpg",
                "price": 10000000,
                "product_id": "5674613837494790238",
                "product_name": "iPhone 11 pro max 256gb - iPhone 11 bán lẻ giá sỉ Hà Nội [Tặng Ốp Lưng]",
                "quantity": 1,
                "shop_id": "5674590154980977953"
            }
          ],
          "total_price": 10000000
      },
      "message": "GET Order Detail Successfully",
      "status_code": 200
  }
  }

}
