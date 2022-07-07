import { TestBed } from '@angular/core/testing';

import { ClientProductService } from './clientproduct.service';

describe('ClientproductService', () => {
  let service: ClientProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
