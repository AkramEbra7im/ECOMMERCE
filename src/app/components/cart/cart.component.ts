import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  errorMessage:string = '' 
  isLoading: boolean = true;
  spinLoading: boolean = false;
  numberOfItem: number = 0
  totalPrice: number = 0
  productList: any[] = []
  cartId:string=''

  constructor(private _CartService: CartService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this._CartService.loggedUserCart().subscribe({
      next: (response: any) => {
        this.cartId = response.data._id;
        this.numberOfItem = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
        this.productList = response.data.products
        this.isLoading = false;
        if(this.productList.length == 0){
          this.errorMessage = 'No Cart Exist For This User'
        }
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
        this.errorMessage = 'No Cart Exist For This User'
      }
    })
  }

  removeProductFromCart(productId: string) {
    this.isLoading = true;
    this._CartService.removeItemFromCart(productId).subscribe({
      next: (response: any) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
        this.numberOfItem = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
        this.productList = response.data.products
        this.isLoading = false;
        if(this.productList.length == 0){
          this.errorMessage = 'No Cart Exist For This User'
        }

        console.log(response);
        this._ToastrService.warning('Product removed successfully from your cart', '', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  updateCartProductCount(productId: string, count: number) {
    this.spinLoading = true;
    this._CartService.updateCartProductCount(productId, count).subscribe({
      next: (response: any) => {
        
        this.numberOfItem = response.numOfCartItems
        this.totalPrice = response.data.totalCartPrice
        this.productList = response.data.products
        this.spinLoading = false;
        console.log(response)
      },
      error: err => {
        console.log(err)
        this.spinLoading = false;
      }
    })
  }

  clearCart() {
    this.isLoading=true
    this._CartService.clearCart().subscribe({
      next: (response: any) => {
        this._CartService.numberOfCartItems.next(0);
        this.numberOfItem = 0
        this.totalPrice = 0
        this.productList = []
        this.isLoading = false;
        this.errorMessage = 'No Cart Exist For This User'
        console.log(response)
      },
      error: err => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }

}
