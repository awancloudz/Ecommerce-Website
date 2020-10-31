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
  saveproduct(item:ProductArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  editproduct(item:ProductArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deleteproduct(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
