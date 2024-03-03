import { Component } from '@angular/core';
import { product } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
declare let $:any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  term: string = ''
  isLoading: boolean = true;
  productList: product[] = [];

  constructor(
    private _ProductService: ProductService,
    public _AddToCartService:AddToCartService,
    private _WishListService:WishListService,
    private _ToastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: response => {
        this.isLoading = false;
        this.productList = response.data;
        console.log(this.productList);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  addProductToWishList(productId: string,event:Event) {
    this._WishListService.addProductTowishList(productId).subscribe({
      next: (response: any) => {
        this._ToastrService.success(response.message, '', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          timeOut: 3000,
          closeButton: true
        });
      },
      error: err => {
        console.log(err);
        this._ToastrService.error(err.message, '', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          timeOut: 2500,
          closeButton: true
        });
      }
    })
  }

}
