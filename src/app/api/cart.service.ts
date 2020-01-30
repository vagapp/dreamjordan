import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../api/user.service';
import { map } from 'rxjs/operators';
import { CommonService } from '../api/common.service';
import {StorageService, Item} from '../api/storage.service';

export interface Product{
  nid:number;
  mid:number;
  name:string;
  field_costo:number;
  field_media_audio_file:string;
  amount:number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  data : Product[]; 
  itemsCarrito :any;
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  
  constructor(private nativeStorage: NativeStorage,
    public US : UserService,
    public http: HttpClient,
    public co: CommonService,
    private storage : StorageService) { }

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }
  
  getCartItemCount(){
    return this.cartItemCount;
  }

  setCartItemCount(value){
    console.log("valllll",value);
    this.cartItemCount.next(value);
  }

  addProduct(product){
    let added = false;
    for(let p of this.cart){
      if(p.nid === product.nid && p.mid === product.mid){
        p.amount += 1;
        added = true;
        break;
      }
    }
    if(!added){
      this.cart.push(product);
      let item = {id: product.nid, element: this.cart}
    }
    this.cartItemCount.next(this.cartItemCount.value + 1 );
    //console.log("test",this.cart);
    
  }

  decreaseProduct(product){
    /*for(let [index,p] of this.cart.entries()){
      if(p.nid === product.nid){
        p.ammount -= 1;
        if(p.ammount == 0){
          this.cart.splice(index,1);
        }
      }
    }*/
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product){
    /*for(let [index, p] of this.cart.entries()){
      if(p.nid === product.nid){
        this.cartItemCount.next(this.cartItemCount.value - p.ammount);
        this.cart.splice(index,1);
      }
    }*/
  }

  emptyCart(){
    this.cart = [];
    this.cartItemCount.next(0);
  }

  getPurchasesByUser(){
    console.log("obtenemos las compras del usuario");
  }

  insertPurchase(){
    this.itemsCarrito = this.buildBodyJson();
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'X-CSRF-Token': this.US.account.csrf_token
    });
    let datos =  {
      "type":"checkout",
      "title":"hola mundo Checkout",
      "field_transactionid":[{"value":"prueba"}],
      "field_elementos":this.itemsCarrito
    };
    return this.http.post(
      this.co.API+'user/checkout?_format=json',
      JSON.stringify(datos),
      { headers: headers, withCredentials: true }).pipe(
        map(
          res => { 
            return res;
          },
          (err: HttpErrorResponse) => { 
            console.log(err);
          }
        )
      );
  }

  //funcion que arma el json con los items seleccionados para la compra
  buildBodyJson(){
    let item :any;
    let itemsCarrito = [];
    this.cart.forEach( function(obj) {
      item = {
        "type": "carrito_compra",
        "title":obj.name,
        "field_cantidad_articulo":[{"value":obj.amount}],
			  "field_costo_articulo":[{"value":obj.field_costo}],
			  "field_costo_total":[{"value":(obj.field_costo*obj.amount)}],
			  "field_nombre_articulo":[{"value":obj.name}],
			  "field_tour":[{"target_id":obj.nid}],
        "field_audio":[{"target_id":obj.mid}]
      };
      itemsCarrito.push(item);
    });
    return itemsCarrito;
   // console.log("objeto completo",this.itemsCarrito);
  }

}