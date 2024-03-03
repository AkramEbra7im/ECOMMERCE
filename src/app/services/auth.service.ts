import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://ecommerce.routemisr.com';
  userData = new BehaviorSubject(null);
  

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken'))
      this.decodeUserToken()
  }
  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken: any = jwtDecode(userToken);
    this.userData.next(decodedToken);
    console.log(this.userData);
  }
  signUp(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data)
  }

  signIn(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data)
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login'])
  }


  forgetPassword(userEmail:any):Observable<any>{
    return this._HttpClient.post( `${this.baseUrl}/api/v1/auth/forgotPasswords`,userEmail)
  }
  
  resetCode(code:any):Observable<any>{
  return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,{
    resetCode: code
  })
  }
  
  resetPassword(newPassword:any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,newPassword)
  }
}
