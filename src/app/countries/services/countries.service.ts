import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  }

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
        tap( countries => {
          if (petition === '/capital/') {
            this.cacheStore.byCapital = {term, countries}
          } else if (petition === '/country/') {
            this.cacheStore.byCountry = {term, countries}
          } else if (petition === '/region/') {

          }
        }),
        catchError(error => of([])),
        // delay(2000) // Para usar un loading
      );
  }

}
