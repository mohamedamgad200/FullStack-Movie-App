import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecarddetailsComponent } from './moviecarddetails.component';

describe('MoviecarddetailsComponent', () => {
  let component: MoviecarddetailsComponent;
  let fixture: ComponentFixture<MoviecarddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviecarddetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviecarddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
