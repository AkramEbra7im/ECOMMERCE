import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[],term:string): product[] {
    return productList.filter( product => product.title.toLowerCase().includes(term.toLowerCase()))
  }

}
