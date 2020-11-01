import { Component } from '@angular/core';
import { CartArray } from '../app/cart/cartarray';
import { CartService } from '../app/cart.service';
import { ProfileArray } from '../app/profile/profilearray';
import { ProfileStoreArray } from '../app/profile/profilestorearray';
import { ProfileService } from '../app/profile.service';
import { Router } from '@angular/router';
declare var $:any;
declare var jquery:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  loginstatus = localStorage.getItem('loginstatus');
  cartlist:any;
  profile:ProfileArray[]=[];
  profilestore:ProfileStoreArray[]=[];
  title = 'EcommerceWebsite';
  jumlahcart:any;
  loadAPI: Promise<any>;
  storename:any;
  constructor(public profileservice:ProfileService,public cartservice:CartService, public router:Router) {        
      this.loadAPI = new Promise((resolve) => {
          this.loadScript();
          resolve(true);
      });
      this.showcart();
      this.profileservice.showprofile().subscribe(
        //Jika data sudah berhasil di load
        (data)=>{
          for(var key in data){
            this.storename = data[key].nama;
          }
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
  }

  public loadScript() {        
      var isFound = false;
      var scripts = document.getElementsByTagName("script")
      for (var i = 0; i < scripts.length; ++i) {
          if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
              isFound = true;
          }
      }

      if (!isFound) {
          var dynamicScripts = [
            "../assets/js/vendor/modernizr-2.8.3.min.js",
            "../assets/js/vendor/jquery.min.js",
            "../assets/js/popper.min.js",
            "../assets/js/bootstrap.min.js",
            "../assets/js/plugins.js",
            "../assets/js/main.js",
          ];

          for (var i = 0; i < dynamicScripts.length; i++) {
              let node = document.createElement('script');
              node.src = dynamicScripts [i];
              node.type = 'text/javascript';
              node.async = false;
              node.charset = 'utf-8';
              document.getElementsByTagName('head')[0].appendChild(node);
          }

      }
  }

  showcart(){
    if(this.loginstatus != null){
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];
      this.cartservice.showcart(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data2:CartArray[])=>{
          this.cartlist=data2;
            for(var key in this.cartlist.koleksi2){
              this.jumlahcart = this.cartlist.koleksi2[key].jumlahkeranjang;
            }
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

  deletecart(item){  
    //this.spinner.show();
    this.cartservice.deletecart(item).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{   
        alert("Item Dihapus!");
        //this.spinner.hide();
        //location.reload();
        this.showcart();
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
  }

  logout(){
    localStorage.clear();
    alert("Logout sukses!");
    location.replace('register');
  }
}
