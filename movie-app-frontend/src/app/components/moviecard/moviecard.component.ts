import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrl: './moviecard.component.css',
})
export class MoviecardComponent {
  @Input() movie!: Movie;
  constructor(private router: Router) {}
  viewDetails() {
    this.router.navigate(['home/movie', this.movie.id]);
  }
}
