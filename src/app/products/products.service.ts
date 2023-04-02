import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public cartItems: any[]=[];
  public productsURL: string = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';//https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json
  constructor( private http: HttpClient) { }
  setCartPdts(item:any){
    this.cartItems.push(item);
  }

  getCartItems(){
    return this.cartItems;
  }

  getproducts(){
    return this.http.get(this.productsURL);
  }

}
