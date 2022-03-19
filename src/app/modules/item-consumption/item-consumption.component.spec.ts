import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemConsumptionComponent } from './item-consumption.component';

describe('ItemConsumptionComponent', () => {
  let component: ItemConsumptionComponent;
  let fixture: ComponentFixture<ItemConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
