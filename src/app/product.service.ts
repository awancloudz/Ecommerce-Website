import { Injectable } from '@angular/core';
//Product Array
import { ProductArray } from '../app/product/productarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private items:ProductArray[]=[];
  private url:string="http://localhost:8000/productlist";
  constructor(public http: Http){ 

  }
  showproduct()
  {
    return this.http.get(this.url).pipe(
      map((response:Response)=>response.json())
    );
  }
  detailproduct(item)
  {
    return this.http.get(this.url + "/" + item).pipe(
      map((response:Response)=>response.json())
    );
  }
}
