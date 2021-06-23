import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  @Input() passedMap: L.Map | undefined;

  searchControl = L.Control.extend({

    options: {
      position: 'topleft'
    },

    onAdd: function () {
      const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>`;

      const icon = `<div id="search-icon" style="display: block">${searchSvg}</div>
                    <div id="search-text-field" style="display: none;"><input type="text"></div>
                    <div id="result-div" style="display: none; position: absolute; left: 40px; top: 31px; background-color: #fff; min-width: 151px; max-height: 300px; padding: 1px; overflow-y: scroll;">
                    test test test c test v test test test<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2</div>`;

      const container = L.DomUtil.create('div');

      container.id = 'search-container';
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.flexWrap = 'nowrap';
      container.style.justifyContent = 'space-around';
      container.style.alignItems = 'center';

      container.style.backgroundColor = 'white';
      container.style.width = '30px';
      container.style.height = '30px';
      container.style.border = '2px solid rgb(193, 192, 183)';
      container.style.borderRadius = '4px';

      container.insertAdjacentHTML('beforeend', icon);

      let textField = document.getElementById('search-text-field');
      let resultDiv = document.getElementById('result-div');

      container.onmouseover = function () {
        container.style.width = '200px';
        container.style.height = '40px';
        textField = document.getElementById('search-text-field');
        if (textField !== null) {
          textField.style.display = 'block';
          resultDiv = document.getElementById('result-div');
          if (resultDiv !== null) {
            resultDiv.style.display = 'block';
          }
        }
      }
      container.onmouseout = function () {
        container.style.backgroundColor = 'white';
        container.style.width = '30px';
        container.style.height = '30px';
        textField = document.getElementById('search-text-field');
        if (textField !== null) {
          textField.style.display = 'none';
          resultDiv = document.getElementById('result-div');
          if (resultDiv !== null) {
            resultDiv.style.display = 'none';
          }
        }
      }

      container.onkeydown = () => {
        textField = document.getElementById('search-text-field');
        if (textField !== null) {

        }
      }

      container.onclick = function () {
        console.log('buttonClicked');
      }

      return container;
    }
  });

  constructor() {
  }

  ngOnInit(): void {
    this.addSearchControl();
  }

  addSearchControl(): void {
    this.passedMap?.addControl(new this.searchControl);
  }

  displayTextField(): void {
    //this.passedMap?.getContainer();
    let searchIcon = document.getElementById('search-icon');
    if (searchIcon !== null) {
      searchIcon.style.display = 'none';
    }
  }

}
