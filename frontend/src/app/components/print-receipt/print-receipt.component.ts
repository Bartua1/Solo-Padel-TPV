import { Component, OnInit } from '@angular/core';
import { ClientProductService } from 'src/app/services/clientproduct.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.scss']
})
export class PrintReceiptComponent implements OnInit {

  public clientproducts: any = [];
  public id: string | null;
  public client: string | null;
  public total: number = 0;

  constructor(private route: ActivatedRoute,
              private _route: Router,
              private _clientproductsService: ClientProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.client = this.route.snapshot.queryParamMap.get('client');
    this._clientproductsService.getClientProducts(this.id!).subscribe(clientproducts=> {
      this.clientproducts = clientproducts;
      for(let cps of this.clientproducts){
        this.total = this.total + Number((Number(cps.quantity)*Number(cps.price)).toFixed(2));
      }
    });
  }

  print(){
    window.print();
  }
  goBack(){
    if(this.id!='Separar'){
      this._route.navigateByUrl(`clients/${this.id}`);
    }
    else{
      this._route.navigateByUrl(`clients/${this.client}`);
    }
  }

  deleteSeparar(){
    if(this.id=='Separar'){
      for(let cp of this.clientproducts){
        this._clientproductsService.deleteClientProduct(cp).subscribe(response => {});
      }
    }
  }
}
