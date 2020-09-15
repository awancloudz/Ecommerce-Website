import { Injectable } from '@angular/core';
//Cart Array
import { CartArray } from '../app/cart/cartarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items:CartArray[]=[];
  private url:string="http://localhost:8000/cartlist";
  constructor(public http: Http){ 

  }
  showcart(user)
  {
    return this.http.get(this.url + "/" + user).pipe(
      map((response:Response)=>response.json())
    );
  }
  savecart(item:CartArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  updatecart(item:CartArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deletecart(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id, 
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
