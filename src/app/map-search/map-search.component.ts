import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {SearchCity} from "../map/models/search-city";
import {CitiesService} from "./service/cities.service";
import {CityNotFound} from "../map/models/city-not-found";

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  @Input() passedMap: L.Map | undefined;
  searchContainer: L.Control | undefined;
  cityNotFound: CityNotFound | undefined;
  searchCity: SearchCity[] | undefined;
  cityValue: string = '';

  constructor(private service: CitiesService) {
    this.getCities('');
  }

  ngOnInit(): void {
    if (this.passedMap) {
      let Custom = L.Control.extend({
        onAdd(map: L.Map) {
          let container = L.DomUtil.get('search-container');

          if (container !== null) {
            container.onmouseover = function () {
              if (container !== null) {
                container.style.width = '200px';
                container.style.height = '40px';
              }
              let searchDivField = document.getElementById('search-div-field');
              if (searchDivField !== null) {
                searchDivField.style.display = 'block';

                let searchField = document.getElementById('search-field');
                if (searchField !== null) {
                  searchField.focus();
                }

                let resultDiv = document.getElementById('result-div');
                if (resultDiv !== null) {
                  resultDiv.style.display = 'block';
                }
              }
            }

            container.onmouseout = function () {
              if (container !== null) {
                container.style.backgroundColor = 'white';
                container.style.width = '30px';
                container.style.height = '30px';
              }

              let searchDivField = document.getElementById('search-div-field');
              if (searchDivField !== null) {
                searchDivField.style.display = 'none';
                let resultDiv = document.getElementById('result-div');
                if (resultDiv !== null) {
                  resultDiv.style.display = 'none';
                }
              }

              let focusedDiv = document.querySelector('.div-city-item-focus');
              if (focusedDiv !== null) {
                focusedDiv.className = 'div-city-item';
              }
            }
          }

          return container;
        },
        onRemove(map: L.Map) {
        }
      });

      this.searchContainer = new Custom({
        position: 'topleft'
      }).addTo(this.passedMap);
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

  onSearchKeyUp(txt: string): void {
    this.getCities(txt);
  }

  onResultDivClick(lon?: number, lat?: number, city?: string, country?: string): void {
    if (lon !== undefined && lat !== undefined && this.passedMap !== undefined) {
      this.cityValue = `${city}, ${country}`;
      let zoom = this.passedMap.getZoom();
      let zoomSetter = this.setZoom(zoom);

      if (zoom >= 3 && zoom <= 7) {
        this.passedMap.setView(new L.LatLng(lat, lon), zoomSetter.after);
      } else {
        this.passedMap.setView(new L.LatLng(lat, lon), zoomSetter.after);
        setTimeout(() => {
          this.passedMap?.setZoom(zoomSetter.before);
        }, 300);
      }

      setTimeout(() => {
        let searchContainer = document.getElementById('search-container');
        if (searchContainer !== null) {
          searchContainer.style.width = '30px';
          searchContainer.style.height = '30px';
          let searchDivField = document.getElementById('search-div-field');
          if (searchDivField !== null) {
            searchDivField.style.display = 'none';
            let resultDiv = document.getElementById('result-div');
            if (resultDiv !== null) {
              resultDiv.style.display = 'none';
              this.cityValue = ``;
              this.searchCity = [];
            }
          }
        }
      }, 300);
    }
  }

  onKeyArrowDown(): void {
    let searchDivField = document.getElementById('search-div-field');
    if (searchDivField !== null) {
      document.onkeydown = (event) => {
        let focusedDiv = document.querySelector('.div-city-item-focus');
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
    let allDivs = document.querySelectorAll('.div-city-item');
    if (allDivs !== null && allDivs.length > 0) {
      let firstDivForFocus = document.getElementById(allDivs[0].id);
      if (firstDivForFocus !== null) {
        firstDivForFocus.className = 'div-city-item-focus';
        firstDivForFocus.focus();
      }
    }
  }

  moveFocusUp(element: Element): void {
    let previousDiv = element.previousElementSibling;
    if (previousDiv !== null) {
      element.className = 'div-city-item';
      previousDiv.className = 'div-city-item-focus';
      let previousElement = document.getElementById(previousDiv.id);
      previousElement?.focus();
    } else {
      let searchInput = document.getElementById('search-field');
      if (searchInput !== null) {
        element.className = 'div-city-item';
        searchInput.focus();
      }
    }
  }

  moveFocusDown(element: Element): void {
    let nextDiv = element.nextElementSibling;
    if (nextDiv !== null) {
      element.className = 'div-city-item';
      nextDiv.className = 'div-city-item-focus';
      let nextElement = document.getElementById(nextDiv.id);
      nextElement?.focus();
    }
  }

  setZoom(zoom: number): any {
    switch (zoom) {
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return {
          before: 0,
          after: 8
        };
      case 8:
        return {
          before: 8,
          after: 9
        };
      case 9:
        return {
          before: 9,
          after: 10
        };
      case 10:
        return {
          before: 10,
          after: 11
        };
      case 11:
        return {
          before: 11,
          after: 12
        };
      case 12:
        return {
          before: 12,
          after: 13
        };
      case 13:
        return {
          before: 13,
          after: 14
        };
      case 14:
        return {
          before: 14,
          after: 15
        };
      case 15:
        return {
          before: 15,
          after: 16
        };
      case 16:
        return {
          before: 16,
          after: 17
        };
      case 17:
        return {
          before: 17,
          after: 18
        };
      case 18:
        return {
          before: 18,
          after: 17
        };
      default:
        return {
          before: 0,
          after: 8
        };
    }
  }

}
