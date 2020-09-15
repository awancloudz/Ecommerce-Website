import { Component, OnInit } from '@angular/core';
import { CartArray } from '../cart/cartarray';
import { CartService } from '../cart.service';
import { ProfileArray } from '../profile/profilearray';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  entryComponents: [ AppComponent ]
})
export class CartComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  cartlist:any;
  profile:ProfileArray[]=[];
  constructor(public appcomp:AppComponent,public cartservice:CartService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    if(this.loginstatus != null){
      //this.spinner.show();
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];

      this.cartservice.showcart(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data:CartArray[])=>{
          this.cartlist=data;
          this.appcomp.showcart();
          //this.spinner.hide();
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
  editjumlah(item){
    this.cartservice.updatecart(new CartArray(item.id,item.id_users,item.id_produk,item.jumlah))
    .subscribe(
      (data:any)=>{

      },
      function(error){

      },
      function(){

      }
    );   
  }
  increment(i){
    var subtotal = 0;
    var jumlahkeranjang = this.cartlist["koleksi2"][0].jumlahkeranjang;
    for(var key in this.cartlist)
    {
      if(key == "koleksi"){
        if(this.cartlist[key][i].jumlah < 100)
        //Edit Jumlah
        this.cartlist[key][i].jumlah = this.cartlist[key][i].jumlah + 1;
        //Edit Total Belanja
        for(var a=0; a < jumlahkeranjang; a++){
          subtotal = subtotal + (this.cartlist[key][a].produk.hargajual * this.cartlist[key][a].jumlah);
        }
      }
      //Subtotal Baru
      if(key == "koleksi2"){
        this.cartlist[key][0].subtotal = subtotal;
      }
    }
    this.editjumlah(this.cartlist["koleksi"][i]);
  } 
  decrement(i){
    var subtotal = 0;
    var jumlahkeranjang = this.cartlist["koleksi2"][0].jumlahkeranjang;
    for(var key in this.cartlist)
    {
      if(key == "koleksi"){
        if(this.cartlist[key][i].jumlah > 1)
        //Edit Jumlah
        this.cartlist[key][i].jumlah = this.cartlist[key][i].jumlah - 1;
        //Edit Total Belanja
        for(var a=0; a < jumlahkeranjang; a++){
          subtotal = subtotal + (this.cartlist[key][a].produk.hargajual * this.cartlist[key][a].jumlah);
        }
      }
      //Subtotal Baru
      if(key == "koleksi2"){
        this.cartlist[key][0].subtotal = subtotal;
      }
    }
    this.editjumlah(this.cartlist["koleksi"][i]);
  }
  deletebutton(item){  
    //this.spinner.show();
    this.cartservice.deletecart(item).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{   
        //SUBTOTAL BARU
        /*var totalbeli = item.jumlah * item.produk.hargajual;
        var subtotalbaru = this.cartlist["koleksi2"][0].subtotal - totalbeli;
        this.cartlist["koleksi2"][0].subtotal = subtotalbaru;*/
        alert("Item Dihapus!");
        this.ngOnInit();
        //this.spinner.hide();

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
