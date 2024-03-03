import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private _ToastrService: ToastrService, private _CartService: CartService) { }
  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: any) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
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
