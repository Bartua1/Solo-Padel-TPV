import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientProduct } from 'src/app/models/clientproduct.ts';

@Injectable({
  providedIn: 'root'
})
export class ClientProductService {
  private baseUrl: string = "http://87.220.9.58:3000/api/clientproducts";
  constructor(private _httpClient: HttpClient) { }

  getClientsProducts(){
    return this._httpClient.get(this.baseUrl);
  }

  getClientProducts(id: String) {
    return this._httpClient.get(`http://87.220.9.58:3000/api/clientproducts/${id}`);
  }

  saveClientProduct(clientproduct: ClientProduct){
    return this._httpClient.post(this.baseUrl, clientproduct);
  }

  deleteClientProduct(clientproduct: ClientProduct){
    return this._httpClient.delete(`http://87.220.9.58:3000/api/clientproducts/${clientproduct._id}`);
  }

  getClientProductsByProduct(client: String, product: String) {
    return this._httpClient.get(`http://87.220.9.58:3000/api/clientproducts/${client}/${product}`);
  }

  saveClientProductsByProduct(clientproduct: ClientProduct) {
    return this._httpClient.put(`http://87.220.9.58:3000/api/clientproducts/${clientproduct._id}`, clientproduct);
  }
}
