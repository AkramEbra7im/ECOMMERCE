import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
 
  errorMessage: string = ''
  isLoading: boolean = true;
  productList: any[] = []
  constructor(private _WishListService: WishListService, private _ToastrService: ToastrService,private _AddToCartService:AddToCartService) { }

  ngOnInit(): void {
    this.getLoggedUserWishList()
  }
  getLoggedUserWishList() {
    this._WishListService.getloggedUserwishList().subscribe({
      next: (response: any) => {
        console.log(response);
        this.productList = response.data
        this.isLoading = false;
        if (this.productList.length == 0) {
          this.errorMessage = 'No wish List Exist For This User'
        }
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
        this.errorMessage = 'No Wish List Exist For This User'
      }
    })
  }
  removeProductFromWishList(productId: string) {
    this.isLoading = true;
    this._WishListService.removeItemFromwishList(productId).subscribe({
      next: (response: any) => {
        
       
        this._ToastrService.warning('Product removed successfully from your Wish List', '', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
        this.getLoggedUserWishList()
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  addProductToCart(productId: string){
    this._AddToCartService.addProductToCart(productId);
    this.removeProductFromWishList(productId);
  }

  

}
