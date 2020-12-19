import { Injectable } from '@angular/core';
//Slide Array
import { SlideArray } from '../app/profile/slidearray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private items:SlideArray[]=[];
  private url:string="backend/slidelist";
  constructor(public http: Http) { }

  showslide(){
    return this.http.get(this.url).pipe(
      map((response:Response)=>response.json())
    );
  }
  detailslide(item)
  {
    return this.http.get(this.url + "/" + item).pipe(
      map((response:Response)=>response.json())
    );
  }
  deleteslide(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
