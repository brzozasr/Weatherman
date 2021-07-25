import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import * as d3 from 'd3';
import {MinutelyPrecipitation} from "./model/minutely-precipitation";


@Component({
  selector: 'app-minutely-wf',
  templateUrl: './minutely-wf.component.html',
  styleUrls: ['./minutely-wf.component.css']
})
export class MinutelyWfComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;
  precipitationData?: MinutelyPrecipitation[];
  highestPrecipitation: number = 1;

  private preDate?: MinutelyPrecipitation[];
  private svg: any;
  private margin = 35;
  private width = 1250 - (this.margin * 2);
  private height = 200 - (this.margin * 2);

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.preDate = this.getData();
      this.createSvg();
      if (this.preDate) {
        this.highestPrecipitation = this.getHighestPrecipitation(this.preDate);
        console.log(this.highestPrecipitation);
        this.drawBars(this.preDate, this.highestPrecipitation);
      }
    }, 900);
  }

  getData(): MinutelyPrecipitation[] {
    let precipitationList: MinutelyPrecipitation[] = [];
    if (this.weatherPoint?.minutely !== undefined) {
      this.weatherPoint.minutely.forEach((value, index) => {
        let mp = new MinutelyPrecipitation(
          value.dtLocal,
          value.precipitation
        );
        precipitationList.push(mp);
      });
    }

    return precipitationList;
  }

  getHighestPrecipitation(list: MinutelyPrecipitation[]): number {
    let highestPrecipitation: number | undefined = 0;
    if (list !== undefined) {
      list.forEach((value => {
        // @ts-ignore
        if (value.precipitation > highestPrecipitation) {
          highestPrecipitation = value.precipitation;
        }
      }));
    }

    return highestPrecipitation;
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar-min")
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
      .domain(data.map(d => d.time))
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

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { time: string; }) => x(d.time))
      .attr("y", (d: { precipitation: d3.NumberValue; }) => y(d.precipitation))
      .attr("width", x.bandwidth())
      .attr("height", (d: { precipitation: d3.NumberValue; }) => this.height - y(d.precipitation))
      .attr("fill", "#26b6b6");
  }
}
