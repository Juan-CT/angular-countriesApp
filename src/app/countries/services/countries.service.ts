import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';


  constructor(private http: HttpClient) {

  }

  searchCountryByAlphaCode(term: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${term}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }

  searchAPI(term: string, petition: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}${petition}${term}`)
      .pipe(
        catchError(error => of([]))
      );
  }

}
