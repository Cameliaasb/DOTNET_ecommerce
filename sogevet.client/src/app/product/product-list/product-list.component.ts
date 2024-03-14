import { Component, OnInit,Input   } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {



  products: Product[] = [];
  productsToDisplay: Product[] = [];
  productSubscription?: Subscription;
  filteredProducts?: Product[];
  categoryName?: string;
  filter: string = "";
  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  private router:Router) { }

  filterProducts(keyword?: string, min?: number, max?: number) {
    this.filteredProducts = this.productsToDisplay
    if (keyword) {
      this.filteredProducts = this.filteredProducts.filter(p => 
        p.name.toLowerCase().includes(keyword.toLowerCase()) || p.description.toLowerCase().includes(keyword.toLowerCase())
      )}
    if (max) {
      this.filteredProducts = this.filteredProducts.filter(p => p.unitPrice <= +max);
    }
    if (min) {
      this.filteredProducts = this.filteredProducts.filter(p => p.unitPrice >= +min);
    }
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      parametres => {
        if (parametres['categoryName'] != "") {
          this.categoryName = parametres['categoryName'];
          switch (this.categoryName) {
            case "men":
              this.categoryName = "Men"
              this.filter = "homme"
              break;
            case "women":
              this.categoryName = "Women"
              this.filter = "femme"
              break;
            case "child":
              this.categoryName = "Child"
              this.filter = "enfant"
              break;
            default:
              this.categoryName = "All Products";
              this.filter = "";
          }
        }
        if (this.filter == "") {
          this.productService.getProducts();
        } else {
          this.productService.getProductsFilter(this.filter);
        }
        /*console.log(this.categoryName);
        console.log(this.filter);*/
      }
    );

    
    

    this.productSubscription = this.productService.productsUpdated.subscribe(
      p => {
        
        this.products = p
        this.productsToDisplay = p;
        this.filteredProducts = p;
      }
    );
  }
}
