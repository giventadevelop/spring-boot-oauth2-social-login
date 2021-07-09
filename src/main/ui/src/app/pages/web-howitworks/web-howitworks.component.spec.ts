import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHowitworksComponent } from './web-howitworks.component';

describe('WebHowitworksComponent', () => {
  let component: WebHowitworksComponent;
  let fixture: ComponentFixture<WebHowitworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebHowitworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHowitworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
