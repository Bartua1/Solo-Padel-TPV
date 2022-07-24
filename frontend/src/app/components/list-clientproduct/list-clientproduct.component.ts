import { Component, OnInit } from '@angular/core';
import { ClientProductService } from 'src/app/services/clientproduct.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientProduct } from 'src/app/models/clientproduct.ts';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ClientsService } from 'src/app/services/clients.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { Product } from 'src/app/models/product.ts';
import { Ticket } from 'src/app/models/ticket.ts';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-clientproduct',
  templateUrl: './list-clientproduct.component.html',
  styleUrls: ['./list-clientproduct.component.scss']
})
export class ListClientproductComponent implements OnInit {
  quantityToAdd: number = 1;
  public quantitiesToAdd: any = [];
  public clientproducts: any = [];
  public clientproductsToSplit: any = [];
  public clientproduct: ClientProduct = new ClientProduct();
  public clients: any = [];
  public products: any = [];
  public ps: ClientProduct = new ClientProduct();
  public total: number = 0;
  public totalToSplit: number = 0;
  public ProductType: string = 'Productos';
  public PT = new Set();
  public ProductTypes: any =[];
  public ProductToAdd: Product = new Product();
  public allCsPs: any = [];
  public nombre: string = '';
  public id: string | null;
  public product: Product = new Product();

  constructor(private _clientproductsService: ClientProductService,
              private route: ActivatedRoute,
              public modal: NgbModal,
              private _route: Router,
              private _productsService: ProductsService,
              private _clientsService: ClientsService,
              private _ticketsService: TicketsService) { }

  ngOnInit(): void {
    this._clientsService.getClients().subscribe(clients=> {
      this.clients = clients;
    });
    this.quantitiesToAdd = [];
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this._clientproductsService.getClientProducts(this.id!).subscribe(clientproducts=> {
      this.clientproducts = clientproducts;
      this.clientproductsToSplit = JSON.parse(JSON.stringify(clientproducts));
      for(let cps of this.clientproductsToSplit){
        this.total = this.total + Number((Number(cps.quantity)*Number(cps.price)).toFixed(2));
        cps.quantity=0;
      }
    });
    this._productsService.getProducts().subscribe(products => {
      this.products = products;
      for(let p of this.products){
        this.PT.add(p.type);
      }
      this.ProductTypes = Array.from(this.PT);
      this.products=[];
    });
  }

  updateProductToAdd(prod: Product){
    this.ProductToAdd = prod;
    this.quantitiesToAdd =this.quantitiesToAdd.filter((x: any)=> x.type == prod.type);
  }

  selectProductType(type: string){
    this.ProductType=type;
    if(this.ProductType!='Separar'){
      this.quantitiesToAdd.length=0;
      this._productsService.getProducts().subscribe(products => {
        this.products = products;
        this.products = this.products.filter((x: any)=>x.type==type);
        for(let p of this.products){
          if(p.type!=type){
            const obj = {
              'name': p.name,
              'quantity': 1,
              'type': p.type
            }
            this.quantitiesToAdd.push(obj);
          }
        }
      });
    }
    else {
      this._clientproductsService.getClientProducts(this.id!).subscribe(clientproducts=> {
        this.clientproductsToSplit = JSON.parse(JSON.stringify(clientproducts));
        this.total = 0;
        for(let cps of this.clientproductsToSplit){
          this.total = this.total + Number((Number(cps.quantity)*Number(cps.price)).toFixed(2));
          cps.quantity=0;
        }
      });
    }
  }

  // A function that deletes a product
  deleteProductFromClient(prod: Product){
    this.ps = this.clientproducts.find((x: any) => x.product == prod.name);
    if(this.ps.quantity==1){
      this._clientproductsService.deleteClientProduct(this.ps).subscribe(response => {});
      window.location.reload();
    }
    else{
      this.ps.quantity=this.ps.quantity-1;
      this._clientproductsService.saveClientProductsByProduct(this.ps).subscribe(response => {});
    }
    this.total=this.total-prod.price;
  }

