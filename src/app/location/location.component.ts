import {Component, Input, OnInit} from '@angular/core';
import {CoordsData} from "../utilities/coords-data";
import {SearchCity} from "../map/models/search-city";
import {CityNotFound} from "../map/models/city-not-found";
import {CitiesService} from "../map-search/service/cities.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  isSearchDivVisible: boolean = true;
  searchCity: SearchCity[] | undefined;
  cityNotFound: CityNotFound | undefined;
  @Input() coordsData?: CoordsData;

  constructor(private service: CitiesService) {
    this.getCities('');
  }

  ngOnInit(): void {
  }

  getCities(city: string): void {
    this.service.getCitiesService(city)
      .subscribe((data) => {
          if ('detail' in data) {
            this.cityNotFound = data;
            this.searchCity = undefined;
          } else {
            this.cityNotFound = undefined;
            this.searchCity = data;
          }
        }
      );
  }

  onKeyUp(txt: string): void {
    this.getCities(txt);
  }

  showInput() {
    this.isSearchDivVisible = false;
    setTimeout(() => {
      let input = document.getElementById('location-input');
      if (input) {
        input.focus();
      }

      let resultDiv = document.getElementById('location-result-div');
      if (resultDiv) {
        resultDiv.style.display = 'block';
      }
    }, 100);
  }

  hideInput() {
    let resultDiv = document.getElementById('location-result-div');
    if (resultDiv) {
      resultDiv.style.display = 'block';
    }
    this.isSearchDivVisible = true;
  }

  onCityDivSelect(coordLon: any, coordLat: any, name: any, country: string | undefined) {

  }
}
