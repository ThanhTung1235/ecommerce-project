import { Routes } from '@angular/router';

export const AppRouting: Routes = [
    {path: '', loadChildren: () => import('./containers/home/home.module').then(m => m.HomeModule)},
    {path: 'chi-tiet/:name', loadChildren: () => import('./containers/detail/detail.module').then(m => m.DetailModule)},
    {path: 'tim-kiem/:name', loadChildren: () => import('./containers/search-result/search-result.module').then(m => m.SearchResultModule)},
    {path: 'gio-hang', loadChildren: () => import('./containers/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)},
];
