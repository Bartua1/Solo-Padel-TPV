import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientProductComponent } from './create-clientproduct.component';

describe('CreateClientProductComponent', () => {
  let component: CreateClientProductComponent;
  let fixture: ComponentFixture<CreateClientProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClientProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
