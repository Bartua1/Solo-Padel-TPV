import { Component, OnInit } from '@angular/core';
import { ClientProduct } from 'src/app/models/clientproduct.ts';
import { ClientProductService } from 'src/app/services/clientproduct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-clientproduct',
  templateUrl: './create-clientproduct.component.html',
  styleUrls: ['./create-clientproduct.component.scss']
})
export class CreateClientProductComponent implements OnInit {

  public clientproduct: ClientProduct = new ClientProduct();

  constructor(private _clientproductService: ClientProductService,
              private _route: Router) { }

  ngOnInit(): void {
  }

  saveClient(){
    console.log('printing client', this.clientproduct);
    this._clientproductService.saveClientProduct(this.clientproduct).subscribe( clientproduct =>
      this._route.navigateByUrl('/clientproducts'));
  }

}
