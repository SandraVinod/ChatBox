import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendamilComponent } from './resendamil.component';

describe('ResendamilComponent', () => {
  let component: ResendamilComponent;
  let fixture: ComponentFixture<ResendamilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendamilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendamilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
