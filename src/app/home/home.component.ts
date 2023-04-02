import { Component, ViewChild } from '@angular/core';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(ProductsComponent) pdt: ProductsComponent;
  filterFn(item:any){
    this.pdt.filterProducts(item);
  }
}
