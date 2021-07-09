import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebContactComponent } from './web-contact.component';

describe('WebContactComponent', () => {
  let component: WebContactComponent;
  let fixture: ComponentFixture<WebContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
