import { Injectable } from '@angular/core';
//Checkout Array
import { CheckoutArray } from '../app/checkout/checkoutarray';
import { CheckoutConfirmationArray } from '../app/checkout/checkoutconfirmationarray';
import { SaveresiArray } from '../app/checkout/saveresiarray';
import { TrackorderArray } from '../app/checkout/trackorderarray';
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
  private url_track:string="https://ruangapi.com/api/v1/waybill";
  private url_courier:string="https://ruangapi.com/api/v1/shipping";
  private url_rajaongkir:string="https://api.rajaongkir.com/starter/cost";
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
  searchtransaction(item:CheckoutArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url + "/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
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
  showongkirjne(cost){
    return this.http.get(this.url + "/asal/" + cost[0].origin + "/tujuan/" + cost[0].destination + "/berat/" + cost[0].weigth).pipe(
      map((response:Response)=>response.json())
    );
    /*let body = JSON.stringify(cost);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','key':'e200ef6f31f5ba64525f28725d4a980d'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url_rajaongkir,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));*/
  }
  showongkir(cost)
  {
    let body = JSON.stringify(cost);
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true,'Accept':'application/json','Content-Type': 'application/json','Authorization':'wOMvMSKBVoEgQoVHLwbpbTNJrSJI3GeD6R3sGqTa'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url_courier,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
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
  saveresi(item:SaveresiArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url + "/noresi",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  trackorder(order:TrackorderArray){
    let body = JSON.stringify(order);
    let headers = new Headers({ 'Access-Control-Allow-Credentials': true,'Accept':'application/json','Content-Type': 'application/json','Authorization':'wOMvMSKBVoEgQoVHLwbpbTNJrSJI3GeD6R3sGqTa'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url_track,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
