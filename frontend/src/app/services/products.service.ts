import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.ts';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private PoP: string = '192.168.1.30';
  private baseUrl: string = "http://"+this.PoP+":3000/api/products";

  constructor(private _httpClient: HttpClient) { }

  getProducts() {
    return this._httpClient.get(this.baseUrl);
  }

  saveProduct(product: Product){
    return this._httpClient.post(this.baseUrl, product);
  }

  modifyProduct(product: Product){
    return this._httpClient.put(this.baseUrl+`/${product._id}`, product);
  }
}
