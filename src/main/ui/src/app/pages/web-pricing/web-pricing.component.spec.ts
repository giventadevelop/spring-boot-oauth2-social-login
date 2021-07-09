import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPricingComponent } from './web-pricing.component';

describe('WebPricingComponent', () => {
  let component: WebPricingComponent;
  let fixture: ComponentFixture<WebPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
