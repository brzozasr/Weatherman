import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Temp} from "../forecast/model/temp";
import {FeelsLike} from "../forecast/model/feels-like";
import * as d3 from 'd3';
import {Observable, Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {DailyTemp} from "./models/daily-temp";
import {DailyFeelsLike} from "./models/daily-feels-like";

@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.css']
})
export class DailyTempChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() tempData?: [DailyTemp, DailyFeelsLike];

  highestPrecipitation: number = 1;

  private svg: any;
  private margin = 50;
  private width = 346 - (this.margin * 2);
  private height = 250 - (this.margin * 2);

  data = [
    {timeOfDay: "Morning"},
    {timeOfDay: "Afternoon"},
    {timeOfDay: "Evening"},
    {timeOfDay: "Night"}
  ];
  private subscription: Subscription | undefined;

  private once: boolean = false;

  constructor() {
  }

  ngOnInit(): void {

    /*this.subscription = this.tempData?.subscribe(
      (response) => {
        response.forEach((x) => {
          if (x instanceof DailyTemp) {
            console.log(x.day);
          } else {
            console.log(x.day);
          }
        });

        if (!this.once) {
          this.createSvg();
          this.drawBars(this.data, 6);
          this.once = true;
        }
      },
      err => {
        console.log("error occurred");
      });*/

    /*this.createSvg();
    this.drawBars(this.data, 6);*/

    if (!this.once) {
      this.createSvg();
      this.drawBars(this.data, 6);
      this.once = true;
    }
  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here
   /* this.createSvg();
    this.drawBars(this.data, 6);
    console.log(`eee: 1`)*/
  }

  private createSvg(): void {
    this.svg = d3.select("figure#daily-temp")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[], axisXHeight: number): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.timeOfDay))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, axisXHeight])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));


    // Description Y-axis
    this.svg
      .append('text')
      .attr('x', (this.height / 3.2) - (this.margin * 2))
      .attr('y', -(this.margin / 1.4))
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('(mm)')
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
