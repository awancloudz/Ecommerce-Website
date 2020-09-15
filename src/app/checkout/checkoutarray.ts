export class CheckoutArray {
    constructor ( 
        public id:Number, public kodetransaksi:String, public id_users:Number,public id_alamat:Number, 
        public tanggal:String, public totaldiskon:Number, public totalbelanja:Number, 
        public totalongkir:Number, public subtotal:Number, public kurir:String, 
        public layanan:String, public status:String, public jenis:String 
        
    ){}
}