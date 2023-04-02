import { Component, ViewChild } from '@angular/core';
import { ProductsComponent } from '../products/products.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'TeeRex-Store';
  isResized: boolean = window.innerWidth > 775 ? true : false;
  @ViewChild(ProductsComponent) pdt: ProductsComponent;

  filterFn(item:any){
    this.pdt.filterProducts(item);
  }
  onResize(event){
    if(event.target.innerWidth > 775) this.isResized =  true;
    else this.isResized = false;
  }

}
