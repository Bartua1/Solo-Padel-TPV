import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientProduct } from 'src/app/models/clientproduct.ts';

@Injectable({
  providedIn: 'root'
})
export class ClientProductService {
  private PoP: string = '192.168.1.30';
  private baseUrl: string = "http://"+this.PoP+":3000/api/clientproducts";
  constructor(private _httpClient: HttpClient) { }

  getClientsProducts(){
    return this._httpClient.get(this.baseUrl);
  }

  getClientProducts(id: String) {
    return this._httpClient.get(this.baseUrl+`/${id}`);
  }

  saveClientProduct(clientproduct: ClientProduct){
    return this._httpClient.post(this.baseUrl, clientproduct);
  }

  deleteClientProduct(clientproduct: ClientProduct){
    return this._httpClient.delete(this.baseUrl+`/${clientproduct._id}`);
  }

  getClientProductsByProduct(client: String, product: String) {
    return this._httpClient.get(this.baseUrl+`/${client}/${product}`);
  }

  saveClientProductsByProduct(clientproduct: ClientProduct) {
    return this._httpClient.put(this.baseUrl+`/${clientproduct._id}`, clientproduct);
  }
}
