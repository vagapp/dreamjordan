import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  data : Product[]; /*= [
    {nid:0, mid : 0, name:"producto 1", price:10, audio:"naa", amount:1}
  ]*/
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
   

  constructor() { }

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  getCartItemCount(){
    return this.cartItemCount;
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
    }
    this.cartItemCount.next(this.cartItemCount.value + 1 );
    console.log("test",this.cart);
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

  insertPurchase(){
    console.log("Insertamos la compra");
  }

  getPurchasesByUser(){
    console.log("obtenemos las compras del usuario");
  }
}