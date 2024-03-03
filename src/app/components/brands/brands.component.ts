import { Component } from '@angular/core';
import { Brand } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brandList:Brand[]=[];
  isLoading:boolean = true; 
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getAllBrands().subscribe({
      next: reponse=>{
        this.brandList = reponse.data;
        this.isLoading = false;
        console.log(this.brandList);
      },
      error: err=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
