import { Component, ViewChild } from '@angular/core';
//service to get various data
import { ProductsService } from './products.service';
import { LnavComponentComponent } from '../lnav-component/lnav-component.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  //@Output() applyFilter = new EventEmitter();
  @ViewChild(LnavComponentComponent) lnav:LnavComponentComponent;
  isResized: boolean = window.innerWidth < 775 ? true : false;
  public pdts: any;
  public apiRes:any;
  public filteredData: any;
  public colours: string[] = [];
  public genders: string[] = [];
  public prices: string[] = [];
  public types: string[] = [];
  public cartItems = {};
  constructor(private productsService: ProductsService){}

  //setting cart data
  addToCart(item: any): void{
    if(this.cartItems[item.id] < item.quantity) this.cartItems[item.id] += 1;
    //when maximum quantity is reached throws alert
    else window.alert('Maximum quantity reached!!!');
    this.productsService.setCartPdts(this.cartItems);
  }

  removeFromCart(item: any){
    this.cartItems[item.id] -= 1;
  }

  showFilter(){
    const elem = document.getElementById('popup')
    elem.style.display = 'block';
  }


  apply(){
    let data = this.lnav.filter;
    this.filterProducts(data);
    this.closeFilter();
  }

  closeFilter(){
    const elem = document.getElementById('popup')
    elem.style.display = 'none';
  }


  onResize(event){
    if(event.target.innerWidth < 775) this.isResized =  true;
    else this.isResized = false;
  }

  //filtering data through search bar
  onSearch(event){
    this.pdts = this.filteredData;
    if(event.target.value && event.target.value != '' && event.target.value != null){
      this.pdts = this.pdts.filter(x=> x.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  //filtering data according to the filter from Left filter component
  filterProducts(data:any){
    this.pdts = this.apiRes;
    this.filteredData = this.pdts;
    if(data.color.length > 0){
      let a:any[]=[];
      data.color.forEach(item=>{
       a = a.concat(this.pdts.filter(x=>x.color === item));
      })
      this.filteredData = a
    }
    if(data.gender.length > 0){
      let a:any[]=[];
      data.gender.forEach(item=>{
        a = a.concat(this.filteredData.filter(x=>x.gender === item));
      })
      this.filteredData = a;
    }
    if(data.price.length > 0){
      let a:any[]=[];
      data.price.forEach(item=>{
        a = a.concat(this.filteredData.filter(x=>x.price === item));
      })
      this.filteredData = a;
    }
    if(data.type.length > 0){
      let a:any[]=[];
      data.type.forEach(item=>{
        a = a.concat(this.filteredData.filter(x=>x.type === item));
      })
      this.filteredData = a;
    }
    this.pdts = this.filteredData;
  }


  //initializing data for the component
  ngOnInit(){
    //checking for cart data from service
    this.cartItems = this.productsService.getCartItems();
    //subscribing http call to get product list
    this.productsService.getproducts().subscribe((res)=>{
      this.apiRes = res;
      this.pdts = this.apiRes;
      this.filteredData = this.apiRes;
      if(Object.keys(this.cartItems).length == 0){
        this.pdts.forEach(item =>{
          this.cartItems[item.id] = 0
        })
      }
      this.productsService.setCartPdts(this.cartItems);
    },
    //handling error scenerio
    (error)=>{
      window.alert(error + ', Error while retriving product data!')
    });
  }
}
