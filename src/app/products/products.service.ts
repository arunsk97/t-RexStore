import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public cartItems ={};
  public filter = {};
  public productsURL: string = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';//https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json
  constructor( private http: HttpClient) { }

  setCartPdts(item:any){
    this.cartItems = item;
  }

  getCartItems(){
    return this.cartItems;
  }

  getproducts(){
    return this.http.get(this.productsURL);
  }

  setFilter(data){
    this.filter = data;
  }

  getFilter(){
    return this.filter;
  }


}
