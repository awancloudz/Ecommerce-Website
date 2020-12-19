import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, HomeFaqComponent } from './home/home.component';
import { ProductComponent, ProductDetailComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent, CheckoutFinishComponent } from './checkout/checkout.component';
import { ProfileComponent, ProfileAddressComponent, ProfileAddProductComponent, ProfileEditProductComponent, ProfileAddCategoryComponent, ProfileEditCategoryComponent, ProfileAddSlideComponent, ProfileEditSlideComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CategoryComponent,CategoryDetailComponent } from './category/category.component';
import { BlogComponent } from './blog/blog.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, HomeFaqComponent,
    ProductComponent, ProductDetailComponent,
    CartComponent,
    CheckoutComponent, CheckoutFinishComponent,
    ProfileComponent, ProfileAddressComponent, ProfileAddProductComponent, ProfileEditProductComponent,
    ProfileAddCategoryComponent, ProfileEditCategoryComponent, ProfileAddSlideComponent, ProfileEditSlideComponent,
    RegisterComponent,
    TransactionComponent,
    CategoryComponent, CategoryDetailComponent,
    BlogComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
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
