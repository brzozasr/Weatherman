import { Component, OnInit } from '@angular/core';
import {CoordsHistoricalData} from "../utilities/coords-historical-data";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {

  isSpinnerVisible: boolean = false;
  coordsHistoricalData?: CoordsHistoricalData;

  constructor() { }

  ngOnInit(): void {
  }

}
