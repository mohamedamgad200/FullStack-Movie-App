import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMovieCardComponent } from './manage-movie-card.component';

describe('ManageMovieCardComponent', () => {
  let component: ManageMovieCardComponent;
  let fixture: ComponentFixture<ManageMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageMovieCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
