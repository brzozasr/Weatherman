import {Component, Input, OnInit} from '@angular/core';
import {Temp} from "../forecast/model/temp";
import {FeelsLike} from "../forecast/model/feels-like";
import * as d3 from "d3";

@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.css']
})
export class DailyTempChartComponent implements OnInit {

  @Input() tempData?: [Temp, FeelsLike];

  private svg: any;
  private margin = 15;
  private width = 346 - (this.margin * 2);
  private height = 150 - (this.margin * 2);
  highestPrecipitation: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#lines-day")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
}
