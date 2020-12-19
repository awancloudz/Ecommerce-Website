import { Injectable } from '@angular/core';
//Profile Array
import { ProfileArray } from '../app/profile/profilearray';
import { ProfileAddressArray } from '../app/profile/profileaddressarray';
import { ProfileStoreArray } from '../app/profile/profilestorearray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private items:ProfileArray[]=[];
  private url:string="backend/userlogin";
  private url2:string="backend/citylist";
  private url3:string="backend/user";
  private url4:string="backend/profile";
  private url5:string="backend/districtlist";
  constructor(public http: Http){ 
    
  }
  showprofile()
  {
    return this.http.get(this.url4).pipe(
      map((response:Response)=>response.json())
    );
  }
  loginuser(item:ProfileArray)
  {
    return this.http.get(this.url + "/" + item.email +"/password/"+item.password).pipe(
      map((response:Response)=>response.json())
    );
  }
  showcity()
  {
    return this.http.get(this.url2).pipe(
      map((response:Response)=>response.json())
    );
  }
  showdistrict(id)
  {
    return this.http.get(this.url5+"/"+id).pipe(
      map((response:Response)=>response.json())
    );
  }
  showuser(iduser)
  {
    return this.http.get(this.url3 + "/" + iduser).pipe(
      map((response:Response)=>response.json())
    );
  }
  searchuser(item:ProfileArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url3 + "/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  createuser(item:ProfileArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url3,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  updateuser(item:ProfileArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url3,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  updatestore(item:ProfileStoreArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url4,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  showaddress(iduser)
  {
    return this.http.get(this.url3 + "/address/" + iduser).pipe(
      map((response:Response)=>response.json())
    );
  }
  showamainddress(iduser)
  {
    return this.http.get(this.url3 + "/address/main/" + iduser).pipe(
      map((response:Response)=>response.json())
    );
  }
  setaddress(item){
    return this.http.get(this.url3 + "/setaddress/" + item.id).pipe(
      map((response:Response)=>response.json())
    );
  }
  createaddress(item:ProfileAddressArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url3 + "/address",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deleteaddress(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url3 + "/address/" + item,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
