import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Profile Service
import { ProfileService } from '../profile.service';
import { CheckoutService } from '../checkout.service';
import { ProductService } from '../product.service'
//Profile Array
import { ProfileArray } from '../profile/profilearray';
import { ProfileStoreArray } from '../profile/profilestorearray';
import { ProfileCityArray } from '../profile/profilecityarray';
import { ProfileAddressArray } from '../profile/profileaddressarray';
import { CheckoutArray } from '../checkout/checkoutarray';
import { ProductArray } from '../product/productarray';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";

declare var $:any;

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
  role:String;
  id_users:Number;
  namaalamat:String;
  kota:String;
  kodepos:String;
  utama:String;
  bank:String;
  namarekening:String;
  nomorrekening:String;

  items:ProfileArray[]=[];
  citylist:ProfileCityArray[]=[];
  addresslist:ProfileAddressArray[]=[];
  transactionlist:CheckoutArray[]=[];
  productlist:ProductArray[]=[];
  profile:ProfileStoreArray[]=[];
  
  constructor(public productservice:ProductService, public checkoutservice:CheckoutService,public profileservice:ProfileService, public router:Router) { }

  ngOnInit(){
    window.scrollTo(0, 0);
    if(this.loginstatus != null){
      //this.spinner.show();
      this.items = JSON.parse(localStorage.getItem("editprofile"));
      var iduser = this.items[0]['id'];
      this.role =this.items[0]['role'];

        // TRANSAKSI
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

      if(this.role == 'customer'){
        // PROFILE USER
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

        //ALAMAT
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
      }
      else if(this.role == 'admin'){
        //PRODUK ADMIN
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

        // CUSTOMER
        this.profileservice.showuser(iduser).subscribe(
          //Jika data sudah berhasil di load
          (data:ProfileArray[])=>{
            this.items=data;
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
            for(var key in data){
              this.id = data[key].id;
              this.nama = data[key].nama;
              this.alamat = data[key].alamat;
              this.kota = data[key].kota;
              this.nohp = data[key].nohp;
              this.bank = data[key].bank;
              this.namarekening = data[key].namarekening;
              this.nomorrekening = data[key].nomorrekening;
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

  savebuttonstore(){
    //this.spinner.show();
    this.profileservice.updatestore(new ProfileStoreArray(this.id,this.nama,this.alamat,this.kota,this.nohp,this.bank,this.namarekening,this.nomorrekening))
    .subscribe(
      (data:ProfileStoreArray[])=>{
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

  konfirmasipesanan(order){
    this.checkoutservice.saveconfirmation(order)
    .subscribe(
      (data)=>{
        alert("Pesanan sudah dikonfirmasi.")
        this.ngOnInit();
      },
      function(error){

      },
      function(){

      }
    );
  }

  delproduct(product){
    //this.spinner.show();
    this.productservice.deleteproduct(product).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{   
        alert("Produk Dihapus!");
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

@Injectable()

@Component({
  selector: 'app-profile',
  templateUrl: './profileaddproduct.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileAddProductComponent implements OnInit {
  id:any;
  kodeproduk:any;
  namaproduk:any;
  deskripsi:any;
  foto:any;
  foto2:any;
  foto3:any;
  foto4:any;
  foto5:any;
  hargajual:any;
  hargagrosir:any;
  hargabeli:any;
  link:any;
  stok:any;
  berat:any;
  //ImageUpload
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  fileData2: File = null;
  previewUrl2:any = null;
  fileUploadProgress2: string = null;
  fileData3: File = null;
  previewUrl3:any = null;
  fileUploadProgress3: string = null;
  fileData4: File = null;
  previewUrl4:any = null;
  fileUploadProgress4: string = null;
  fileData5: File = null;
  previewUrl5:any = null;
  fileUploadProgress5: string = null;
  productForm: FormGroup;
  submitted = false;
  constructor(public router:Router, public productservice:ProductService,private formBuilder: FormBuilder,private http: HttpClient){

  }

  ngOnInit(){
    window.scrollTo(0, 0);
    this.productForm = this.formBuilder.group({
      kodeproduk: ['', Validators.required],
      namaproduk: ['', Validators.required],
      deskripsi: ['', Validators.nullValidator],
      foto: ['', Validators.nullValidator],
      foto2: ['', Validators.nullValidator],
      foto3: ['', Validators.nullValidator],
      foto4: ['', Validators.nullValidator],
      foto5: ['', Validators.nullValidator],
      hargajual: ['', Validators.required],
      hargagrosir: ['', Validators.nullValidator],
      link: ['', Validators.nullValidator],
      hargabeli: ['', Validators.required],
      stok: ['', Validators.required],
      berat: ['', Validators.required],
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.simpan();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  fileProgress2(fileInput2: any) {
    this.fileData2 = <File>fileInput2.target.files[0];
    this.preview2();
  }

  fileProgress3(fileInput3: any) {
    this.fileData3 = <File>fileInput3.target.files[0];
    this.preview3();
  }

  fileProgress4(fileInput4: any) {
    this.fileData4 = <File>fileInput4.target.files[0];
    this.preview4();
  }

  fileProgress5(fileInput5: any) {
    this.fileData5 = <File>fileInput5.target.files[0];
    this.preview5();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result;
    }
  }

  preview2() {
    // Show preview 
    var mimeType = this.fileData2.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader2 = new FileReader();      
    reader2.readAsDataURL(this.fileData2); 
    reader2.onload = (_event) => { 
      this.previewUrl2 = reader2.result;
    }
  }
  
  preview3() {
    // Show preview 
    var mimeType = this.fileData3.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader3 = new FileReader();      
    reader3.readAsDataURL(this.fileData3); 
    reader3.onload = (_event) => { 
      this.previewUrl3 = reader3.result;
    }
  }

  preview4() {
    // Show preview 
    var mimeType = this.fileData4.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader4 = new FileReader();      
    reader4.readAsDataURL(this.fileData4); 
    reader4.onload = (_event) => { 
      this.previewUrl4 = reader4.result;
    }
  }

  preview5() {
    // Show preview 
    var mimeType = this.fileData5.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader5 = new FileReader();      
    reader5.readAsDataURL(this.fileData5); 
    reader5.onload = (_event) => { 
      this.previewUrl5 = reader5.result;
    }
  }

  simpan(){
    const formData = new FormData();  
    formData.append('id', this.id);
    formData.append('kodeproduk', this.kodeproduk);
    formData.append('namaproduk', this.namaproduk);
    formData.append('deskripsi', this.deskripsi);
    formData.append('foto', this.fileData);
    formData.append('foto2', this.fileData2);
    formData.append('foto3', this.fileData3);
    formData.append('foto4', this.fileData4);
    formData.append('foto5', this.fileData5);
    formData.append('hargabeli', this.hargabeli);
    formData.append('hargagrosir', this.hargagrosir);
    formData.append('hargajual', this.hargajual);
    formData.append('link', this.link);
    formData.append('stok', this.stok);
    formData.append('berat', this.berat);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    
    this.fileUploadProgress = '0%';

      this.http.post('http://localhost:8000/productlist', formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
        'responseType': 'text'   
      })
      .subscribe(events => {
        if(events.type === HttpEventType.UploadProgress) {
          if(this.previewUrl){
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl2){
            this.fileUploadProgress2 = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl3){
            this.fileUploadProgress3 = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl4){
            this.fileUploadProgress4 = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl5){
            this.fileUploadProgress5 = Math.round(events.loaded / events.total * 100) + '%';
          }
        } 
        else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          alert("Simpan Produk sukses!");
          this.submitted = false;
          this.router.navigate(['profile']);
        }  
      })
  }
  
  buatlink(){
    $('#namaproduk').on('input', function() {
      var permalink;
      // Trim empty space
      permalink = $.trim($(this).val());
    
      // replace more then 1 space with only one
      permalink = permalink.replace(/\s+/g,' ');
  
      $('#link').val(permalink.toLowerCase());
      $('#link').val($('#link').val().replace(/\W/g, ' '));
      $('#link').val($.trim($('#link').val()));
      $('#link').val($('#link').val().replace(/\s+/g, '-'));
    });
    this.link = $('#link').val();
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profileeditproduct.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileEditProductComponent implements OnInit {
  id:any;
  kodeproduk:any;
  namaproduk:any;
  deskripsi:any;
  foto:any;
  foto2:any;
  foto3:any;
  foto4:any;
  foto5:any;
  idfoto1:any;
  idfoto2:any;
  idfoto3:any;
  idfoto4:any;
  idfoto5:any;
  fotoedit1:any;
  fotoedit2:any;
  fotoedit3:any;
  fotoedit4:any;
  fotoedit5:any;
  hargajual:any;
  hargagrosir:any;
  hargabeli:any;
  link:any;
  stok:any;
  berat:any;
  //ImageUpload
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  fileData2: File = null;
  previewUrl2:any = null;
  fileUploadProgress2: string = null;
  fileData3: File = null;
  previewUrl3:any = null;
  fileUploadProgress3: string = null;
  fileData4: File = null;
  previewUrl4:any = null;
  fileUploadProgress4: string = null;
  fileData5: File = null;
  previewUrl5:any = null;
  fileUploadProgress5: string = null;
  productlist:ProductArray[]=[];
  productForm: FormGroup;
  submitted = false;
  constructor(public route:ActivatedRoute, public router:Router,public productservice:ProductService,private formBuilder: FormBuilder,private http: HttpClient){

  }

  ngOnInit(){
    window.scrollTo(0, 0);
    var idproduct = this.route.snapshot.paramMap.get('id');
    this.productservice.detailproduct(idproduct).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{
        this.productlist=data;
        console.log(this.productlist);
        //this.spinner.hide();
        for(var key in data){
          this.id = data[key].id;
          this.kodeproduk = data[key].kodeproduk;
          this.namaproduk = data[key].namaproduk;
          this.deskripsi = data[key].deskripsi;
          this.foto = data[key].foto;
          this.link = data[key].link;
          this.hargajual = data[key].hargajual;
          this.hargagrosir = data[key].hargagrosir;
          this.hargabeli = data[key].hargabeli;          
          this.stok = data[key].stok;
          this.berat = data[key].berat;
          this.fotoedit1 = data[key].fotoproduk[0].foto;
          this.idfoto1 = data[key].fotoproduk[0].id;
          this.fotoedit2 = data[key].fotoproduk[1].foto;
          this.idfoto2 = data[key].fotoproduk[1].id;
          this.fotoedit3 = data[key].fotoproduk[2].foto;
          this.idfoto3 = data[key].fotoproduk[2].id;
          this.fotoedit4 = data[key].fotoproduk[3].foto;
          this.idfoto4 = data[key].fotoproduk[3].id;
          this.fotoedit5 = data[key].fotoproduk[4].foto;
          this.idfoto5 = data[key].fotoproduk[4].id;
        }
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );

    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      kodeproduk: ['', Validators.required],
      namaproduk: ['', Validators.required],
      deskripsi: ['', Validators.nullValidator],
      foto: ['', Validators.nullValidator],
      foto2: ['', Validators.nullValidator],
      foto3: ['', Validators.nullValidator],
      foto4: ['', Validators.nullValidator],
      foto5: ['', Validators.nullValidator],
      hargajual: ['', Validators.required],
      hargagrosir: ['', Validators.nullValidator],
      link: ['', Validators.nullValidator],
      hargabeli: ['', Validators.required],
      stok: ['', Validators.required],
      berat: ['', Validators.required],
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.simpan();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  fileProgress2(fileInput2: any) {
    this.fileData2 = <File>fileInput2.target.files[0];
    this.preview2();
  }

  fileProgress3(fileInput3: any) {
    this.fileData3 = <File>fileInput3.target.files[0];
    this.preview3();
  }

  fileProgress4(fileInput4: any) {
    this.fileData4 = <File>fileInput4.target.files[0];
    this.preview4();
  }

  fileProgress5(fileInput5: any) {
    this.fileData5 = <File>fileInput5.target.files[0];
    this.preview5();
  }
  
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result;
    }
  }

  preview2() {
    // Show preview 
    var mimeType = this.fileData2.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader2 = new FileReader();      
    reader2.readAsDataURL(this.fileData2); 
    reader2.onload = (_event) => { 
      this.previewUrl2 = reader2.result;
    }
  }
  
  preview3() {
    // Show preview 
    var mimeType = this.fileData3.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader3 = new FileReader();      
    reader3.readAsDataURL(this.fileData3); 
    reader3.onload = (_event) => { 
      this.previewUrl3 = reader3.result;
    }
  }

  preview4() {
    // Show preview 
    var mimeType = this.fileData4.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader4 = new FileReader();      
    reader4.readAsDataURL(this.fileData4); 
    reader4.onload = (_event) => { 
      this.previewUrl4 = reader4.result;
    }
  }

  preview5() {
    // Show preview 
    var mimeType = this.fileData5.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader5 = new FileReader();      
    reader5.readAsDataURL(this.fileData5); 
    reader5.onload = (_event) => { 
      this.previewUrl5 = reader5.result;
    }
  }

  simpan(){
    const formData = new FormData();  
    formData.append('id', this.id);
    formData.append('kodeproduk', this.kodeproduk);
    formData.append('namaproduk', this.namaproduk);
    formData.append('deskripsi', this.deskripsi);
    formData.append('foto', this.fileData);
    formData.append('foto2', this.fileData2);
    formData.append('foto3', this.fileData3);
    formData.append('foto4', this.fileData4);
    formData.append('foto5', this.fileData5);
    formData.append('idfoto1', this.idfoto1);
    formData.append('idfoto2', this.idfoto2);
    formData.append('idfoto3', this.idfoto3);
    formData.append('idfoto4', this.idfoto4);
    formData.append('idfoto5', this.idfoto5);
    formData.append('hargabeli', this.hargabeli);
    formData.append('hargagrosir', this.hargagrosir);
    formData.append('hargajual', this.hargajual);
    formData.append('link', this.link);
    formData.append('stok', this.stok);
    formData.append('berat', this.berat);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    
    this.fileUploadProgress = '0%';

      this.http.post('http://localhost:8000/productlist/edit', formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
        'responseType': 'text'   
      })
      .subscribe(events => {
        if(events.type === HttpEventType.UploadProgress) {
          if(this.previewUrl){
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl2){
            this.fileUploadProgress2 = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl3){
            this.fileUploadProgress3 = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl4){
            this.fileUploadProgress4 = Math.round(events.loaded / events.total * 100) + '%';
          }
          if(this.previewUrl5){
            this.fileUploadProgress5 = Math.round(events.loaded / events.total * 100) + '%';
          }
        } else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          alert("Edit Produk sukses!");
          this.submitted = false;
          this.router.navigate(['profile']);
        }  
      })
  }

  buatlink(){
    $('#namaproduk').on('input', function() {
      var permalink;
      // Trim empty space
      permalink = $.trim($(this).val());
    
      // replace more then 1 space with only one
      permalink = permalink.replace(/\s+/g,' ');
  
      $('#link').val(permalink.toLowerCase());
      $('#link').val($('#link').val().replace(/\W/g, ' '));
      $('#link').val($.trim($('#link').val()));
      $('#link').val($('#link').val().replace(/\s+/g, '-'));
    });
    this.link = $('#link').val();
  }
}