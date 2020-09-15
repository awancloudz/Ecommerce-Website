import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, HomeFaqComponent } from './home/home.component';
import { ProductComponent, ProductDetailComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent, CheckoutFinishComponent } from './checkout/checkout.component';
import { ProfileComponent, ProfileAddressComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CategoryComponent } from './category/category.component';
import { BlogComponent } from './blog/blog.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, HomeFaqComponent,
    ProductComponent, ProductDetailComponent,
    CartComponent,
    CheckoutComponent, CheckoutFinishComponent,
    ProfileComponent, ProfileAddressComponent,
    RegisterComponent,
    TransactionComponent,
    CategoryComponent,
    BlogComponent,
    WishlistComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
