import { Component, OnInit } from '@angular/core';
import { ProfileArray } from '../profile/profilearray';
import { CheckoutArray } from '../checkout/checkoutarray';
import { CheckoutConfirmationArray } from '../checkout/checkoutconfirmationarray';
import { CheckoutService } from '../checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  loginstatus = localStorage.getItem('loginstatus');
  transactionlist:CheckoutArray[]=[];
  detaillist:CheckoutArray[]=[];
  constructor(public route:ActivatedRoute,public checkoutservice:CheckoutService, public router:Router) { }

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
    }
  }

}
