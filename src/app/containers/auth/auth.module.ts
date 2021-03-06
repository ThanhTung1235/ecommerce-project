import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { SharedDirectiveModule } from 'src/app/core/directives/shared.directive.module';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', loadChildren: () => import('../customer-info/customer-info.module').then(m => m.CustomerInfoModule) },
      { path: 'dang-nhap', component: LoginComponent },
      { path: 'dang-ki', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedDirectiveModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [
    AuthComponent
  ]
})
export class AuthModule { }
