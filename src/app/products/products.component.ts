import { Component } from '@angular/core';
import { Products } from '../product.util';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public pdts: any;
  public apiRes:any;
  public colours: string[] = [];
  public genders: string[] = [];
  public prices: string[] = [];
  public types: string[] = [];
  public cartItems = {};
  constructor(private productsService: ProductsService){}

  addToCart(item: any): void{
    this.cartItems[item.id] += 1;
    //this.productsService.setCartPdts(item);
  }

  removeFromCart(item: any){
    this.cartItems[item.id] -= 1;
  }

  filterProducts(data:any){
    this.pdts = this.apiRes;
    if(data.color.length > 0){
      let a:any[]=[];
      data.color.forEach(item=>{
       a = a.concat(this.pdts.filter(x=>x.color === item));
      })
      this.pdts = a
    }
    if(data.gender.length > 0){
      let a:any[]=[];
      data.gender.forEach(item=>{
        a = a.concat(this.pdts.filter(x=>x.gender === item));
      })
      this.pdts = a;
    }
    if(data.price.length > 0){
      let a:any[]=[];
      data.price.forEach(item=>{
        a = a.concat(this.pdts.filter(x=>x.price === item));
      })
      this.pdts = a;
    }
    if(data.type.length > 0){
      let a:any[]=[];
      data.type.forEach(item=>{
        a = a.concat(this.pdts.filter(x=>x.type === item));
      })
      this.pdts = a;
    }
  }

  ngOnInit(){
    this.productsService.getproducts().subscribe((res)=>{
      this.apiRes = res;
      this.pdts = this.apiRes;
      this.pdts.forEach(item =>{
        this.cartItems[item.id] = 0
      })
    });
  }
}
