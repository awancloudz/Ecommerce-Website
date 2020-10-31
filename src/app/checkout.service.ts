import { Injectable } from '@angular/core';
//Checkout Array
import { CheckoutArray } from '../app/checkout/checkoutarray';
import { CheckoutConfirmationArray } from '../app/checkout/checkoutconfirmationarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private items:CheckoutArray[]=[];
  private items2:CheckoutConfirmationArray[]=[];
  private url:string="http://localhost:8000/transaction";
  private url2:string="http://localhost:8000/citylist";
  constructor(public http: Http) { 

  }
  showcity(idcity)
  {
    return this.http.get(this.url2 + "/" + idcity).pipe(
      map((response:Response)=>response.json())
    );
  }
  showtransaction(user)
  {
    return this.http.get(this.url + "/" + user).pipe(
      map((response:Response)=>response.json())
    );
  }
  view(trans)
  {
    return this.http.get(this.url + "/view/" + trans).pipe(
      map((response:Response)=>response.json())
    );
  }
  detailransaction(trans)
  {
    return this.http.get(this.url + "/detail/" + trans).pipe(
      map((response:Response)=>response.json())
    );
  }
  showcheckout(kode)
  {
    return this.http.get(this.url + "/checkout/" + kode).pipe(
      map((response:Response)=>response.json())
    );
  }
  showongkir(cost)
  {
    return this.http.get(this.url + "/asal/" + cost[0].origin + "/tujuan/" + cost[0].destination + "/berat/" + cost[0].weigth).pipe(
      map((response:Response)=>response.json())
    );
  }
  savetransaction(item:CheckoutArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  saveconfirmation(order){
    let body = JSON.stringify(order);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url + "/confirmation",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
