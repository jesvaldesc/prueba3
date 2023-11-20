// weatherapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiKey = '580e339e1d074f78a99190741231911'; //llave de api
  private apiUrl = 'http://api.weatherapi.com/v1/current.json?key=580e339e1d074f78a99190741231911&q=Brussels&aqi=no'; //Informacion de la ciudad de Bruselas

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}`;
    return this.http.get(url);
  }
}
