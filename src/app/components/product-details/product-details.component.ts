import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  isLoading: boolean = true;
  productItem: any;
  productId: string = '';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute,public _AddToCartService:AddToCartService ) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.productId = params['id']
    })
    this._ProductService.getProductById(this.productId).subscribe({
      next: response => {
        this.productItem = response.data;
        console.log(this.productItem);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
