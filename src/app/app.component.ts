import { Component } from '@angular/core';
import { ProductsService } from './products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeeRex-Store';
  cartItems: {};
  isResized: boolean = window.innerWidth > 775 ? true : false;
  public isHome: boolean = true;
  constructor(private productsService: ProductsService){}

  cartTotal(){
    this.cartItems = this.productsService.getCartItems();
    this.isHome = window.URL.toString().includes('/Cart') ? false : true;
    return Object.values(this.cartItems).reduce((a: number, b: number)=> a + b, 0)
  }

  onResize(event){
    if(event.target.innerWidth > 775) this.isResized =  true;
    else this.isResized = false;
  }
}
