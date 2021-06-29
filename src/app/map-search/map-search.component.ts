import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit, AfterContentChecked {

  @Input() passedMap: L.Map | undefined;

  searchControl = L.Control.extend({
    options: {
      position: 'topleft'
    },

    searchedCoords: ``,

    onAdd: function () {
      const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>`;

      const searchContainer = `<div id="search-icon" style="display: block">${searchSvg}</div>
                    <div id="search-div-field" style="display: none;">
                        <input id="search-field" list="cities-list" type="text" value="" autocomplete="off">
                    </div>
                    <div id="result-div" style="display: none; position: absolute; left: 40px; top: 31px; background-color: #fff; min-width: 151px; max-width: 250px; max-height: 300px; padding: 1px; overflow-y: auto;">
                      <div>
                          <div data-coords="-74.005966&40.714272" id="1" style="border: 1px solid red; overflow: hidden; white-space: nowrap;">test1</div>
                          <div data-coords="234" id="2">test2</div>
                          <div data-coords="345" id="3">test3</div>
                          <div data-coords="456" id="4" >test4</div>
                      </div>
                    </div>`;

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

      container.insertAdjacentHTML('beforeend', searchContainer);

      let searchDivField = document.getElementById('search-div-field');
      let resultDiv = document.getElementById('result-div');
      let searchField = document.getElementById('search-field');

      container.onmouseover = function () {
        container.style.width = '200px';
        container.style.height = '40px';
        searchDivField = document.getElementById('search-div-field');
        if (searchDivField !== null) {
          searchDivField.style.display = 'block';

          searchField = document.getElementById('search-field');
          if (searchField !== null) {
            searchField.focus();
          }

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
        searchDivField = document.getElementById('search-div-field');
        if (searchDivField !== null) {
          searchDivField.style.display = 'none';
          resultDiv = document.getElementById('result-div');
          if (resultDiv !== null) {
            resultDiv.style.display = 'none';
          }
        }
      }

      container.onkeydown = function () {
        searchDivField = document.getElementById('search-field');
        if (searchDivField !== null) {
          //console.log(searchDivField);
        }
      }

      let coords: string = ``;

      container.onclick = function () {
        //console.log('buttonClicked');
        resultDiv = document.getElementById('result-div');
        let searchText = document.querySelector('input');
        if (resultDiv !== null) {
          document.onclick = function (e: any) {
            let element = e.target;
            let elemStr = e.target.outerHTML;
            let txt = e.target.innerText;
            if (searchText !== null && elemStr.startsWith('<div data-coords="')) {
              searchText.value = txt;
              //console.log(element.dataset.coords);
              coords = element.dataset.coords;
              searchDivField = document.getElementById('search-div-field');
              if (searchDivField !== null) {
                searchDivField.style.display = 'none';
                if (resultDiv !== null) {
                  resultDiv.style.display = 'none';
                  //searchText.value = '';
                }
              }
            }
          }
        }
      }

      return container;
    },

    searchCity: () => {
      //console.log(document.querySelector('input')?.value);
      return document.querySelector('input')?.value;
    }
  });

  objSearchControl = new this.searchControl;

  constructor() {
  }

  ngOnInit(): void {
    this.addSearchControl();
  }

  ngAfterContentChecked() {
    this.displayTextField();
    let test = document.getElementById('search-container');
    console.log(test);
  }

  addSearchControl(): void {
    this.passedMap?.addControl(this.objSearchControl);
  }

  displayTextField(): void {
    //var cont = this.passedMap?.getContainer();
    console.log(this.objSearchControl.searchCity());
  }

  test(): void {
    console.log('RRRRRRRR');
  }

}

/*
*<div id="result-div" style="display: none; position: absolute; left: 40px; top: 31px; background-color: #fff; min-width: 151px; max-width: 200px; max-height: 300px; padding: 1px; overflow-y: scroll;">
                    test test test c test v test test test<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2<br>test1<br>test2</div>
* */

/*<datalist id="cities-list" style="max-height: 300px">
  <option>Russia</option>
  <option>Germany</option>
  <option>United Kingdom</option>
<option>France</option>
<option>Italy</option>
<option>Spain</option>
<option>Ukraine</option>
<option>Poland</option>
<option>Romania</option>
<option>Netherlands</option>
<option>Belgium</option>
<option>Czech Republic</option>
<option>Greece</option>
<option>Portugal</option>
<option>Sweden</option>
<option>Hungary</option>
<option>Belarus</option>
<option>Austria</option>
<option>Serbia</option>
<option>Switzerland</option>
<option>Bulgaria</option>
<option>Denmark</option>
<option>Finland</option>
<option>Slovakia</option>
<option>Norway</option>
<option>Ireland</option>
<option>Croatia</option>
<option>Moldova</option>
<option>Bosnia and Herzegovina</option>
<option>Albania</option>
<option>Lithuania</option>
<option>North Macedonia</option>
<option>Slovenia</option>
<option>Latvia</option>
<option>Estonia</option>
<option>Montenegro</option>
<option>Luxembourg</option>
<option>Malta</option>
<option>Iceland</option>
<option>Andorra</option>
<option>Monaco</option>
<option>Liechtenstein</option>
<option>San Marino</option>
<option>Holy See</option>
</datalist>
</div>*/

/*
<div id="result-div" style="display: none; position: absolute; left: 40px; top: 31px; background-color: #fff; min-width: 151px; max-width: 200px; max-height: 300px; padding: 1px; overflow-y: auto;">
  </div>*/
