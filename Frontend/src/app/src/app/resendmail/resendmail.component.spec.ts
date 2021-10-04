import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendmailComponent } from './resendmail.component';

describe('ResendmailComponent', () => {
  let component: ResendmailComponent;
  let fixture: ComponentFixture<ResendmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
