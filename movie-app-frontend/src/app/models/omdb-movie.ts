export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode'; // Optional: You can limit the type like this
  Poster: string;
}
