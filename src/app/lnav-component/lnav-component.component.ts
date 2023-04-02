import { Component, EventEmitter, Output } from '@angular/core';
//import { Products } from '../product.util'; // dummy data
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-lnav-component',
  templateUrl: './lnav-component.component.html',
  styleUrls: ['./lnav-component.component.css']
})
export class LnavComponentComponent {
  public pdts: any;
  public colours: any[] = [];
  public genders: any[] = [];
  public prices: any[] = [];
  public types: any[] = [];
  public filter = {
    color: [],
    gender: [],
    price: [],
    type: []
  };
  @Output() filterItems = new EventEmitter();
  constructor(private productsService: ProductsService){}

  onSelect(event, item:any){
    if(event.currentTarget.checked){
      if(item.color){
        this.filter.color.push(item.color)
      }else if(item.price){
        this.filter.price.push(item.price);
      }else if(item.gender){
        this.filter.gender.push(item.gender)
      }else{
        this.filter.type.push(item.type)
      }
      this.filterItems.emit(this.filter);
    }else{
      if(item.color){
        let ind = this.filter.color.findIndex(x=> x == item.color);
        this.filter.color.splice(ind, 1);
      }else if(item.price){
        let ind = this.filter.price.findIndex(x=> x == item.price);
        this.filter.price.splice(ind, 1);
      }else if(item.gender){
        let ind = this.filter.gender.findIndex(x=> x == item.gender);
        this.filter.gender.splice(ind, 1);
      }else{
        let ind = this.filter.type.findIndex(x=> x == item.type);
        this.filter.type.splice(ind, 1);
      }
      this.filterItems.emit(this.filter);
    }
  }

  ngOnInit(){
    //getting data from server
    this.productsService.getproducts().subscribe(resp=>{
      this.pdts = resp;
      // filtering the pdts table to create lnav
      this.pdts.forEach((item:any) =>{
        if(!this.colours.some(items=> items.color == item.color)) this.colours.push({'color':item.color});
        if(!this.genders.some(items=> items.gender == item.gender)) this.genders.push({'gender':item.gender});
        if(!this.prices.some(items=> items.price == item.price)) this.prices.push({'price':item.price});
        if(!this.types.some(items=> items.type == item.type)) this.types.push({'type':item.type});
      });
    })
  }
}
