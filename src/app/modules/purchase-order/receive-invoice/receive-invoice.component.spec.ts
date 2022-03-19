import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveInvoiceComponent } from './receive-invoice.component';

describe('ReceiveInvoiceComponent', () => {
  let component: ReceiveInvoiceComponent;
  let fixture: ComponentFixture<ReceiveInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
