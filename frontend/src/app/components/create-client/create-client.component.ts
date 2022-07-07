import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.ts';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  public client: Client = new Client();

  constructor(private _clientService: ClientsService,
              private _route: Router) { }

  ngOnInit(): void {
  }

  saveClient(){
    console.log('printing client', this.client);
    this._clientService.saveClient(this.client).subscribe( client =>
      this._route.navigateByUrl('/clients'));
  }

}
