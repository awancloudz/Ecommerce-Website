import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Profile Service
import { ProfileService } from '../profile.service';
import { CheckoutService } from '../checkout.service';
//Profile Array
import { ProfileArray } from '../profile/profilearray';
import { ProfileCityArray } from '../profile/profilecityarray';
import { ProfileAddressArray } from '../profile/profileaddressarray';
import { CheckoutArray } from '../checkout/checkoutarray';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  nama:String;
  email:String;
  nohp:Number;
  password:String;
  alamat:String;
  id_kota:Number;

  id_users:Number;
  namaalamat:String;
  kodepos:String;
  utama:String;

  items:ProfileArray[]=[];
  citylist:ProfileCityArray[]=[];
  addresslist:ProfileAddressArray[]=[];
  transactionlist:CheckoutArray[]=[];
  constructor(public checkoutservice:CheckoutService,public profileservice:ProfileService, public router:Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(){
    window.scrollTo(0, 0);
    if(this.loginstatus != null){
      //this.spinner.show();
      this.items = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.items[0]['id'];

      //1. PROFILE
      this.profileservice.showuser(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data:ProfileArray[])=>{
          this.items=data;
          for(var key in data){
            this.id = data[key].id;
            this.nama = data[key].nama;
            this.email = data[key].email;
            this.nohp = data[key].nohp;
          }
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );

      //2. ALAMAT
      this.profileservice.showaddress(iduser).subscribe(
        //Jika data sudah berhasil di load
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

      //3. TRANSAKSI
      this.checkoutservice.showtransaction(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data:CheckoutArray[])=>{
          this.transactionlist=data;
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

  savebutton(){
    //this.spinner.show();
    this.profileservice.updateuser(new ProfileArray(this.id,this.nama,this.email,this.nohp,this.password,this.alamat,this.id_kota))
    .subscribe(
      (data:ProfileArray[])=>{
        alert("Update sukses!");
        //this.spinner.hide();
        this.ngOnInit();
      },
      function(error){

      },
      function(){

      }
    );
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

  delbutton(address){
    //this.spinner.show();
    this.profileservice.deleteaddress(address.id).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{   
        alert("Alamat Dihapus!");
        //this.spinner.hide();
        this.ngOnInit();
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

@Component({
  selector: 'app-profile',
  templateUrl: './profileaddress.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileAddressComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  nama:String;
  nohp:Number;
  alamat:String;
  id_kota:Number;
  id_users:Number;
  namaalamat:String;
  kodepos:String;
  utama:String;
  profile:ProfileArray[]=[];
  citylist:ProfileCityArray[]=[];

  addressForm: FormGroup;
  submitted = false;
  constructor(public profileservice:ProfileService,public router:Router,
              private formBuilder: FormBuilder){

  }
  ngOnInit(){
    window.scrollTo(0, 0);
    this.addressForm = this.formBuilder.group({
      namaalamat: ['', Validators.required],
      nama: ['', Validators.required],
      nohp: ['', Validators.required],
      alamat: ['', Validators.required],
      id_kota: ['', Validators.required],
      kodepos: ['', Validators.required],
    });
    if(this.loginstatus != null){
      //this.spinner.show();
      this.profileservice.showcity().subscribe(
        //Jika data sudah berhasil di load
        (data:ProfileCityArray[])=>{
          this.citylist=data;
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
  get f() { return this.addressForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addressForm.invalid) {
        return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.savebutton();
  }

  savebutton(){
    if(this.loginstatus != null){
      //this.spinner.show();
      this.profile = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.profile[0]['id'];
      
      this.profileservice.showaddress(iduser).subscribe(
        //Jika data sudah berhasil di load
        (data2)=>{
          for(var key in data2){
            if(data2[key].id == null){
              this.utama = "1";
            }
            else{
              this.utama = "2";
            }
          }

          this.profileservice.createaddress(new ProfileAddressArray(this.id,iduser,this.id_kota,this.namaalamat,this.nama,this.alamat,this.kodepos,this.nohp,this.utama))
          .subscribe(
            (data:ProfileAddressArray[])=>{
              alert("Simpan Alamat sukses!");
              //this.spinner.hide();
              this.router.navigate(['profile']);
            },
            function(error){

            },
            function(){

            }
          );
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
}