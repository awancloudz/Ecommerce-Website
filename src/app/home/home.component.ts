import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
//Product Service
import { ProductService } from '../product.service'
import { SlideService } from '../slide.service'
//Product Array
import { ProductArray } from '../product/productarray';
import { ActivatedRoute, Router } from '@angular/router';
import { CartArray } from '../cart/cartarray';
import { CartService } from '../cart.service';
import { ProfileArray } from '../profile/profilearray';
import { SlideArray } from '../profile/slidearray';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  entryComponents: [ AppComponent ]
})
export class HomeComponent implements AfterContentInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  id_users:Number;
  id_produk:Number;
  jumlah:Number;
  slideimg:any;
  productlist:ProductArray[]=[];
  cartlist:CartArray[]=[];
  profile:ProfileArray[]=[];
  slidelist:SlideArray[]=[];
  constructor(public appcomp:AppComponent,public slideservice:SlideService,public productservice:ProductService, public cartservice:CartService, public router:Router,) { }

  ngAfterContentInit():void{
    window.scrollTo(0, 0);
    //this.spinner.show();
    this.productservice.showproduct().subscribe(
      //Jika data sudah berhasil di load
      (data)=>{
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
    this.slideservice.showslide().subscribe(
      //Jika data sudah berhasil di load
      (data)=>{
        this.slidelist=data;
        var fotoslide=[];
        for(var i in data){
          fotoslide[i] = {
            judul:data[i].judul,
            deskripsi:data[i].deskripsi,
            foto:"http://localhost:8000/fotoupload/" + data[i].foto,
            judultombol:data[i].judultombol,
            link:data[i].judultombol,
          };
        }
        this.slideimg = fotoslide;
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
  selector: 'app-home',
  templateUrl: './home-faq.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeFaqComponent implements OnInit {

  constructor(){

  }

  ngOnInit(){
    window.scrollTo(0, 0);
  }
}
