import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryList:Category[]=[];
  isLoading:boolean = true; 
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: reponse=>{
        this.categoryList = reponse.data;
        this.isLoading = false;
        console.log(this.categoryList);
      },
      error: err=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

}
