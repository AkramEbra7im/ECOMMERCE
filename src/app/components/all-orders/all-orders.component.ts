import { Component } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  isLoading: boolean = true;
  ordersList: any[] = []
  constructor(public _PaymentService: PaymentService) { }
  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    this._PaymentService.getAllOrders().subscribe({
      next: response => {

        this.ordersList = response
        console.log(response);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

}
