import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {
  cartId:string = ''
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(),
    phone: new FormControl(),
    city: new FormControl()
  })
  constructor(private _PaymentService: PaymentService,private _ActivatedRoute:ActivatedRoute) { }
 



  submitShippingAddress(dataform: FormGroup) {
    this._ActivatedRoute.params.subscribe(params =>{
      this.cartId = params['id']
    })

    this._PaymentService.checkout(this.cartId,dataform.value).subscribe({
      next:response=>{
        window.location.href = response.session.url;
        console.log(response);
      },
      error: err=>{
        console.log(err);
      }
    })

  }
}
