import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import * as d3 from 'd3'

@Component({
  selector: 'app-hourly-temp-chart',
  templateUrl: './hourly-temp-chart.component.html',
  styleUrls: ['./hourly-temp-chart.component.css']
})
export class HourlyTempChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;

  private svg: any;
  private margin = 50;
  private width = 1250 - (this.margin * 2);
  private height = 250 - (this.margin * 2);

  data = [
    {precipitation: 3.5, time: "12:00"},
    {precipitation: 2.5, time: "13:00"},
    {precipitation: 1.5, time: "14:00"},
    {precipitation: 4.5, time: "15:00"},
    {precipitation: 5.5, time: "16:00"},
    {precipitation: 5.5, time: "17:00"}
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data, 7);
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.drawBars(this.data, 7);
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

    // Description Y-axis
    this.svg
      .append('text')
      .attr('x', (this.height / 3.2) - (this.margin * 2))
      .attr('y', -(this.margin / 1.4))
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('(mm)')
  }

}
