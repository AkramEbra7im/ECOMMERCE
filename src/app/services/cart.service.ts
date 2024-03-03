import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  numberOfCartItems = new BehaviorSubject(0);
  baseUrl:string = 'https://ecommerce.routemisr.com';
  headers = {
    token: localStorage.getItem('userToken') || ''
  }
  constructor(private _HttpClient:HttpClient) {
    this.loggedUserCart().subscribe({
      next:(Response:any)=>{
        this.numberOfCartItems.next(Response.numOfCartItems);
      },
      error: err=>{
        console.log(err);
      }
    })
   }

  addProductToCart(productId:string){
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,{productId: productId},{headers: this.headers})
  }

  loggedUserCart(){
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,{headers: this.headers})
  }

  removeItemFromCart(productId:string){
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`,{headers: this.headers})
  }

  updateCartProductCount(productId:string,count:number){
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`,
    {count: count},
    {headers: this.headers})
  }

  clearCart(){
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,{headers: this.headers})
  }
}
