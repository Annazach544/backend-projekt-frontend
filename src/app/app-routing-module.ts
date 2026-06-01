import { Menu } from './menu/menu';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './home/home';
import { Admin } from './admin/admin';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'menu', component: Menu },
  { path: 'admin', component: Admin }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }