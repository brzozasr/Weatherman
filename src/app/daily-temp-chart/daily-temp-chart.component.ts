import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Temp} from "../forecast/model/temp";
import {FeelsLike} from "../forecast/model/feels-like";
import {TempsData} from "./model/temps-data";

@Component({
  selector: 'app-daily-temp-chart',
  templateUrl: './daily-temp-chart.component.html',
  styleUrls: ['./daily-temp-chart.component.css']
})
export class DailyTempChartComponent implements OnInit, AfterViewInit {

  @Input() temps?: [Temp?, FeelsLike?];
  isDataAvailable: boolean = false;
  options: any;
  colorScheme: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const dataSet: TempsData[] = [];

      if (this.temps?.length === 2 && this.temps[0] && this.temps[1]) {
        this.isDataAvailable = true;
        let timeOfDayList = ['Morning', 'Afternoon', 'Evening', 'Night'];
        timeOfDayList.forEach((data) => {
          let temp = this.temps?.length === 2 && this.temps[0] ? this.temps[0] : null;
          let feels = this.temps?.length === 2 && this.temps[1] ? this.temps[1] : null;

          if (temp || feels) {
            let tempDay: any;
            let feelsDay: any;
            switch (data) {
              case 'Morning':
                tempDay = temp?.morn;
                feelsDay = feels?.morn;
                break;
              case 'Afternoon':
                tempDay = temp?.day;
                feelsDay = feels?.day;
                break;
              case 'Evening':
                tempDay = temp?.eve;
                feelsDay = feels?.eve;
                break;
              case 'Night':
                tempDay = temp?.night;
                feelsDay = feels?.night;
                break;
              default:
                tempDay = '-';
                feelsDay = '-';
            }

            let dataTemps = new TempsData(data, tempDay, feelsDay);
            dataSet.push(dataTemps);
          } else {
            let dataTemps = new TempsData(data, '-', '-');
            dataSet.push(dataTemps);
          }
        });
      }

      this.colorScheme = {
        color: ['#cc0000', '#0000cc']
      };

      this.options = {
        legend: {},
        tooltip: {},
        dataset: {
          source: dataSet
        },

        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          {
            name: 'Temperature',
            type: 'line',
            smooth: true,
            label: {
              show: true,
              position: 'top',
              color: '#000',
              fontSize: 8.5,
              formatter: '{@temperature}°C'
            },
          },
          {
            name: 'Feels like',
            type: 'line',
            smooth: true,
            label: {
              show: true,
              position: 'bottom',
              color: '#000',
              fontSize: 8.5,
              formatter: '{@feelsLike}°C'
            },
          }
        ]
      };
    }, 1000);
  }

}
