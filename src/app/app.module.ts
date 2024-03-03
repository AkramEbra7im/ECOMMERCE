import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesSlideComponent } from './components/categories-slide/categories-slide.component';
import { MainSlideComponent } from './components/main-slide/main-slide.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchPipe } from './pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesSlideComponent,
    MainSlideComponent,
    LoadingComponent,
    SearchPipe,
    ShippingAddressComponent,
    WishListComponent,
    AllOrdersComponent,
    ForgetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
