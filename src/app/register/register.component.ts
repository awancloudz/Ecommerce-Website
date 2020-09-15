import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Profile Service
import { ProfileService } from '../profile.service';
//Profile Array
import { ProfileArray } from '../profile/profilearray';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  id:Number;
  nama:String;
  email:String;
  nohp:Number;
  password:String;
  alamat:String;
  id_kota:Number;

  items:ProfileArray[]=[];
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  submitted2 = false;
  constructor(public profileservice:ProfileService, public router:Router,
    private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.formBuilder.group({
      nama: ['', Validators.required],
      nohp: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      //acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get f() { return this.loginForm.controls; }
  get g() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loginbutton();
  }

  onSubmit2() {
    this.submitted2 = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.registerbutton();
  }

  loginbutton(){
    //this.spinner.show();
    this.profileservice.loginuser(new ProfileArray(this.id,this.nama,this.email,this.nohp,this.password,this.alamat,this.id_kota)).subscribe(
      //Jika data sudah berhasil di load
      (data:ProfileArray[])=>{
        this.items=data;
        localStorage.setItem("editprofile", JSON.stringify(data));
        for(var key in data)
        {
          if((data[key].email != null) && (data[key].password != null)){
            localStorage.setItem('loginstatus', 'login');
            this.loginstatus = 'login';
            this.email = "";
            this.password = "";
            //this.spinner.hide();
            location.replace('profile');
          }
          else{
            alert("Email / Password Salah");
            //this.spinner.hide();
          }
        }
        // this.router.navigateByUrl('home', { skipLocationChange: false }).then(() => {
        //   this.router.navigate(['home']);
        // });
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
  } 

  registerbutton(){
    //this.spinner.show();
    this.profileservice.createuser(new ProfileArray(this.id,this.nama,this.email,this.nohp,this.password,this.alamat,this.id_kota))
    .subscribe(
      (data:ProfileArray[])=>{
        alert("Registrasi sukses! Silahkan login.");
        location.reload();
        //this.spinner.hide();
        //this.router.navigate(['profile']);
      },
      function(error){
        alert("Registrasi gagal! Silahkan ulangi.");
        //this.spinner.hide();
      },
      function(){

      }
    );
  }
}
