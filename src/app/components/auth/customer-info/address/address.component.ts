import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  show_address_form = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTitlePage(this.router.url);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const url = evt.url
      this.getTitlePage(url);
    });
  }

  editAddress() {
    this.router.navigate([], {relativeTo : this.route, queryParams: {edit: 123}})
    this.show_address_form = true
  }

  getTitlePage(url){
    if (url.includes('tai-khoan/dia-chi')) {
      if (url.includes('/dia-chi?edit=')) {
        this.show_address_form = true;
      }else {
        this.show_address_form = false;
      }
    }
  }

  deleteAddress() {
    
  }

}
