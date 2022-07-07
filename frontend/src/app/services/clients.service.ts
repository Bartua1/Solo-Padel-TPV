import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client.ts';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl: string = "http://87.220.9.58:3000/api/clients";

  constructor(private _httpClient: HttpClient) { }

  getClients() {
    return this._httpClient.get(this.baseUrl);
  }

  saveClient(client: Client){
    return this._httpClient.post(this.baseUrl, client);
  }

  deleteClient(client: string){
    return this._httpClient.delete(`http://87.220.9.58:3000/api/clients/${client}`);
  }
} 
