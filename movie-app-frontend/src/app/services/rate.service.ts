import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(private http: HttpClient) {}
  addRate(movieId: number, rate: number) {
    let id = localStorage.getItem('id');
    return this.http.post(environment.API_URL + '/rate/add', {
      userId: id,
      movieId: movieId,
      rate: rate,
    });
  }
}
