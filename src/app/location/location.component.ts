import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  isSearchDivVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showInput() {
    this.isSearchDivVisible = false;
  }

  hideInput() {
    this.isSearchDivVisible = true;
  }
}
