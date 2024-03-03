import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {path: '',redirectTo:'home',pathMatch:'full'},
  {path: 'register', component:RegisterComponent,title:'register'},
  {path: 'login',component:LoginComponent,title:'login'},
  {path: 'home', canActivate:[authGuard], component:HomeComponent,title:'home'},
  {path: 'shippingAddress/:id', canActivate:[authGuard], component:ShippingAddressComponent,title:'shippingAddress'},
  {path: 'products', canActivate:[authGuard], component:ProductsComponent,title:'products'},
  {path: 'productDetails/:id', canActivate:[authGuard], component:ProductDetailsComponent,title:'productDetails'},
  {path: 'categories', canActivate:[authGuard], component:CategoriesComponent,title:'categories'},
  {path: 'allorders', canActivate:[authGuard], component:AllOrdersComponent,title:'allorder'},
  {path: 'brands', canActivate:[authGuard], component:BrandsComponent,title:'brands'},
  {path: 'cart', canActivate:[authGuard], component:CartComponent,title:'cart'},
  {path: 'wishList', canActivate:[authGuard], component:WishListComponent,title:'wishList'},
  {path: 'forgetPassword', component:ForgetPasswordComponent,title:'forgetPassword'},
  {path: '**',component:NotFoundComponent,title:'notFound'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
