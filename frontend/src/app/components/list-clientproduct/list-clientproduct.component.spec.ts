import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientproductComponent } from './list-clientproduct.component';

describe('ListClientproductComponent', () => {
  let component: ListClientproductComponent;
  let fixture: ComponentFixture<ListClientproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
