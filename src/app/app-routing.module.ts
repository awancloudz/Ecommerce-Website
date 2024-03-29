import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, HomeFaqComponent } from './home/home.component';
import { ProductComponent, ProductDetailComponent } from './product/product.component';
import { CategoryComponent, CategoryDetailComponent } from './category/category.component';
import { BlogComponent } from './blog/blog.component';
import { ProfileComponent, ProfileAddressComponent, ProfileAddProductComponent, ProfileEditProductComponent, ProfileAddCategoryComponent, ProfileEditCategoryComponent, ProfileAddSlideComponent, ProfileEditSlideComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent, CheckoutFinishComponent } from './checkout/checkout.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'faq', component: HomeFaqComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'productadd', component: ProfileAddProductComponent },
  { path: 'productedit/:id', component: ProfileEditProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'categoryadd', component: ProfileAddCategoryComponent },
  { path: 'categoryedit/:id', component: ProfileEditCategoryComponent },
  { path: 'slideadd', component: ProfileAddSlideComponent },
  { path: 'slideedit/:id', component: ProfileEditSlideComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'address/add', component: ProfileAddressComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'finish/:id', component: CheckoutFinishComponent },
  { path: 'transaction/:id', component: TransactionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
