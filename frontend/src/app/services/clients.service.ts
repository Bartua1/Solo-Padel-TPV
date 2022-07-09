import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client.ts';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private PoP: string = '192.168.1.30';
  private baseUrl: string = "http://"+this.PoP+":3000/api/clients";

  constructor(private _httpClient: HttpClient) { }

  getClients() {
    return this._httpClient.get(this.baseUrl);
  }

  saveClient(client: Client){
    return this._httpClient.post(this.baseUrl, client);
  }

  deleteClient(client: string){
    return this._httpClient.delete(this.baseUrl+`/${client}`);
  }
} 
