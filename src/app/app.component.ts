import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-project';
  param1: string;
  auth_form = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.param1 = params.referral;
      if (this.param1) {
        this.setCookie('referral', this.param1, 30, '');
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const url = evt.url

      this.auth_form = url.includes('tai-khoan/dang-nhap') || url.includes('tai-khoan/dang-ki') ? true : false
      window.scrollTo(0, 0);
    });
  }

  setCookie = (name: string, value: string, expireDays: number, path: string = '') => {
    const d = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
