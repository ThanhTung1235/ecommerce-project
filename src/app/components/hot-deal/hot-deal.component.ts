import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-deal',
  templateUrl: './hot-deal.component.html',
  styleUrls: ['./hot-deal.component.scss']
})
export class HotDealComponent implements OnInit {
  data = [1, 2 , 3 , 4 , 5, 6, 7, 8, 9, 10];
  constructor() { }

  ngOnInit(): void {
  }

}
