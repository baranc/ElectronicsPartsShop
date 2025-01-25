import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';

@NgModule({
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  declarations: [
    ShopComponent,
    HeaderComponent,
    ProductItemComponent,
    LoginComponent,
    RegisterComponent,
    CashRegisterComponent
  ]
})
export class AppModule { }
