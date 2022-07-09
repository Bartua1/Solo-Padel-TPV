import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/client.ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  public clients: any = [];
  public client: Client = new Client();

  constructor(private _clientService: ClientsService,
              public modal: NgbModal,
              private _route: Router) { }

  ngOnInit(): void {
    this._clientService.getClients().subscribe(clients => {
      this.clients = clients;
    })
  }

  saveClient(){
    if(this.client.name!=undefined){
      this._clientService.saveClient(this.client).subscribe( client =>
        this._route.navigateByUrl('/clients'));
        window.location.reload();
    }
  }

}