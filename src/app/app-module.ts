import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { Menu } from './menu/menu';

@NgModule({
  declarations: [App, Home, Admin, Menu],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
