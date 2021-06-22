import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ColorPicker {

  constructor() {
  }

  public static setColor(temp: number): any {
    switch (true) {
      case (temp > 60 ):
        return '#cc0000';
      case (temp <= 60 && temp > 55):
        return '#cc0000';
      case (temp <= 55 && temp > 50):
        return '#ff0000';
      case (temp <= 50 && temp > 45):
        return '#ff1a1a';
      case (temp <= 45 && temp > 40):
        return '#ff3333';
      case (temp <= 40 && temp > 35):
        return '#ff4d4d';
      case (temp <= 35 && temp > 30):
        return '#ffbf00';
      case (temp <= 30 && temp > 25):
        return '#ffc61a';
      case (temp <= 25 && temp > 20):
        return '#ffd24d';
      case (temp <= 20 && temp > 15):
        return '#66ff33';
      case (temp <= 15 && temp > 10):
        return '#79ff4d';
      case (temp <= 10 && temp > 5):
        return '#8cff66';
      case (temp <= 5 && temp > 0):
        return '#66ffd9';
      case (temp <= 0 && temp > -5):
        return '#99d6ff';
      case (temp <= -5 && temp > -10):
        return '#80ccff';
      case (temp <= -10 && temp > -15):
        return '#4db8ff';
      case (temp <= -15 && temp > -20):
        return '#1aa3ff';
      case (temp <= -20 && temp > -25):
        return '#008ae6';
      case (temp <= -25 && temp > -30):
        return '#007acc';
      case (temp <= -30 && temp > -35):
        return '#006bb3';
      case (temp <= -35 && temp > -40):
        return '#005c99';
      case (temp <= -40 && temp > -45):
        return '#004d80';
      case (temp <= -45 && temp > -50):
        return '#003d66';
      case (temp <= -50):
        return '#002e4d';
      default:
        console.error('Invalid temperature.');
    }
  }
}