  // A function that adds a product to a user
  addProduct(prod: Product, q: number){
    console.log('index:'+q);
    const b = Number(this.quantitiesToAdd.filter((x: any) => x.name == prod.name)[0].quantity);
    this.ps = this.clientproducts.find((x: any) => x.product == prod.name);
    if(this.ps==undefined && b > 0){
      const a: ClientProduct = new ClientProduct();
      a.product=prod.name;
      a.client=this.id!;
      a.quantity=b;
      a.price=prod.price;
      a.iva=prod.iva;
      this._clientproductsService.saveClientProduct(a).subscribe(response => {
        this._route.navigateByUrl(`clients/${this.id}`);
      });
      this.total=this.total+(a.quantity*a.price);
      this.clientproducts.push(a);
    }
    else{
      this.ps.quantity=this.ps.quantity+b;
      this._clientproductsService.saveClientProductsByProduct(this.ps).subscribe(response => {});
      this.total=this.total+(this.ps.price*b);
    }
    this.ProductType='Productos';
  }

  saveClient(){
    console.log(this.clientproduct);
    this._clientproductsService.saveClientProduct(this.clientproduct).subscribe( clientproduct =>
      this._route.navigateByUrl('/clientproducts'));
  }

  saveProduct() {
    if(this.product.iva==undefined){
      this._productsService.getProducts().subscribe(products => {
        let prods: any = []; prods = products;
        this.product.iva = prods.filter((x: any)=>x.type==this.product.type)[0].iva
      });
    }
    this._productsService.saveProduct(this.product).subscribe( product => {
       if(product){
        this._route.navigateByUrl('/clients');
      }});
  }

  modifyProduct(){
    this._productsService.modifyProduct(this.ProductToAdd).subscribe( product => {
      for (let a of this.clientproducts) {
        this._clientproductsService.getClientsProducts().subscribe( csps => {
          this.allCsPs = csps;
          for (let cp of this.allCsPs){
            if(cp.product == this.ProductToAdd.name){
              this.ps = cp;
              this.ps.price = this.ProductToAdd.price;
              this.ps.iva = this.ProductToAdd.iva;
              this._clientproductsService.saveClientProductsByProduct(this.ps).subscribe(response => {});
            }
          }
        })
      }
    })
  }

  deleteClient(c: string){
    this._clientsService.deleteClient(c).subscribe(response => {
      this._route.navigateByUrl('/clients');
    });
  }

  printReceipt(){
    this._route.navigateByUrl(`printreceipt/${this.id}`);
  }

  splitBills(prod: string, upOrDown: boolean){
    for(let cp of this.clientproductsToSplit){
      if(cp.product==prod){
        let cp1 = this.clientproducts.filter((obj: any)=> {return obj.product == cp.product})[0].quantity;
        //upOrDown?cp1.quantity>cp.quantity?cp.quantity++:cp:cp.quantity>0?cp.quantity--:cp;
        if(upOrDown){
          if(cp1>cp.quantity){
            cp.quantity++;
            this.totalToSplit=this.totalToSplit+cp.price;
          }
        }
        else if (upOrDown==false){
          if(cp.quantity>0){
            cp.quantity--;
            this.totalToSplit=Number((this.totalToSplit-cp.price).toFixed(2));
          }
        }
      }
    }
  }

  printSplit(){
    for(let cp of this.clientproducts){
      let cp1 = this.clientproductsToSplit.filter((obj: any)=> {return obj.product == cp.product})[0];
      if(cp1.quantity>0){
        cp.quantity=cp.quantity-cp1.quantity;
        if(cp.quantity==0){
          this._clientproductsService.deleteClientProduct(cp).subscribe(response => {});
        } else{
          this._clientproductsService.saveClientProductsByProduct(cp).subscribe(response => {});
        }
        let cp2 = new ClientProduct();
        cp2.client='Separar';
        cp2.iva=cp1.iva;
        cp2.price=cp1.price;
        cp2.product=cp1.product;
        cp2.quantity=cp1.quantity;
        this._clientproductsService.saveClientProduct(cp2).subscribe(response => {});
      }
    }
    this._route.navigateByUrl(`printreceipt/Separar?client=${this.id}`);
  }

