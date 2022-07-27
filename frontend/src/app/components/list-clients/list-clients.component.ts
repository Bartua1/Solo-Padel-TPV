import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientProductService } from 'src/app/services/clientproduct.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/client.ts';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  public clients: any = [];
  public clientsFilter: any = [];
  public clientproducts: any = [];
  public client: Client = new Client();
  public filter = "";

  constructor(private _clientService: ClientsService,
              private _clientproductsService: ClientProductService,
              public modal: NgbModal,
              private _route: Router) { }

  ngOnInit(): void {
    this._clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.clientsFilter = clients;
    });
    this._clientproductsService.getClientsProducts().subscribe(clientproducts => {
      this.clientproducts = clientproducts;
    });
  }

  saveClient(){
    if(this.client.name!=undefined){
      this._clientService.saveClient(this.client).subscribe( client =>
        this._route.navigateByUrl('/clients'));
        window.location.reload();
    }
  }

  filterClients(){
    if(this.filter!=''){
      this.clientsFilter = JSON.parse(JSON.stringify(this.clients)).filter((x: any)=>x.name.includes(this.filter));
    }
    else {
      this.clientsFilter = this.clients;
    }
  }

  getTotal(client: Client){
    var r = JSON.parse(JSON.stringify(this.clientproducts)).filter((x: any)=>x.client==client.name);
    return r.map((x:any)=>x.price*x.quantity).reduce((a: any, b:any) => a + b, 0);
  }

}