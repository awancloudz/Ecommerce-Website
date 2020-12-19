import { Component, OnInit } from '@angular/core';
import { ProfileArray } from '../profile/profilearray';
import { CheckoutArray } from '../checkout/checkoutarray';
import { CheckoutConfirmationArray } from '../checkout/checkoutconfirmationarray';
import { CheckoutService } from '../checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ProfileStoreArray } from '../profile/profilestorearray';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  transactionlist:CheckoutArray[]=[];
  detaillist:CheckoutArray[]=[];
  profile:ProfileStoreArray[]=[];
  id_city:any;
  namakota:any;
  namaprovinsi:any;
  
  constructor(public route:ActivatedRoute,public profileservice:ProfileService,public checkoutservice:CheckoutService, public router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    if(this.loginstatus != null){
      //this.spinner.show();
      var idtransaksi = this.route.snapshot.paramMap.get('id');
      this.checkoutservice.view(idtransaksi).subscribe(
        //Jika data sudah berhasil di load
        (data:CheckoutArray[])=>{
          this.transactionlist=data;
          //this.spinner.hide();
          var id_user = data[0].id_users;
          //TAMPIL ALAMAT UTAMA
          this.profileservice.showamainddress(id_user).subscribe(
            (address)=>{
              this.id_city = address[0].id_kota;
              //TAMPIL KOTA & PROVINSI
              this.checkoutservice.showcity(this.id_city).subscribe(
                (datakota)=>{
                  this.namakota = datakota[0].namakota;
                  this.namaprovinsi = datakota[0].provinsi.namaprovinsi;
                },
                function (error){   
                },
                function(){
                }
              );
            },
            function (error){   
            },
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

      this.checkoutservice.detailransaction(idtransaksi).subscribe(
        //Jika data sudah berhasil di load
        (data:CheckoutArray[])=>{
          this.detaillist=data;
          //this.spinner.hide();
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

}
