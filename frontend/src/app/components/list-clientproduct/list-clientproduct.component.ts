import { Component, OnInit } from '@angular/core';
import { ClientProductService } from 'src/app/services/clientproduct.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientProduct } from 'src/app/models/clientproduct.ts';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Product } from 'src/app/models/product.ts';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-clientproduct',
  templateUrl: './list-clientproduct.component.html',
  styleUrls: ['./list-clientproduct.component.scss']
})
export class ListClientproductComponent implements OnInit {
  quantityToAdd: number = 0;
  public clientproducts: any = [];
  public clientproductsToSplit: any = [];
  public clientproduct: ClientProduct = new ClientProduct();
  public products: any = [];
  public ps: ClientProduct = new ClientProduct();
  public total: number = 0;
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
              private _clientsService: ClientsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this._clientproductsService.getClientProducts(this.id!).subscribe(clientproducts=> {
      this.clientproducts = clientproducts;
      this.clientproductsToSplit = _.clone(clientproducts);
      for(let cps of this.clientproductsToSplit){
        this.total = this.total + Number((Number(cps.quantity)*Number(cps.price)).toFixed(2));
      }
    });
    this._productsService.getProducts().subscribe(products => {
      this.products = products;
      for(let p of this.products){
        this.PT.add(p.type);
      }
      this.ProductTypes = Array.from(this.PT);
    });
  }

  updateProductToAdd(prod: Product){
    this.ProductToAdd = prod;
  }

  selectProductType(type: string){
    this.ProductType=type;
    this._productsService.getProducts().subscribe(products => {
      this.products = products;
      this.products = this.products.filter((x: any)=>x.type==type);
    });
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
  }

  // A function that adds a product to a user
  addProduct(prod: Product){
    this.ps = this.clientproducts.find((x: any) => x.product == prod.name);
    if(this.ps==undefined){
      const a: ClientProduct = new ClientProduct();
      a.product=prod.name;
      a.client=this.id!;
      a.quantity=this.quantityToAdd;
      a.price=prod.price;
      a.iva=prod.iva;
      this._clientproductsService.saveClientProduct(a).subscribe(response => {
        this._route.navigateByUrl(`clients/${this.id}`);
      });
      this.total=this.total+(a.quantity*a.price);
      window.location.reload();
    }
    else{
      this.ps.quantity=this.ps.quantity+this.quantityToAdd;
      this._clientproductsService.saveClientProductsByProduct(this.ps).subscribe(response => {});
      this.total=this.total+this.ps.price;
    }
  }

  saveClient(){
    console.log('printing client', this.clientproduct);
    this._clientproductsService.saveClientProduct(this.clientproduct).subscribe( clientproduct =>
      this._route.navigateByUrl('/clientproducts'));
  }

  saveProduct() {
    console.log('printing product', this.product);
    this._productsService.saveProduct(this.product).subscribe( product => {
       if(product){
        this._route.navigateByUrl('/clients');
       }})
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

}
