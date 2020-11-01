import { Injectable } from '@angular/core';
//Category Array
import { CategoryArray } from '../app/category/categoryarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private items:CategoryArray[]=[];
  private url:string="http://localhost:8000/categorylist";
  constructor(public http: Http) { 

  }
  showcategory(){
    return this.http.get(this.url).pipe(
      map((response:Response)=>response.json())
    );
  }
  detailcategory(item)
  {
    return this.http.get(this.url + "/" + item).pipe(
      map((response:Response)=>response.json())
    );
  }
  deletecategory(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
