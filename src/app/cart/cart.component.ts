import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private productsService: ProductsService) {}
  public cartItems ={};
  public pdts: any;
  public cartPdts =[];
  isResized: boolean = window.innerWidth > 700 ? true : false;

  onValueChange(event, item){
    if(event.target.value <= item.quantity && event.target.value != '' &&  event.target.value > 0)this.cartItems[item.id] = parseInt(event.target.value);
    else {
      if(event.target.value != '' && event.target.value <= 0) window.alert('Maximum quantity =' + item.quantity + '!!.');
      event.target.value = this.cartItems[item.id];
    }
    this.productsService.setCartPdts(this.cartItems);
  }

  onResize(event){
    if(event.target.innerWidth > 700) this.isResized =  true;
    else this.isResized = false;
  }

  delete(item){
    if(this.cartItems[item.id] > 1){
      this.cartItems[item.id] -= 1;
    }else{
      this.cartItems[item.id] = 0;
      this.cartPdts = [];
      this.pdts.forEach(item => {
        if(this.cartItems[item.id] > 0){
          this.cartPdts.push(item);
        }
      });
      this.productsService.setCartPdts(this.cartItems);
    }
  }

  buy(){
    this.cartPdts.forEach(item => {
      this.cartItems[item.id] = 0;
    })
    this.cartPdts = [];
    window.alert('Thank you for the purchase. Your total Amount was Rs.' + this.totalAmount() +'.  Please visit us again!!! ')

  }

  totalAmount(){
    let amount = [];
    this.cartPdts.forEach(item => {
      amount.push(item.price * this.cartItems[item.id])
    })
    return amount.reduce((a, b) => a + b, 0);

  }

  ngOnInit(): void {
    this.cartItems = this.productsService.getCartItems();
    this.productsService.getproducts().subscribe(resp=>{
      this.pdts = resp;
      this.pdts.forEach(item => {
        if(this.cartItems[item.id] > 0){
          this.cartPdts.push(item);
        }
      });
    })
  }
}
