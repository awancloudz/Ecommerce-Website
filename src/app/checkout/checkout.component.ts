import { Component, OnInit } from '@angular/core';
import { CartArray } from '../cart/cartarray';
import { CartService } from '../cart.service';
import { ProfileService } from '../profile.service';
import { ProfileArray } from '../profile/profilearray';
import { ProfileStoreArray } from '../profile/profilestorearray';
import { ProfileAddressArray } from '../profile/profileaddressarray';
import { ProfileCityArray } from '../profile/profilecityarray';
import { CheckoutArray } from '../checkout/checkoutarray';
import { CheckongkirArray } from '../checkout/checkongkirarray';
import { CheckoutService } from '../checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  nama:String;
  email:String;
  nohp:Number;
  password:String;
  alamat:String;
  id_kecamatan:Number;
  id_kota:Number;
  namakecamatan:any;
  namakota:any;
  service:any;
  kodepos:String;

  kodetransaksi:String;
  id_users:Number;
  id_alamat:Number;
  tanggal:String;
  totaldiskon:Number;
  totalbelanja:Number;
  totalongkir:Number;
  subtotal:Number;
  kurir:String;
  layanan:String;
  status:String;
  jenis:String;

  costservice:any;
  costlist:any;
  cartlist:any;
  profile:ProfileArray[]=[];
  citylist:ProfileCityArray[]=[];
  addresslist:ProfileAddressArray[]=[];

  checkoutForm: FormGroup;
  submitted = false;
  constructor(public profileservice:ProfileService, public cartservice:CartService,private formBuilder: FormBuilder,
  public checkoutservice:CheckoutService, public router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    //this.spinner.show();
    this.checkoutForm = this.formBuilder.group({
      kurir: ['', Validators.required],
      service: ['', Validators.required],
    });
    if(this.loginstatus != null){
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];

      //CART
      this.cartservice.showcart(iduser).subscribe(
        (data:CartArray[])=>{
          this.cartlist=data;
          //MAIN ADDRESS
          this.profileservice.showamainddress(iduser).subscribe(
            (data)=>{
              this.profile=data;
              for(var key in data){
                this.id_users = data[key].id_users;
                this.id_alamat = data[key].id;
                this.id_kota = data[key].id_kota;
                this.id_kecamatan = data[key].id_kecamatan;
                this.namakota = data[key].kota.namakota;
                this.namakecamatan = data[key].kecamatan.namakecamatan;
              }
              //this.spinner.hide();
              //this.kurir = 'jnt';
              //this.hitungongkir();
            },
            //Jika Error
            function (error){   
            },
            //Tutup Loading
            function(){
            }
          );

        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );

      // OTHER ADDRESS
      this.profileservice.showaddress(iduser).subscribe(
        (data:ProfileAddressArray[])=>{
          this.addresslist=data;
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
  hitungongkir(){
    //this.spinner.show();
    //HITUNG BIAYA ONGKIR
    var asal = 399;
    var berat = 0;
    var kurir = this.kurir;
    for(var key in this.cartlist['koleksi']){
      berat = berat + this.cartlist['koleksi'][key].produk.berat;
    }
          
    if(kurir == 'jne'){
      var tujuan = this.id_kota;
      this.cartlist['koleksi2'][0].totalbayar = this.cartlist['koleksi2'][0].subtotal;
      this.cartlist['koleksi2'][0].totalongkir = 0;
      this.costservice = [{origin : asal, destination : tujuan, weigth : berat, courier : kurir}];
      this.checkoutservice.showongkirjne(this.costservice).subscribe(
        //Jika data sudah berhasil di load
        (data3)=>{
          this.costlist=data3;
          if(this.costlist.length == 0){
            alert("Maaf,layanan tidak tersedia!");
          }
          else{
            this.service = this.costlist[0].cost;
            this.servicebutton();
          }
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
    else{
      var tujuan = this.id_kecamatan;
      this.cartlist['koleksi2'][0].totalbayar = this.cartlist['koleksi2'][0].subtotal;
      this.cartlist['koleksi2'][0].totalongkir = 0;
      this.checkoutservice.showongkir(new CheckongkirArray(asal,tujuan,berat,kurir)).subscribe(
        //Jika data sudah berhasil di load
        (data3)=>{
          this.costlist=data3.data['results'];
          if(this.costlist.length == 0){
            alert("Maaf,layanan tidak tersedia!");
          }
          else{
            this.service = parseInt(this.costlist[0].cost);
            this.servicebutton();
          }
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

  servicebutton(){
    var totalongkir = parseInt(this.service);
    var totalbelanja = 0;
    var totalbayar = 0;

    totalbelanja = this.cartlist['koleksi2'][0].subtotal;
    totalbayar = totalbelanja + totalongkir;

    this.cartlist['koleksi2'][0].totalongkir = totalongkir;
    this.cartlist['koleksi2'][0].totalbayar = totalbayar;
  }

  get f() { return this.checkoutForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
        alert("Layanan Kurir Belum Dipilih");
        return;
    }

    this.confirmbutton();
  }
  confirmbutton(){
    if((this.loginstatus != null) && (this.service != '')){
      //this.spinner.show();
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var tigadigit;
      do {
        tigadigit = Math.floor(Math.random() * 999);
      } while (tigadigit < 100);

      var kodetransaksi = this.cartlist['koleksi2'][0].kodepenjualan;
      var totalbelanja = this.cartlist['koleksi2'][0].subtotal;
      var totalongkir = this.cartlist['koleksi2'][0].totalongkir;
      var totalbayar = this.cartlist['koleksi2'][0].totalbayar + tigadigit;
      var tanggal = this.formatDate();

      this.checkoutservice.savetransaction(new CheckoutArray(this.id,kodetransaksi,this.id_users,this.id_alamat,tanggal,this.totaldiskon,
        totalbelanja,totalongkir,totalbayar,this.kurir,this.service,'order','retail')).subscribe(
        //Jika data sudah berhasil di load
        (data)=>{
          alert("Pembelian sukses,silahkan melakukan pembayaran!");
          //this.spinner.hide();
          this.router.navigate(['finish/',kodetransaksi]);
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
      alert("Silahkan pilih layanan pengiriman!");
    }
  }
  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  setbutton(address){
    //this.spinner.show();
    this.profileservice.setaddress(address)
    .subscribe(
      (data:ProfileArray[])=>{
        alert("Update alamat sukses!");
        //this.spinner.hide();
        this.ngOnInit();
      },
      function(error){

      },
      function(){

      }
    );
  }
}

@Component({
  selector: 'app-checkout-finish',
  templateUrl: './checkout-finish.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutFinishComponent implements OnInit {
  profile:ProfileStoreArray[]=[];
  subtotal:any;
  constructor(public profileservice:ProfileService,public checkoutservice:CheckoutService,public route:ActivatedRoute, public router:Router){

  }

  ngOnInit(){
    window.scrollTo(0, 0);
    var kodetransaksi = this.route.snapshot.paramMap.get('id');
    this.checkoutservice.showcheckout(kodetransaksi).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{
        this.subtotal=data[0].subtotal;
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );

    //PROFILE TOKO
    this.profileservice.showprofile().subscribe(
      //Jika data sudah berhasil di load
      (data:ProfileStoreArray[])=>{
        this.profile=data;
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


