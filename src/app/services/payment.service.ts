import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userId:string =''
  baseUrl:string = 'https://ecommerce.routemisr.com';
  headers = {
    token: localStorage.getItem('userToken') || ''
  }
  
  constructor(private _HttpClient:HttpClient,private _AuthServic:AuthService) { 
    this._AuthServic.userData.subscribe((response:any)=>{
      this.userId =  response.id
    })
  }
    checkout(cartId:string,shippingAddress:any):Observable<any>
    {
      const encodedUrl = encodeURIComponent(`http://localhost:4200/#`);
      return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${encodedUrl}`,
      {shippingAddress:shippingAddress},{headers:this.headers})
    }

  getAllOrders():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${this.userId}`)
  }
}
