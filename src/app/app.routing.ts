import { Routes } from '@angular/router';

export const AppRouting: Routes = [
    {path: '', loadChildren: () => import('./containers/home/home.module').then(m => m.HomeModule)},
    {path: 'chi-tiet/:name', loadChildren: () => import('./containers/detail/detail.module').then(m => m.DetailModule)},
    {path: 'tim-kiem', loadChildren: () => import('./containers/search-result/search-result.module').then(m => m.SearchResultModule)},
    {path: 'gio-hang', loadChildren: () => import('./containers/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)},
    {path: 'tai-khoan', loadChildren: () => import('./containers/auth/auth.module').then(m => m.AuthModule)},
    {path: 'thong-tin-van-chuyen', loadChildren: () => import('./containers/continue-to-pay/continue-to-pay.module').then(m => m.ContinueToPayModule)},

];
