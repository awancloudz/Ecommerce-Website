import { Component, OnInit } from '@angular/core';
//Product Service
import { CategoryService } from '../category.service'
import { ProductService } from '../product.service'
//Product Array
import { ProductArray } from '../product/productarray';
import { CategoryArray } from '../category/categoryarray';
import { ActivatedRoute, Router } from '@angular/router';
import { CartArray } from '../cart/cartarray';
import { CartService } from '../cart.service';
import { ProfileArray } from '../profile/profilearray';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  entryComponents: [ AppComponent ]
})
export class ProductComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  id_users:Number;
  id_produk:Number;
  jumlah:Number;
  productlist:ProductArray[]=[];
  cartlist:CartArray[]=[];
  profile:ProfileArray[]=[];
  categorylist:CategoryArray[]=[];
  constructor(public appcomp:AppComponent,public categoryservice:CategoryService,public productservice:ProductService, public cartservice:CartService, public router:Router) { }

  ngOnInit(){
    window.scrollTo(0, 0);
    //this.spinner.show();
    this.productservice.showproduct().subscribe(
      //Jika data sudah berhasil di load
      (data:ProductArray[])=>{
        this.productlist=data;
        //this.spinner.hide();
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );

    this.categoryservice.showcategory().subscribe(
      //Jika data sudah berhasil di load
      (data:CategoryArray[])=>{
        this.categorylist=data;
        //this.spinner.hide();
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
    
    if(this.loginstatus != null){
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];

      this.cartservice.showcart(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data2:CartArray[])=>{
          this.cartlist=data2;
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
    }
  }
  cartbutton(product){
    if(this.loginstatus != null){
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];

      var cartstatus = 0;
      var idproduct = product.id;

      for(var i=0; i < this.cartlist["koleksi"].length; i++){
        if(idproduct == this.cartlist["koleksi"][i].id_produk){
          cartstatus = 1;
        }
      }

      if(cartstatus == 0){
        this.cartservice.savecart(new CartArray(this.id,iduser,idproduct,1)).subscribe(
          //Jika data sudah berhasil di load
          (data)=>{
            this.cartlist["koleksi"].push(data);
            alert("Item Ditambah ke keranjang!");
            this.appcomp.showcart();
            //location.reload();
          },
          //Jika Error
          function (error){   
          },
          //Tutup Loading
          function(){
          }
        );
      }
      else{
        alert("Klik keranjang untuk edit jumlah!");
      } 
    }
    else{
      alert("Silahkan Login/Register terlebih dahulu!");
      this.router.navigate(['register']);
    }
  }

  wishlistbutton(product){
    
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product.component.css'],
  entryComponents: [ AppComponent ]
})
export class ProductDetailComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  id_users:Number;
  id_produk:Number;
  jumlah:Number;
  productlist:ProductArray[]=[];
  cartlist:CartArray[]=[];
  profile:ProfileArray[]=[];
  productForm: FormGroup;
  submitted = false;
  constructor(public appcomp:AppComponent,public route:ActivatedRoute, public router:Router,public productservice:ProductService, public cartservice:CartService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    //this.spinner.show();
    this.jumlah = 1;
    var idproduct = this.route.snapshot.paramMap.get('id');
    this.productservice.detailproduct(idproduct).subscribe(
      //Jika data sudah berhasil di load
      (data:ProductArray[])=>{
        this.productlist=data;
        //this.spinner.hide();
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
    if(this.loginstatus != null){
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];

      this.cartservice.showcart(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data2:CartArray[])=>{
          this.cartlist=data2;
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
    }
  }
  cartbutton(product){
    if(this.loginstatus != null){
      //this.spinner.show();
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];

      var cartstatus = 0;
      var idproduct = product.id;

      for(var i=0; i < this.cartlist["koleksi"].length; i++){
        if(idproduct == this.cartlist["koleksi"][i].id_produk){
          cartstatus = 1;
        }
      }

      if(cartstatus == 0){
        this.cartservice.savecart(new CartArray(this.id,iduser,idproduct,this.jumlah)).subscribe(
          //Jika data sudah berhasil di load
          (data)=>{
            this.cartlist["koleksi"].push(data);
            alert("Item Ditambah ke keranjang!");
            this.appcomp.showcart();
          },
          //Jika Error
          function (error){   
          },
          //Tutup Loading
          function(){
          }
        );
      }
      else{
        alert("Produk sudah ada di keranjang. Klik keranjang untuk edit jumlah!");
        //this.spinner.hide();
      }
    }
    else{
      alert("Silahkan Login/Register terlebih dahulu!");
      //this.spinner.hide();
      this.router.navigate(['register']);
    }
  }
  increment(){
    var jumlahproduk = this.jumlah;
    if(jumlahproduk > 0){
      jumlahproduk = Number(jumlahproduk) + 1;
      this.jumlah = jumlahproduk;
    }
    else if(jumlahproduk < 1){
      this.jumlah = 1;
    }
  } 
  decrement(){
    var jumlahproduk = this.jumlah;
    if(jumlahproduk > 1){
    jumlahproduk = Number(jumlahproduk) - 1;
    this.jumlah = jumlahproduk;
    }
    else if(jumlahproduk < 1){
      this.jumlah = 1;
    }
  }
  qtybutton(){
    var jumlahproduk = this.jumlah;
    if(jumlahproduk < 1){
      this.jumlah = 1;
    }
    if(this.jumlah == null){
      this.jumlah = 1;
    }
  }
}
