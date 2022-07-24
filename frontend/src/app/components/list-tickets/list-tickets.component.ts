import { Component, OnInit } from '@angular/core';
import { ClientProductService } from 'src/app/services/clientproduct.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientProduct } from 'src/app/models/clientproduct.ts';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.ts';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {

  public tickets: any = [];
  public datetime: string;

  constructor(private route: ActivatedRoute,
              public modal: NgbModal,
              private _route: Router,
              private _ticketsService: TicketsService) { }

  ngOnInit(): void {
    this._ticketsService.getTickets().subscribe(tickets=>{
      this.tickets=tickets;
    });
  }

  printDate(ticket: Ticket){
    let date = new Date(ticket.date);
    this.datetime = date.getDate() + "/"
      + (date.getMonth()+1)  + "/" 
      + date.getFullYear() + " "
      + date.getHours() + ":"  
      + date.getMinutes() + ":" 
      + date.getSeconds();
  }

}
