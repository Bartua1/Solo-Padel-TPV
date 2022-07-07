import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  public products: any = [];

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void{
    this._productsService.getProducts().subscribe(products => {
      this.products = products;
    })
  };
}