  paySplit(){
    this._clientproductsService.getClientProducts(this.id!).subscribe(clientproducts=> {
      this.clientproducts = clientproducts;
      let finalclientproducts: any = [];
      // for(let cp of this.clientproducts){
      //   let cp1 = this.clientproductsToSplit.filter((obj: any)=> {return obj.product == cp.product})[0].quantity;
      //   cp.quantity=cp.quantity-cp1;
      //   if(cp.quantity==0){
      //     var index = this.clientproducts.findIndex((x: any) => x.product == cp.product && x.client == cp.client);
      //     finalclientproducts = this.clientproducts.splice(index, 1);
      //     this._clientproductsService.deleteClientProduct(cp).subscribe(response => {});
      //   } else{
      //     this._clientproductsService.saveClientProductsByProduct(cp).subscribe(response => {});
      //   }
      // }
      for (let cp1 of this.clientproductsToSplit){
        let cp = this.clientproducts.filter((obj: any) => obj.product == cp1.product && obj.client == cp1.client)[0];
        cp.quantity=cp.quantity-cp1.quantity;
        if(cp.quantity==0){
          this._clientproductsService.deleteClientProduct(cp).subscribe(response => {});
          var index = this.clientproducts.findIndex((x: any) => x.product == cp.product && x.client == cp.client);
          this.clientproducts.splice(index, 1);
        }
        else{
          this._clientproductsService.saveClientProductsByProduct(cp).subscribe(response => {});
        }
      }
      this.total = this.total - this.totalToSplit;
      this.ProductType='Productos';
    });
  }

  pay(){
    this._clientproductsService.getClientProducts(this.id!).subscribe(clientproducts=> {
      this.clientproducts = clientproducts;
      let ticket = new Ticket();
      ticket.client=this.id!; ticket.date = new Date(); ticket.clientproducts = this.clientproducts; ticket.total = this.total;
      console.log(ticket);
      this._ticketsService.saveTicket(ticket).subscribe(response => {});
      if(this.id!=undefined){
        this._clientsService.deleteClient(this.id!).subscribe(response => {});
        for(let cp of this.clientproducts){
          this._clientproductsService.deleteClientProduct(cp).subscribe(response => {});
        }
        setTimeout(() => 
        {
          this._route.navigate(['/clients']);
        },
        500);
      }
    });
  }

  changeQuantityToAdd(i: number,b: boolean){
    if(b){
      this.quantitiesToAdd[i].quantity=this.quantitiesToAdd[i].quantity+1;
    }
    else{
      this.quantitiesToAdd[i].quantity=this.quantitiesToAdd[i].quantity-1;
    }
  }

  addProductToAdd(p: Product){
//    if(p.type!=this.ProductType){
//      const obj = {
//        'name': p.name,
//        'quantity': 1
//      }
//      const index = this.quantitiesToAdd.findIndex((x:any)=>x.name == p.name);
//      if(index==-1){
//        this.quantitiesToAdd.push(obj);
//      }
//    }
    const obj = {
      'name': p.name,
      'quantity': 1,
      'type': p.type
    }
    const index = this.quantitiesToAdd.findIndex((x:any)=>x.name == p.name);
    if(index==-1){
      this.quantitiesToAdd.push(obj);
    }
  }

  clearProductsToAdd(){
    this.quantitiesToAdd = [];
  }

  changeClient(c: any){
    this.redirectTo(`clients/${c.name}`);
  }

  redirectTo(uri:string){
    this._route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this._route.navigate([uri]));
 }

  styleAccount(index: number){
    if(index%2==1){
      return "accountgray";
    }else {
      return "";
    }
  }

}
