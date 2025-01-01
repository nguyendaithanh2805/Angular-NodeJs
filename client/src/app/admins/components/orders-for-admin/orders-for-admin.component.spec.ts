import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersForAdminComponent } from './orders-for-admin.component';

describe('OrdersForAdminComponent', () => {
  let component: OrdersForAdminComponent;
  let fixture: ComponentFixture<OrdersForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
