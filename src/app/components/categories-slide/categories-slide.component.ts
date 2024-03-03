import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-slide',
  templateUrl: './categories-slide.component.html',
  styleUrls: ['./categories-slide.component.css']
})
export class CategoriesSlideComponent implements OnInit {
  categoryList:Category[]=[];
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
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: reponse=>{
        this.categoryList = reponse.data;
        console.log(this.categoryList);
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }


  
}
