import { Movie } from './movie';

export interface PaginatedMovies {
  content: Movie[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
