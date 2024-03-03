import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  numberOfCartItems: number = 0
  isLogin: boolean = false;
  constructor(public _AuthService: AuthService, private _CartService: CartService) { }

  ngOnInit(): void {
    this._CartService.numberOfCartItems.subscribe({
      next: response => {
        this.numberOfCartItems = this._CartService.numberOfCartItems.getValue();
      },
      error: err => {
        console.log(err);

      }
    })

    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() != null)
          this.isLogin = true;
        else
          this.isLogin = false;
      }
    })

  }
}
