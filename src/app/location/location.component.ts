import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {CoordsForecastData} from "../utilities/coords-forecast-data";
import {SearchCity} from "../map/models/search-city";
import {CityNotFound} from "../map/models/city-not-found";
import {CitiesService} from "../map-search/service/cities.service";
import {CurrentCoordsForecastService} from "../forecast/service/current-coords-forecast.service";
import {CurrentCoords} from "../utilities/current-coords";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  isSearchDivVisible: boolean = true;
  searchCity: SearchCity[] | undefined;
  cityNotFound: CityNotFound | undefined;
  @Input() coordsData?: CoordsForecastData;

  constructor(private service: CitiesService,
              private eRef: ElementRef,
              private coordsForecastService: CurrentCoordsForecastService,
              private currentCoords: CurrentCoords,) {
    this.getCities('');
  }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event): void {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.showInput();
    } else {
      this.hideInput();
    }
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
    }, 70);
  }

  hideInput() {
    let resultDiv = document.getElementById('location-result-div');
    if (resultDiv) {
      resultDiv.style.display = 'none';
      this.searchCity = [];
    }
    this.isSearchDivVisible = true;
  }

  onCityDivSelect(coordLon: number | undefined, coordLat: number | undefined,
                  name: string | undefined, country: string | undefined) {
    let data = this.currentCoords.getCoordsData();
    if (coordLat && coordLon) {
      data.coordsArray = [coordLat, coordLon];
    }

    data.locationName = `${name}, ${country}`.trim();
    data.status = ``;
    this.coordsForecastService.updateLocationForecastData(data);
  }

  onKeyArrowDown(): void {
    let searchDivField = document.getElementById('location-search-input');
    if (searchDivField) {
      document.onkeydown = (event) => {
        let focusedDiv = document.querySelector('.location-div-city-item-focus');
        if (focusedDiv !== null) {
          switch (event.key) {
            case 'ArrowUp':
              this.moveFocusUp(focusedDiv);
              event.preventDefault();
              break;
            case 'ArrowDown':
              this.moveFocusDown(focusedDiv);
              event.preventDefault();
              break;
          }
        } else {
          if (event.key === 'ArrowDown') {
            this.focusFirstElement();
            event.preventDefault();
          }
        }
      }
    }
  }

  focusFirstElement(): void {
    let allDivs = document.querySelectorAll('.location-div-city-item');
    if (allDivs !== null && allDivs.length > 0) {
      let firstDivForFocus = document.getElementById(allDivs[0].id);
      if (firstDivForFocus !== null) {
        firstDivForFocus.className = 'location-div-city-item-focus';
        firstDivForFocus.focus();
      }
    }
  }

  moveFocusUp(element: Element): void {
    let previousDiv = element.previousElementSibling;
    if (previousDiv !== null) {
      element.className = 'location-div-city-item';
      previousDiv.className = 'location-div-city-item-focus';
      let previousElement = document.getElementById(previousDiv.id);
      previousElement?.focus();
    } else {
      let searchInput = document.getElementById('location-input');
      if (searchInput !== null) {
        element.className = 'location-div-city-item';
        searchInput.focus();
      }
    }
  }

  moveFocusDown(element: Element): void {
    let nextDiv = element.nextElementSibling;
    if (nextDiv !== null) {
      element.className = 'location-div-city-item';
      nextDiv.className = 'location-div-city-item-focus';
      let nextElement = document.getElementById(nextDiv.id);
      nextElement?.focus();
    }
  }

  focusDivCity($event: MouseEvent): void {
    let allElements = document.querySelectorAll('.location-div-city-item-focus');
    if (allElements && allElements.length > 0) {
      allElements.forEach(div => {
        div.className = 'location-div-city-item';
      })
    }
    let elementId = ($event.target as Element).id;
    if (elementId) {
      let element = document.getElementById(elementId);
      // @ts-ignore
      element?.className = 'location-div-city-item-focus';
    }
  }

  focusOutDivCity($event: MouseEvent): void {
    let elementId = ($event.target as Element).id;
    if (elementId) {
      let element = document.getElementById(elementId);
      // @ts-ignore
      element?.className = 'location-div-city-item';
    }
  }
}
