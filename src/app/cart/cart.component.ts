import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private productsService: ProductsService) {}
  public cartItems: any[] =[];
  ngOnInit(): void {
    this.cartItems = this.productsService.getCartItems();
  }
}
