import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import {Region} from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa' , 'Americas' , 'Asia' , 'Europe' , 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.countriesService.searchAPI(term, '/region/').subscribe(countries => this.countries = countries);
  }
}
