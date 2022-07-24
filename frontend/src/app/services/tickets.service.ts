import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.ts'

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private PoP: string = '192.168.1.30';
  private baseUrl: string = "http://"+this.PoP+":3000/api/tickets";
  constructor(private _httpClient: HttpClient) { }

  getTickets(){
    return this._httpClient.get(this.baseUrl);
  }

  saveTicket(ticket: Ticket){
    return this._httpClient.post(this.baseUrl, ticket);
  }

  modifyTicket(ticket: Ticket){
    return this._httpClient.put(this.baseUrl+`/${ticket._id}`, ticket);
  }
}
