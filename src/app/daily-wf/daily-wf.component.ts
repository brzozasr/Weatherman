import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit
} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-daily-wf',
  templateUrl: './daily-wf.component.html',
  styleUrls: ['./daily-wf.component.css']
})
export class DailyWfComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;

  constructor() { }


  ngOnInit(): void {
  }
}
