import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ListClientproductComponent } from './components/list-clientproduct/list-clientproduct.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrintReceiptComponent } from './components/print-receipt/print-receipt.component';


const routes: Routes = [
  {path: 'products', component: ListProductsComponent},
//  {path: 'products/create', component: CreateProductComponent},
//  {path: 'clients/create', component: CreateClientComponent},
  {path: 'clients/:id', component: ListClientproductComponent},
  {path: 'clients', component: ListClientsComponent},
  {path: '', redirectTo: 'clients', pathMatch: 'full'},
  {path: 'modal', component: ModalComponent},
  {path: 'printreceipt/:id', component: PrintReceiptComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    ListClientsComponent,
    CreateProductComponent,
    ListClientproductComponent,
    CreateClientComponent,
    PageNotFoundComponent,
    PrintReceiptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
